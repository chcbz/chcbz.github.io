import { execFileSync } from "node:child_process";
import { loadArticle } from "./article.mjs";
import {
  deleteWechatDraft,
  getWechatAccessToken,
  getWechatDrafts,
  isWechatConfigured,
  publishWechat,
} from "./wechat.mjs";

if (!isWechatConfigured()) {
  throw new Error("缺少 WECHAT_APP_ID 或 WECHAT_APP_SECRET");
}

const files = execFileSync("git", ["ls-files", "docs/article/**/*.md"], { encoding: "utf8" })
  .split(/\r?\n/)
  .map((file) => file.trim())
  .filter((file) => file && !file.endsWith("/README.md"))
  .sort();

const articles = [];
for (const file of files) {
  const article = await loadArticle(file);
  if (/^:::(?:tip|info|warning|danger|details)\b/m.test(article.markdown)
    || /<(?:table|h[4-6])\b/i.test(article.html)
    || /data-wechat-math="true"/i.test(article.html)) {
    articles.push(article);
  }
}

const accessToken = await getWechatAccessToken();
const existingDrafts = await getWechatDrafts(process.env, accessToken);
const draftsByTitle = new Map();
for (const draft of existingDrafts) {
  for (const title of draft.titles) {
    const mediaIds = draftsByTitle.get(title) || [];
    mediaIds.push(draft.mediaId);
    draftsByTitle.set(title, mediaIds);
  }
}

const summary = { total: articles.length, replaced: 0, deleted: 0, failed: 0 };
console.log(`准备替换 ${articles.length} 篇包含特殊容器、表格、深层标题或公式的公众号草稿。`);

for (const [index, article] of articles.entries()) {
  const progress = `[${index + 1}/${articles.length}]`;
  const oldMediaIds = draftsByTitle.get(article.title) || [];

  try {
    const replacement = await publishWechat(
      article,
      { ...process.env, WECHAT_PUBLISH_MODE: "draft" },
      { accessToken },
    );

    for (const mediaId of oldMediaIds) {
      if (mediaId === replacement.id) continue;
      await deleteWechatDraft(mediaId, process.env, accessToken);
      summary.deleted += 1;
    }

    summary.replaced += 1;
    console.log(`${progress} 已替换草稿: ${article.title}`);
  } catch (error) {
    summary.failed += 1;
    console.error(`${progress} 替换失败，旧草稿已保留: ${article.title} - ${error.message}`);
  }
}

console.log(`替换完成: 目标 ${summary.total}，成功 ${summary.replaced}，删除旧草稿 ${summary.deleted}，失败 ${summary.failed}`);
if (summary.failed > 0) process.exitCode = 1;
