import { execFileSync } from "node:child_process";
import path from "node:path";
import { getPlatformEnabled, loadArticle } from "./article.mjs";
import { getWechatDraftTitles, isWechatConfigured, publishWechat } from "./wechat.mjs";
import { isCsdnConfigured, publishCsdn } from "./csdn.mjs";

const dryRun = /^(?:1|true|yes)$/i.test(process.env.SYNDICATE_DRY_RUN || "");
const strict = !/^(?:0|false|no)$/i.test(process.env.SYNDICATE_STRICT || "true");
const files = getArticleFiles(process.argv.slice(2));

if (files.length === 0) {
  console.log("没有检测到新增中文博客文章，跳过同步发布。");
  process.exit(0);
}

let failures = 0;
const wechatDraftTitles = dryRun || !isWechatConfigured() ? null : await getWechatDraftTitles();
for (const file of files) {
  const article = await loadArticle(file);
  const platforms = [
    { id: "wechat", name: "微信公众号", configured: isWechatConfigured(), publish: publishWechat },
    { id: "csdn", name: "CSDN", configured: isCsdnConfigured(), publish: publishCsdn },
  ];

  console.log(`\n处理文章: ${article.title} (${file})`);
  for (const platform of platforms) {
    if (!getPlatformEnabled(article, platform.id)) {
      console.log(`- ${platform.name}: front matter 已禁用`);
      continue;
    }
    if (dryRun) {
      console.log(`- ${platform.name}: dry-run，将执行同步发布`);
      continue;
    }
    if (!platform.configured) {
      console.log(`- ${platform.name}: 未配置凭证，跳过`);
      continue;
    }
    if (platform.id === "wechat" && wechatDraftTitles?.has(article.title)) {
      console.log(`- ${platform.name}: 已有同标题草稿，跳过`);
      continue;
    }

    try {
      const result = await platform.publish(article);
      if (platform.id === "wechat") wechatDraftTitles?.add(article.title);
      console.log(`- ${platform.name}: ${result.mode === "publish" ? "已发布" : "已保存草稿"}${result.url ? ` ${result.url}` : ""}`);
    } catch (error) {
      failures += 1;
      console.error(`- ${platform.name}: ${error.message}`);
    }
  }
}

if (failures > 0 && strict) process.exitCode = 1;

function getArticleFiles(argumentsList) {
  const explicit = argumentsList.filter((item) => item.endsWith(".md"));
  if (explicit.length > 0) return uniqueArticles(explicit);

  const before = process.env.GITHUB_EVENT_BEFORE;
  const sha = process.env.GITHUB_SHA;
  if (!sha) return [];

  let output;
  try {
    if (before && !/^0+$/.test(before)) {
      output = execFileSync("git", ["diff", "--diff-filter=A", "--name-only", before, sha, "--", "docs/article/**/*.md"], { encoding: "utf8" });
    } else {
      output = execFileSync("git", ["show", "--diff-filter=A", "--name-only", "--format=", sha, "--", "docs/article/**/*.md"], { encoding: "utf8" });
    }
  } catch (error) {
    throw new Error(`无法检测新增文章: ${error.message}`);
  }
  return uniqueArticles(output.split(/\r?\n/));
}

function uniqueArticles(items) {
  return [...new Set(items.map((item) => item.trim()).filter((item) => /^docs\/article\/.*\.md$/i.test(item) && path.basename(item).toLowerCase() !== "readme.md"))];
}
