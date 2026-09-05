import fs from "node:fs/promises";
import path from "node:path";
import zlib from "node:zlib";
import { resolveImageSource, resolvePublicUrl } from "./article.mjs";

const API_BASE = "https://api.weixin.qq.com";
const permanentMediaCache = new Map();
const diagramUrlCache = new Map();

export function isWechatConfigured(env = process.env) {
  return Boolean(env.WECHAT_APP_ID && env.WECHAT_APP_SECRET);
}

export async function publishWechat(article, env = process.env, options = {}) {
  const accessToken = options.accessToken || await getWechatAccessToken(env);
  const imageContent = await replaceImages(article.html, article, accessToken);
  const content = await replaceWechatDiagrams(imageContent, article, accessToken, env);
  const thumbMediaId = await getThumbMediaId(article, accessToken, env);
  const draftPayload = {
    articles: [{
      title: cleanWechatText(article.title),
      author: cleanWechatText(article.author),
      digest: cleanWechatText(article.summary),
      content: prepareWechatHtml(content, article),
      content_source_url: article.sourceUrl,
      ...(thumbMediaId ? { thumb_media_id: thumbMediaId } : {}),
      need_open_comment: Number(env.WECHAT_OPEN_COMMENT || 0),
      only_fans_can_comment: Number(env.WECHAT_ONLY_FANS_COMMENT || 0),
    }],
  };

  const draft = await wechatJson("/cgi-bin/draft/add", accessToken, draftPayload);
  const mode = (env.WECHAT_PUBLISH_MODE || "draft").toLowerCase();
  if (mode !== "publish") {
    return { platform: "微信公众号", mode: "draft", id: draft.media_id };
  }

  const submitted = await wechatJson("/cgi-bin/freepublish/submit", accessToken, { media_id: draft.media_id });
  const result = await waitForPublish(accessToken, submitted.publish_id);
  return {
    platform: "微信公众号",
    mode: "publish",
    id: submitted.publish_id,
    url: result?.article_detail?.item?.[0]?.article_url,
  };
}

export async function getWechatAccessToken(env = process.env) {
  const response = await fetch(`${API_BASE}/cgi-bin/stable_token`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      grant_type: "client_credential",
      appid: env.WECHAT_APP_ID,
      secret: env.WECHAT_APP_SECRET,
      force_refresh: false,
    }),
  });
  const data = await readJson(response, "获取微信公众号 access_token");
  if (!data.access_token) throw new Error(`微信公众号授权失败: ${data.errmsg || JSON.stringify(data)}`);
  return data.access_token;
}

export async function getWechatDraftTitles(env = process.env, accessToken) {
  const drafts = await getWechatDrafts(env, accessToken);
  const titles = new Set();

  for (const draft of drafts) {
    for (const title of draft.titles) titles.add(title);
  }

  return titles;
}

export async function getWechatDrafts(env = process.env, accessToken) {
  const token = accessToken || await getWechatAccessToken(env);
  const drafts = [];
  let offset = 0;
  let total = 0;

  do {
    const page = await wechatJson("/cgi-bin/draft/batchget", token, { offset, count: 20, no_content: 1 });
    total = page.total_count || 0;
    for (const item of page.item || []) {
      drafts.push({
        mediaId: item.media_id,
        titles: (item.content?.news_item || []).map((article) => article.title).filter(Boolean),
      });
    }
    offset += page.item_count || 0;
  } while (offset < total);

  return drafts;
}

export async function deleteWechatDraft(mediaId, env = process.env, accessToken) {
  const token = accessToken || await getWechatAccessToken(env);
  await wechatJson("/cgi-bin/draft/delete", token, { media_id: mediaId });
}

