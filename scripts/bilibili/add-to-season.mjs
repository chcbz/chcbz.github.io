import fs from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright";

const root = process.cwd();
const title = process.env.BILIBILI_EPISODE_TITLE;
const bvid = process.env.BILIBILI_BVID;
const seasonId = Number(process.env.BILIBILI_SEASON_ID || 8990217);
const sectionId = Number(process.env.BILIBILI_SECTION_ID || 10030810);

if (!title) throw new Error("缺少 BILIBILI_EPISODE_TITLE");
if (!bvid) throw new Error("缺少 BILIBILI_BVID");

const statePath = path.join(root, ".cache/bilibili/storage-state.json");
const resultPath = resolveInput(
  process.env.BILIBILI_SEASON_RESULT,
  path.join(root, ".cache/bilibili/season-result.json"),
);

const before = await getSeason();
const existing = before.part_episodes?.find((episode) => episode.bvid === bvid);
if (existing) {
  verifyEpisode(existing);
  await writeResult(existing, true, []);
  console.log(`B站视频已在目标合集内: ${bvid}`);
  process.exit(0);
}

const browser = await chromium.launch({ headless: true, args: ["--no-sandbox"] });
const context = await browser.newContext({
  storageState: statePath,
  viewport: { width: 1440, height: 1000 },
  locale: "zh-CN",
});
const page = await context.newPage();
const mutationResponses = [];

page.on("response", async (response) => {
  const pathname = new URL(response.url()).pathname;
  if (response.request().method() !== "POST" || !/season|section|episode/.test(pathname)) return;
  try {
    const data = await response.json();
    mutationResponses.push({
      pathname,
      httpStatus: response.status(),
      code: data.code,
      message: data.message,
    });
  } catch {
    mutationResponses.push({ pathname, httpStatus: response.status() });
  }
});

try {
  await page.goto("https://member.bilibili.com/platform/upload-manager/ep", {
    waitUntil: "domcontentloaded",
    timeout: 120_000,
  });
  await page.waitForTimeout(5_000);
  if (page.url().includes("passport.bilibili.com")) {
    throw new Error("B站登录状态已失效，请重新扫码登录");
  }

  const seasonCard = page.locator(`#ep-list-${seasonId}`);
  await seasonCard.waitFor({ state: "visible", timeout: 30_000 });
  await seasonCard.getByText("添加单集", { exact: true }).click();
  await page.waitForTimeout(1_500);

  const episodeItem = page.getByText(title, { exact: true }).locator(
    'xpath=ancestor::div[contains(@class,"ep-select-box-item-all")][1]',
  );
  await episodeItem.waitFor({ state: "visible", timeout: 30_000 });
  const verified = page.waitForResponse(
    (response) => response.url().includes("/season/section/episode/verify"),
    { timeout: 30_000 },
  );
  await episodeItem.click();
  const verifyData = await (await verified).json();
  if (verifyData.code !== 0) throw new Error(`B站单集校验失败: ${verifyData.message}`);

  // The current collection editor requires confirming the checked archive with
  // the center transfer arrow before the step button becomes effective.
  await page.locator(".ep-select-box-split").click();
  await page.waitForTimeout(500);
  await page.locator(".add-av-modal-step-submit .ep-button-primary").click();
  await page.locator(".add-av-modal-step-1-select").waitFor({ state: "detached", timeout: 15_000 });
  await page.getByText("完成", { exact: true }).last().click();
  await page.getByText("将所选稿件的以下视频添加到合集中，每个视频作为单独一集", { exact: true })
    .waitFor({ state: "detached", timeout: 15_000 });

  if (await page.getByText(title, { exact: true }).count() < 1) {
    throw new Error("合集编辑表未出现目标单集");
  }

  await page.getByText("立即提交", { exact: true }).click();
  await page.waitForTimeout(1_500);
  const dialog = page.locator('.bcc-dialog__wrap:visible, [role="dialog"]:visible').last();
  if (await dialog.count()) {
    const confirm = dialog.getByText(/确定|确认|提交/).last();
    if (await confirm.count()) await confirm.click();
  }

  for (let attempt = 0; attempt < 20; attempt += 1) {
    if (mutationResponses.some((item) => item.code === 0 && item.pathname.includes("/episodes/add"))) break;
    await page.waitForTimeout(1_000);
  }
  await context.storageState({ path: statePath }).catch(() => {});
} finally {
  await browser.close().catch(() => {});
}

let episode;
for (let attempt = 0; attempt < 15; attempt += 1) {
  const season = await getSeason();
  episode = season.part_episodes?.find((item) => item.bvid === bvid);
  if (episode) break;
  await new Promise((resolve) => setTimeout(resolve, 2_000));
}
if (!episode) throw new Error("合集提交后未查询到目标单集");
verifyEpisode(episode);
await writeResult(episode, false, mutationResponses);

console.log(`B站视频已加入合集 ${seasonId}: ${bvid}`);
console.log(`合集分组: ${sectionId}`);
console.log(`合集结果: ${resultPath}`);

async function getSeason() {
  const state = JSON.parse(await fs.readFile(statePath, "utf8"));
  const cookie = state.cookies
    .filter((item) => item.domain.includes("bilibili.com"))
    .map((item) => `${item.name}=${item.value}`)
    .join("; ");
  const response = await fetch(
    "https://member.bilibili.com/x2/creative/web/seasons?pn=1&ps=30&order=&sort=&draft=1&source=0",
    { headers: { cookie, referer: "https://member.bilibili.com/platform/upload-manager/ep" } },
  );
  const data = await response.json();
  if (!response.ok || data.code !== 0) throw new Error(`B站合集查询失败: ${data.message || response.status}`);
  const season = data.data?.seasons?.find((item) => item.season?.id === seasonId);
  if (!season) throw new Error(`未找到B站合集: ${seasonId}`);
  return season;
}

function verifyEpisode(episode) {
  if (episode.seasonId !== seasonId || episode.sectionId !== sectionId || episode.title !== title) {
    throw new Error("B站合集单集核验失败");
  }
}

async function writeResult(episode, alreadyPresent, responses) {
  const result = {
    verifiedAt: new Date().toISOString(),
    alreadyPresent,
    seasonId,
    sectionId,
    episode: {
      id: episode.id,
      title: episode.title,
      aid: episode.aid,
      bvid: episode.bvid,
      order: episode.order,
    },
    responses,
  };
  await fs.writeFile(resultPath, JSON.stringify(result, null, 2));
}

function resolveInput(value, fallback) {
  if (!value) return fallback;
  return path.isAbsolute(value) ? value : path.join(root, value);
}
