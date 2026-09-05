import { execFileSync } from "node:child_process";
import { loadArticle } from "./article.mjs";
import {
  getWechatAccessToken,
  getWechatDraftTitles,
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

const accessToken = await getWechatAccessToken();
const existingTitles = await getWechatDraftTitles(process.env, accessToken);
const summary = { total: files.length, created: 0, skipped: 0, failed: 0 };

console.log(`检测到 ${files.length} 篇中文文章，公众号已有 ${existingTitles.size} 个草稿标题。`);

for (const [index, file] of files.entries()) {
  const article = await loadArticle(file);
  const progress = `[${index + 1}/${files.length}]`;

  if (existingTitles.has(article.title)) {
    summary.skipped += 1;
    console.log(`${progress} 跳过已有草稿: ${article.title}`);
    continue;
  }

  try {
    await publishWechat(article, { ...process.env, WECHAT_PUBLISH_MODE: "draft" }, { accessToken });
    existingTitles.add(article.title);
    summary.created += 1;
    console.log(`${progress} 已创建草稿: ${article.title}`);
  } catch (error) {
    summary.failed += 1;
    console.error(`${progress} 创建失败: ${article.title} - ${error.message}`);
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
}

console.log(`批处理完成: 总数 ${summary.total}，新增 ${summary.created}，跳过 ${summary.skipped}，失败 ${summary.failed}`);
if (summary.failed > 0) process.exitCode = 1;