async function getThumbMediaId(article, accessToken, env) {
  if (env.WECHAT_THUMB_MEDIA_ID) return env.WECHAT_THUMB_MEDIA_ID;
  const firstImage = article.html.match(/<img\b[^>]*?\bsrc=["']([^"']+)["']/i)?.[1];
  const candidates = [article.cover, firstImage].filter(Boolean);
  let lastError;

  for (const cover of [...new Set(candidates)]) {
    const resolved = resolveImageSource(cover, article);
    const cacheKey = `${resolved.type}:${resolved.value}`;
    if (permanentMediaCache.has(cacheKey)) return permanentMediaCache.get(cacheKey);

    try {
      const image = await loadImage(cover, article);
      const mediaId = await uploadImage("/cgi-bin/material/add_material", accessToken, image, true);
      permanentMediaCache.set(cacheKey, mediaId);
      return mediaId;
    } catch (error) {
      lastError = error;
      console.warn(`微信公众号封面不可用 ${cover}: ${error.message}`);
    }
  }

  throw lastError || new Error("微信公众号文章缺少封面，请设置 front matter cover 或添加正文图片");
}

async function replaceImages(html, article, accessToken) {
  const matches = [...html.matchAll(/<img\b[^>]*?\bsrc=["']([^"']+)["'][^>]*>/gi)];
  let result = html;

  for (const match of matches) {
    if (/mmbiz\.(?:qpic|qlogo)\.cn/i.test(match[1])) continue;
    const image = await loadImage(match[1], article);
    const url = await uploadImage("/cgi-bin/media/uploadimg", accessToken, image, false);
    result = result.replace(match[0], match[0].replace(match[1], url));
  }
  return result;
}

export async function replaceWechatDiagrams(html, article, accessToken, env = process.env) {
  const pattern = /<pre><code class="language-(?:mermaid|flowchart)">([\s\S]*?)<\/code><\/pre>/gi;
  const matches = [...html.matchAll(pattern)];
  let result = html;

  for (const [index, match] of matches.entries()) {
    const code = decodeHtml(match[1]).trim();
    const cacheKey = code;
    let imageUrl = diagramUrlCache.get(cacheKey);

    if (!imageUrl) {
      const image = await renderMermaidPng(code, env);
      imageUrl = await uploadImage("/cgi-bin/media/uploadimg", accessToken, image, false);
      diagramUrlCache.set(cacheKey, imageUrl);
    }

    const alt = escapeHtml(`${article.title} 流程图 ${index + 1}`);
    result = result.replace(match[0], `<p><img src="${imageUrl}" alt="${alt}"></p>`);
  }

  return result;
}

async function renderMermaidPng(code, env) {
  const payload = JSON.stringify({
    code,
    mermaid: { theme: env.MERMAID_THEME || "default" },
    autoSync: true,
    updateDiagram: true,
  });
  const encoded = zlib.deflateSync(payload).toString("base64url");
  const baseUrl = (env.MERMAID_INK_URL || "https://mermaid.ink").replace(/\/$/, "");
  const background = encodeURIComponent(env.MERMAID_BACKGROUND || "FFFFFF");
  const response = await fetch(`${baseUrl}/img/pako:${encoded}?type=png&bgColor=${background}`, {
    signal: AbortSignal.timeout(Number(env.MERMAID_RENDER_TIMEOUT_MS || 60000)),
  });

  if (!response.ok) {
    throw new Error(`Mermaid 转图片失败: HTTP ${response.status}`);
  }

  const type = response.headers.get("content-type") || "image/png";
  if (!type.includes("image/")) throw new Error(`Mermaid 转图片返回类型异常: ${type}`);
  return { bytes: Buffer.from(await response.arrayBuffer()), name: "flowchart.png", type };
}

async function loadImage(src, article) {
  const resolved = resolveImageSource(src, article);
  if (resolved.type === "data") throw new Error("微信公众号同步暂不支持 data URI 图片");

  if (resolved.type === "remote") {
    const response = await fetch(resolved.value);
    if (!response.ok) throw new Error(`下载图片失败 ${resolved.value}: HTTP ${response.status}`);
    const type = response.headers.get("content-type") || "image/jpeg";
    const extension = extensionFromType(type);
    return { bytes: Buffer.from(await response.arrayBuffer()), name: `image${extension}`, type };
  }

  const bytes = await fs.readFile(resolved.value);
  const extension = path.extname(resolved.value) || ".jpg";
  return { bytes, name: path.basename(resolved.value), type: contentType(extension) };
}

