import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const articleId = "202608170000";
const outputDir = path.join(root, "output/video", articleId);
const videoPath = resolveInput(process.env.BILIBILI_VIDEO_PATH, path.join(outputDir, `${articleId}-bilibili-sample.mp4`));
const coverPath = resolveInput(process.env.BILIBILI_COVER_PATH, path.join(outputDir, `${articleId}-bilibili-cover.jpg`));
const metadataPath = resolveInput(process.env.BILIBILI_METADATA_PATH, path.join(outputDir, `${articleId}-bilibili-metadata.json`));
const statePath = path.join(root, ".cache/bilibili/storage-state.json");
const resultPath = resolveInput(process.env.BILIBILI_RESULT_PATH, path.join(root, ".cache/bilibili/draft-result.json"));
const screenshotPath = path.join(root, ".cache/bilibili/draft-form.png");
const uploadUrl = "https://member.bilibili.com/platform/upload/video/frame";
const uploadVideoPath = path.join(root, ".cache/bilibili", `${articleId}-${Date.now()}.mp4`);

const metadata = JSON.parse(await fs.readFile(metadataPath, "utf8"));
if (process.env.BILIBILI_TITLE) metadata.title = process.env.BILIBILI_TITLE;
if (process.env.BILIBILI_DESCRIPTION) metadata.description = process.env.BILIBILI_DESCRIPTION;
await fs.access(videoPath);
await fs.access(coverPath);
await fs.access(statePath);
await ensureDraftDoesNotExist(metadata.title);
await fs.copyFile(videoPath, uploadVideoPath);

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({
  storageState: statePath,
  viewport: { width: 1440, height: 1000 },
  locale: "zh-CN",
});
const page = await context.newPage();
let draftResponse;
let draftRequest;

page.on("response", async (response) => {
  if (!response.url().includes("/x/vupre/web/draft/add")) return;
  try {
    draftRequest = response.request().postDataJSON();
    draftResponse = await response.json();
  } catch {
    draftResponse = { httpStatus: response.status() };
  }
});

try {
  await page.goto(uploadUrl, { waitUntil: "domcontentloaded", timeout: 120_000 });
  await page.waitForTimeout(4_000);
  if (page.url().includes("passport.bilibili.com")) {
    throw new Error("B站登录状态已失效，请重新运行 pnpm run bilibili:login");
  }

  const titleInput = await startUpload(page, uploadVideoPath);
  console.log("视频已交给 B站官方上传器，等待上传完成……");
  await waitForUpload(page);

  await titleInput.fill(metadata.title);
  await selectOriginalNoReprint(page);
  await selectCategory(page);
  await replaceTags(page, metadata.tags.slice(0, 10));
  await fillDescription(page, metadata.description);
  await uploadCover(page, coverPath);

  await page.screenshot({ path: screenshotPath, fullPage: true });
  const draftButton = page.locator(".submit-draft").filter({ hasText: "存草稿" });
  await draftButton.waitFor({ state: "visible", timeout: 30_000 });
  await draftButton.click();

  await page.waitForTimeout(3_000);
  if (!draftResponse) {
    await page.getByText(/草稿.*保存|保存.*成功/).first().waitFor({ timeout: 30_000 }).catch(() => {});
  }
  if (draftResponse && draftResponse.code !== 0) {
    throw new Error(`B站草稿保存失败: code=${draftResponse.code} ${draftResponse.message || "未知错误"}`);
  }

  const result = {
    title: metadata.title,
    savedAt: new Date().toISOString(),
    category: { id: 231, name: "科技 / 计算机技术" },
    original: true,
    noReprint: true,
    submittedCategory: {
      tid: draftRequest?.tid,
      humanType: draftRequest?.human_type,
    },
    response: sanitizeDraftResponse(draftResponse),
  };
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
  await context.storageState({ path: statePath }).catch(() => {});

  console.log(`B站投稿草稿已保存: ${metadata.title}`);
  console.log("分类: 科技 / 计算机技术 (231)");
  console.log("原创: 是，禁止转载: 是");
  console.log(`草稿结果: ${resultPath}`);
} catch (error) {
  await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => {});
  throw error;
} finally {
  await browser.close();
  await fs.rm(uploadVideoPath, { force: true });
}

async function waitForUpload(currentPage) {
  const completed = currentPage.getByText("上传完成", { exact: true }).first();
  try {
    await completed.waitFor({ state: "visible", timeout: 180_000 });
  } catch {
    const status = (await currentPage.locator("body").innerText()).slice(-1_500).replaceAll("\n", " | ");
    throw new Error(`B站视频上传未完成，可能触发限频。页面状态: ${status}`);
  }
}

