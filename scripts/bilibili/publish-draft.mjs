import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const title = process.env.BILIBILI_DRAFT_TITLE;
if (!title) throw new Error("缺少 BILIBILI_DRAFT_TITLE");

const statePath = path.join(root, ".cache/bilibili/storage-state.json");
const resultPath = resolveInput(process.env.BILIBILI_PUBLISH_RESULT, path.join(root, ".cache/bilibili/publish-result.json"));
const state = JSON.parse(await fs.readFile(statePath, "utf8"));
const cookie = state.cookies
  .filter((item) => item.domain.includes("bilibili.com"))
  .map((item) => `${item.name}=${item.value}`)
  .join("; ");
const apiHeaders = { cookie, referer: "https://member.bilibili.com/" };

const draft = await findDraft();
const draftView = await bilibiliJson(`https://member.bilibili.com/x/vupre/web/draft/view?id=${draft.id}`);
verifyDraft(draftView);

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({
  storageState: statePath,
  viewport: { width: 1440, height: 1000 },
  locale: "zh-CN",
});
const page = await context.newPage();
const publishResponses = [];

page.on("response", async (response) => {
  if (response.request().method() !== "POST") return;
  const pathname = new URL(response.url()).pathname;
  if (pathname.includes("/draft/") || !/(add|submit|archive)/i.test(pathname)) return;
  try {
    const data = await response.json();
    publishResponses.push({ pathname, httpStatus: response.status(), code: data.code, message: data.message, data: sanitizeResponseData(data.data) });
  } catch {
    publishResponses.push({ pathname, httpStatus: response.status() });
  }
});

try {
  await page.goto(`https://member.bilibili.com/platform/upload/video/frame?type=draft&draftId=${draft.id}`, {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.waitForTimeout(8_000);
  if (page.url().includes("passport.bilibili.com")) throw new Error("B站登录状态已失效，请重新扫码登录");

  const titleInput = page.locator('input[placeholder="请输入稿件标题"]');
  await titleInput.waitFor({ state: "visible", timeout: 60_000 });
  if (await titleInput.inputValue() !== title) throw new Error("打开的草稿标题与目标不一致");

  await page.locator(".submit-add").filter({ hasText: "立即投稿" }).click();
  await page.waitForTimeout(1_500);

  const dialog = page.locator('.bcc-dialog__wrap:visible, [role="dialog"]:visible').last();
  if (await dialog.count()) {
    const primary = dialog.locator('button.bcc-button--primary:visible, .button.submit:visible').last();
    if (await primary.count()) await primary.click();
  }

  for (let attempt = 0; attempt < 24; attempt += 1) {
    if (publishResponses.some((item) => item.code === 0)) break;
    const body = await page.locator("body").innerText();
    if (/验证|验证码|安全校验/.test(body.slice(-1_500))) throw new Error("B站要求额外安全验证，未自动完成投稿");
    await page.waitForTimeout(2_500);
  }

  const successfulResponse = publishResponses.find((item) =>
    item.code === 0 && !item.pathname.includes("/archive/types/predict"));

  let draftRemoved = false;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    const drafts = await bilibiliJson("https://member.bilibili.com/x/vupre/web/draft/list");
    draftRemoved = !drafts.some((item) => item.title === title);
    if (draftRemoved) break;
    await page.waitForTimeout(2_000);
  }

  let archive = null;
  for (let attempt = 0; attempt < 12; attempt += 1) {
    archive = await findArchiveByTitle(title);
    if (archive) break;
    await page.waitForTimeout(2_000);
  }
  if (!draftRemoved || !archive) {
    throw new Error(`投稿后未在内容管理中完成核验: ${JSON.stringify(publishResponses.slice(-5))}`);
  }

  const result = {
    title,
    submittedAt: new Date().toISOString(),
    draftRemoved,
    archive: {
      found: true,
      status: archive.status,
      state: archive.state,
      stateDesc: archive.state_desc || archive.reject_reason,
    },
    response: successfulResponse || {
      code: 0,
      message: "内容管理已确认投稿成功，未捕获到独立投稿响应",
    },
  };
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
  console.log(`B站视频已正式投稿: ${title}`);
  console.log(`内容管理状态: ${result.archive.stateDesc || result.archive.status || result.archive.state || "已提交"}`);
  console.log(`投稿结果: ${resultPath}`);
} finally {
  await browser.close().catch(() => {});
}

async function findDraft() {
  const drafts = await bilibiliJson("https://member.bilibili.com/x/vupre/web/draft/list");
  const matches = drafts.filter((item) => item.title === title);
  if (matches.length !== 1) throw new Error(`目标草稿数量异常: ${matches.length}`);
  return matches[0];
}

function verifyDraft(data) {
  const checks = {
    title: data.title === title,
    cover: Boolean(data.cover),
    video: data.videos?.length === 1,
    original: data.copyright === 1,
    noReprint: data.no_reprint === 1,
  };
  const failed = Object.entries(checks).filter(([, value]) => !value).map(([key]) => key);
  if (failed.length) throw new Error(`草稿发布前核验失败: ${failed.join(", ")}`);
}

async function findArchiveByTitle(targetTitle) {
  const statuses = ["is_pubing", "pubed", "not_pubed", "all"];
  for (const status of statuses) {
    const url = `https://member.bilibili.com/x/web/archives?status=${status}&pn=1&ps=30&coop=1&interactive=1`;
    try {
      const data = await bilibiliJson(url);
      const list = data.arc_audits || data.archives || data.list || [];
      const match = list.find((item) => item.title === targetTitle || item.Archive?.title === targetTitle);
      if (match) return match.Archive ? { ...match.Archive, ...match } : match;
    } catch {}
  }
  return null;
}

async function bilibiliJson(url) {
  const response = await fetch(url, { headers: apiHeaders });
  const data = await response.json();
  if (!response.ok || data.code !== 0) throw new Error(`B站接口失败: ${data.message || response.status}`);
  return data.data;
}

function sanitizeResponseData(data) {
  if (!data || typeof data !== "object") return undefined;
  return {
    aid: data.aid,
    bvid: data.bvid,
  };
}

function resolveInput(value, fallback) {
  if (!value) return fallback;
  return path.isAbsolute(value) ? value : path.join(root, value);
}