async function uploadImage(endpoint, accessToken, image, permanent) {
  const form = new FormData();
  form.append("media", new Blob([image.bytes], { type: image.type }), image.name);
  const query = permanent ? "&type=image" : "";
  const response = await fetch(`${API_BASE}${endpoint}?access_token=${accessToken}${query}`, { method: "POST", body: form });
  const data = await readJson(response, "上传微信公众号图片");
  const value = permanent ? data.media_id : data.url;
  if (!value) throw new Error(`微信公众号图片上传失败: ${data.errmsg || JSON.stringify(data)}`);
  return value;
}

async function wechatJson(endpoint, accessToken, payload) {
  const response = await fetch(`${API_BASE}${endpoint}?access_token=${accessToken}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await readJson(response, endpoint);
  if (data.errcode) throw new Error(`微信公众号接口失败 ${data.errcode}: ${data.errmsg}`);
  return data;
}

async function waitForPublish(accessToken, publishId) {
  for (let attempt = 0; attempt < 6; attempt += 1) {
    if (attempt > 0) await new Promise((resolve) => setTimeout(resolve, 5000));
    const result = await wechatJson("/cgi-bin/freepublish/get", accessToken, { publish_id: publishId });
    if (result.publish_status === 0) return result;
    if ([2, 3, 4].includes(result.publish_status)) {
      throw new Error(`微信公众号发布失败，状态码: ${result.publish_status}`);
    }
  }
  return null;
}

async function readJson(response, action) {
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`${action}返回非 JSON: HTTP ${response.status}`);
  }
  if (!response.ok) throw new Error(`${action}失败: HTTP ${response.status} ${data.errmsg || text}`);
  return data;
}

export function prepareWechatHtml(html, article) {
  return styleWechatHtml(rewriteWechatLinks(formatWechatTables(formatWechatCodeBlocks(html)), article))
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/\sclass=["'][^"']*["']/gi, "");
}

export function formatWechatTables(html) {
  return html
    .replace(/<table\b[^>]*>/gi, (tag) => `<section style="margin:16px 0;overflow-x:auto;-webkit-overflow-scrolling:touch;">${appendInlineStyle(tag, "width:100%;border-collapse:collapse;border-spacing:0;font-size:14px;line-height:1.6;")}`)
    .replace(/<\/table>/gi, "</table></section>")
    .replace(/<th\b[^>]*>/gi, (tag) => appendInlineStyle(tag, "padding:8px 10px;border:1px solid #d9d9d9;background:#f5f5f5;font-weight:700;vertical-align:top;word-break:break-word;"))
    .replace(/<td\b[^>]*>/gi, (tag) => appendInlineStyle(tag, "padding:8px 10px;border:1px solid #d9d9d9;vertical-align:top;word-break:break-word;"));
}

export function formatWechatCodeBlocks(html) {
  return html.replace(/<pre><code(?:\s+class="[^"]*")?>([\s\S]*?)<\/code><\/pre>/gi, (_, code) => {
    const normalized = code.replace(/\r\n?/g, "\n").replace(/\n$/, "");
    const lines = normalized.split("\n");
    const renderedLines = lines
      .map((line) => preserveCodeIndentation(line) || "&#160;")
      .join("<br>");
    return `<section style="margin:16px 0;padding:14px;background:#f6f8fa;border-radius:6px;overflow-wrap:anywhere;"><code style="font-family:Consolas,Monaco,monospace;font-size:13px;line-height:1.6;color:#24292f;white-space:pre-wrap;word-break:break-all;">${renderedLines}</code></section>`;
  });
}

function styleWechatHtml(html) {
  return html
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/<h1>/g, '<h1 style="font-size:24px;margin:28px 0 16px;line-height:1.4;">')
    .replace(/<h2>/g, '<h2 style="font-size:21px;margin:26px 0 14px;line-height:1.4;border-left:4px solid #07c160;padding-left:10px;">')
    .replace(/<h3>/g, '<h3 style="font-size:18px;margin:22px 0 12px;line-height:1.5;">')
    .replace(/<h4>/g, '<h4 style="font-size:17px;margin:20px 0 10px;line-height:1.5;color:#222;">')
    .replace(/<h5>/g, '<h5 style="font-size:16px;margin:18px 0 10px;line-height:1.5;color:#333;">')
    .replace(/<h6>/g, '<h6 style="font-size:15px;margin:16px 0 8px;line-height:1.5;color:#555;">')
    .replace(/<p>/g, '<p style="font-size:16px;line-height:1.8;margin:12px 0;color:#333;">')
    .replace(/<blockquote>/g, '<blockquote style="margin:16px 0;padding:10px 14px;background:#f7f7f7;border-left:4px solid #d0d0d0;color:#666;">')
    .replace(/<ul>/g, '<ul style="margin:12px 0;padding-left:26px;color:#333;">')
    .replace(/<ol>/g, '<ol style="margin:12px 0;padding-left:26px;color:#333;">')
    .replace(/<li>/g, '<li style="margin:6px 0;font-size:16px;line-height:1.75;">')
    .replace(/<hr>/g, '<hr style="margin:24px 0;border:0;border-top:1px solid #e5e5e5;">')
    .replace(/<code>/g, '<code style="padding:2px 5px;background:#f2f3f5;border-radius:3px;font-family:Consolas,Monaco,monospace;font-size:0.9em;color:#c7254e;word-break:break-word;">')
    .replace(/<a\b(?![^>]*\bstyle=)([^>]*)>/gi, '<a$1 style="color:#1677ff;text-decoration:none;word-break:break-all;">')
    .replace(/<pre>/g, '<pre style="overflow-x:auto;padding:14px;background:#f6f8fa;border-radius:6px;font-size:13px;line-height:1.6;">')
    .replace(/<img\b(?=[^>]*\bdata-wechat-math=)/gi, '<img style="max-width:100%;height:auto;display:inline-block;vertical-align:middle;margin:0 3px;"')
    .replace(/<img\b(?![^>]*\bdata-wechat-math=)/gi, '<img style="max-width:100%;height:auto;display:block;margin:16px auto;"');
}

function rewriteWechatLinks(html, article) {
  return html.replace(/(<a\b[^>]*?\bhref=["'])([^"']+)(["'][^>]*>)/gi, (_, prefix, href, suffix) => {
    if (/^(?:https?:|mailto:|tel:)/i.test(href)) return `${prefix}${href}${suffix}`;
    const absoluteUrl = href.startsWith("#")
      ? `${article.sourceUrl}${href}`
      : resolvePublicUrl(href, article).replace(/\.md(?=$|[?#])/i, ".html");
    return `${prefix}${absoluteUrl}${suffix}`;
  });
}

function contentType(extension) {
  return ({ ".png": "image/png", ".gif": "image/gif", ".webp": "image/webp", ".svg": "image/svg+xml" })[extension.toLowerCase()] || "image/jpeg";
}

function extensionFromType(type) {
  if (type.includes("png")) return ".png";
  if (type.includes("gif")) return ".gif";
  if (type.includes("webp")) return ".webp";
  return ".jpg";
}

function cleanWechatText(value) {
  return String(value || "")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F\u200B-\u200D\uFEFF]/g, "")
    .trim();
}

function decodeHtml(value) {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&");
}

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function preserveCodeIndentation(value) {
  return value.replace(/^[\t ]+/, (indentation) => (
    [...indentation].map((character) => character === "\t" ? "&#160;&#160;&#160;&#160;" : "&#160;").join("")
  ));
}

function appendInlineStyle(tag, style) {
  if (/\sstyle=["']/i.test(tag)) {
    return tag.replace(/(\sstyle=["'])([^"']*)(["'])/i, (_, prefix, current, suffix) => (
      `${prefix}${current.trim().replace(/;?$/, ";")}${style}${suffix}`
    ));
  }
  return tag.replace(/>$/, ` style="${style}">`);
}