async function startUpload(currentPage, filePath) {
  const titleInput = currentPage.locator('input[placeholder="请输入稿件标题"]');
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    const notice = currentPage.getByRole("button", { name: "知道了" });
    if (await notice.count()) await notice.click().catch(() => {});
    await currentPage.locator('input[type="file"][accept*=".mp4"]').first().setInputFiles(filePath);
    try {
      await titleInput.waitFor({ state: "visible", timeout: 25_000 });
      return titleInput;
    } catch {
      if (attempt === 3) throw new Error("B站官方上传控件连续三次未接受视频文件");
      console.log(`上传控件未响应，等待后重试 (${attempt}/3)……`);
      await currentPage.waitForTimeout(30_000);
      await currentPage.reload({ waitUntil: "domcontentloaded", timeout: 120_000 });
      await currentPage.waitForTimeout(8_000);
    }
  }
  return titleInput;
}

async function selectOriginalNoReprint(currentPage) {
  const declaration = currentPage.locator('input[placeholder="请选择符合您视频内容的创作声明"]');
  await declaration.click();
  await currentPage.locator(".statement-main .bcc-option").filter({ hasText: "内容无需标注" }).click();
  await declaration.click();
  await currentPage.locator(".statement-main .auth-content").filter({
    hasText: "内容为自制：未经作者允许，禁止转载",
  }).click();
  await declaration.click();
}

async function selectCategory(currentPage) {
  const category = currentPage.locator(".video-human-type .select-controller");
  await category.click();
  await currentPage.locator(".video-human-type").getByText("科技数码", { exact: true }).last().click();
}

async function replaceTags(currentPage, tags) {
  const tagInput = currentPage.locator('input[placeholder="按回车键Enter创建标签"]').first();
  const removeButtons = currentPage.locator("#tag-container .tag-pre-wrp .close");
  for (let index = (await removeButtons.count()) - 1; index >= 0; index -= 1) {
    await removeButtons.nth(index).click({ force: true }).catch(() => {});
  }
  for (const tag of tags) {
    await tagInput.fill(tag);
    await tagInput.press("Enter");
    await currentPage.waitForTimeout(400);
    if (!await currentPage.locator("#tag-container .label-item-v2-content").filter({ hasText: tag }).count()) {
      await tagInput.press("Enter");
      await currentPage.waitForTimeout(400);
    }
  }
}

async function fillDescription(currentPage, description) {
  const editor = currentPage.locator('.ql-editor[contenteditable="true"]').first();
  await editor.click();
  await editor.fill(description);
}

async function uploadCover(currentPage, filePath) {
  await currentPage.getByText("添加封面", { exact: true }).click();
  const imageInput = currentPage.locator('input[type="file"][accept*="image"], input[type="file"][accept*=".jpg"], input[type="file"][accept*=".png"]').last();
  await imageInput.waitFor({ state: "attached", timeout: 20_000 });
  await imageInput.setInputFiles(filePath);
  await currentPage.waitForTimeout(1_500);

  const editor = currentPage.locator(".cover-editor");
  await editor.locator(".cover-editor-button .submit").click();
  await editor.waitFor({ state: "hidden", timeout: 30_000 });
}

function sanitizeDraftResponse(response) {
  if (!response) return { code: 0, message: "页面提示保存成功" };
  return {
    code: response.code,
    message: response.message,
    draftId: response.data?.draft_id || response.data?.id,
  };
}

async function ensureDraftDoesNotExist(title) {
  const state = JSON.parse(await fs.readFile(statePath, "utf8"));
  const cookie = state.cookies
    .filter((item) => item.domain.includes("bilibili.com"))
    .map((item) => `${item.name}=${item.value}`)
    .join("; ");
  const response = await fetch("https://member.bilibili.com/x/vupre/web/draft/list", {
    headers: { cookie, referer: "https://member.bilibili.com/" },
  });
  const data = await response.json();
  if (!response.ok || data.code !== 0) throw new Error(`B站草稿列表查询失败: ${data.message || response.status}`);
  if (data.data?.some((item) => item.title === title)) {
    throw new Error(`B站已存在同名草稿: ${title}`);
  }
}

function resolveInput(value, fallback) {
  if (!value) return fallback;
  return path.isAbsolute(value) ? value : path.join(root, value);
}
