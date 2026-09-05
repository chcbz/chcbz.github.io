import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";

const markdown = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

markdown.inline.ruler.after("escape", "wechat_math", (state, silent) => {
  const start = state.pos;
  if (state.src[start] !== "$" || state.src[start + 1] === "$" || /\s/.test(state.src[start + 1] || "")) return false;

  let end = start + 1;
  while ((end = state.src.indexOf("$", end)) >= 0) {
    if (state.src[end - 1] !== "\\" && !/\s/.test(state.src[end - 1] || "")) break;
    end += 1;
  }
  if (end < 0) return false;

  if (!silent) {
    const token = state.push("wechat_math", "img", 0);
    token.content = state.src.slice(start + 1, end);
  }
  state.pos = end + 1;
  return true;
});

markdown.renderer.rules.wechat_math = (tokens, index) => {
  const formula = tokens[index].content;
  const source = `https://latex.codecogs.com/png.image?${encodeURIComponent(`\\dpi{180} ${formula}`)}`;
  return `<img data-wechat-math="true" src="${source}" alt="${markdown.utils.escapeHtml(formula)}">`;
};

const containerStyles = {
  tip: { label: "提示", color: "#07c160", background: "#f0fff5" },
  info: { label: "信息", color: "#1677ff", background: "#f0f7ff" },
  warning: { label: "注意", color: "#d48806", background: "#fffbe6" },
  danger: { label: "警告", color: "#cf1322", background: "#fff2f0" },
  details: { label: "详情", color: "#595959", background: "#f7f7f7" },
};

for (const [name, style] of Object.entries(containerStyles)) {
  markdown.use(markdownItContainer, name, {
    render(tokens, index) {
      if (tokens[index].nesting === -1) return "</section>\n";
      const title = tokens[index].info.trim().slice(name.length).trim() || style.label;
      return `<section data-wechat-container="${name}" style="margin:16px 0;padding:12px 14px;background:${style.background};border-left:4px solid ${style.color};border-radius:4px;"><p style="margin:0 0 8px;font-size:16px;line-height:1.6;font-weight:700;color:${style.color};">${markdown.utils.escapeHtml(title)}</p>\n`;
    },
  });
}

const DEFAULT_SITE_URL = "https://blog.chcbz.net";

export async function loadArticle(filePath, options = {}) {
  const absolutePath = path.resolve(filePath);
  const source = await fs.readFile(absolutePath, "utf8");
  const parsed = matter(source.replace(/^\uFEFF/, ""));
  const title = parsed.data.title?.toString().trim();

  if (!title) {
    throw new Error(`${filePath} 缺少 front matter title`);
  }

  const siteUrl = (options.siteUrl || process.env.BLOG_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  const relativePath = path.relative(path.resolve("docs"), absolutePath).split(path.sep).join("/");
  const articlePath = relativePath.replace(/\.md$/i, ".html");
  const sourceUrl = `${siteUrl}/${encodeURI(articlePath)}`;
  const summary = getSummary(parsed.data, parsed.content);
  const tags = normalizeList(parsed.data.tag ?? parsed.data.tags).slice(0, 5);
  const categories = normalizeList(parsed.data.category ?? parsed.data.categories);

  return {
    filePath: absolutePath,
    baseDir: path.dirname(absolutePath),
    title,
    author: parsed.data.author?.toString().trim() || process.env.BLOG_AUTHOR || "布衣云水客",
    summary,
    tags,
    categories,
    cover: parsed.data.cover?.toString().trim() || "",
    sourceUrl,
    markdown: parsed.content.trim(),
    html: markdown.render(parsed.content),
    syndicate: normalizeSyndicate(parsed.data.syndicate),
  };
}

export function getPlatformEnabled(article, platform) {
  if (article.syndicate.enabled === false) return false;
  return article.syndicate[platform] !== false;
}

export function rewriteMarkdownImages(markdownSource, article) {
  const replaceUrl = (value) => resolvePublicUrl(value, article);

  return markdownSource
    .replace(/(!\[[^\]]*\]\()([^\s)]+)([^)]*\))/g, (_, prefix, src, suffix) => `${prefix}${replaceUrl(src)}${suffix}`)
    .replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_, prefix, src, suffix) => `${prefix}${replaceUrl(src)}${suffix}`);
}

export function rewriteHtmlImages(html, article) {
  return html.replace(/(<img\b[^>]*?\bsrc=["'])([^"']+)(["'][^>]*>)/gi, (_, prefix, src, suffix) => (
    `${prefix}${resolvePublicUrl(src, article)}${suffix}`
  ));
}

export function resolvePublicUrl(src, article) {
  if (/^(?:https?:)?\/\//i.test(src) || src.startsWith("data:")) return src;
  const siteUrl = new URL(article.sourceUrl).origin;
  if (src.startsWith("/")) return `${siteUrl}${encodeURI(src)}`;
  const articleDirectoryUrl = new URL("./", article.sourceUrl);
  return new URL(src, articleDirectoryUrl).toString();
}

export function resolveImageSource(src, article) {
  if (/^https?:\/\//i.test(src)) return { type: "remote", value: src };
  if (src.startsWith("//")) return { type: "remote", value: `https:${src}` };
  if (src.startsWith("data:")) return { type: "data", value: src };
  if (src.startsWith("/")) return { type: "local", value: path.resolve("docs/.vuepress/public", `.${src}`) };
  return { type: "local", value: path.resolve(article.baseDir, src) };
}

function getSummary(data, content) {
  const configured = data.summary ?? data.description ?? data.excerpt;
  if (configured) return configured.toString().trim().slice(0, 120);

  return content
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[[^\]]+\]\([^)]*\)/g, (link) => link.replace(/^\[|\]\([^)]*\)$/g, ""))
    .replace(/[#>*_`~|-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 120);
}

function normalizeList(value) {
  if (Array.isArray(value)) return value.map(String).map((item) => item.trim()).filter(Boolean);
  if (value == null) return [];
  return String(value).split(/[,，]/).map((item) => item.trim()).filter(Boolean);
}

function normalizeSyndicate(value) {
  if (value === false) return { enabled: false };
  if (!value || value === true) return { enabled: true };
  if (typeof value !== "object") return { enabled: true };
  return { enabled: value.enabled !== false, wechat: value.wechat, csdn: value.csdn };
}
