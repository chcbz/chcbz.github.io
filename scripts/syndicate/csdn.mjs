import crypto from "node:crypto";
import { rewriteHtmlImages, rewriteMarkdownImages } from "./article.mjs";

const API_PATH = "/blog-console-api/v3/mdeditor/saveArticle";
const API_KEY = "203803574";
const API_SECRET = "9znpamsyl2c7cdrr9sas0le9vbc3r6ba";

export function isCsdnConfigured(env = process.env) {
  return Boolean(env.CSDN_COOKIE);
}

export async function publishCsdn(article, env = process.env) {
  const mode = (env.CSDN_PUBLISH_MODE || "draft").toLowerCase();
  const publish = mode === "publish";
  const markdown = rewriteMarkdownImages(article.markdown, article);
  const headers = signHeaders(env.CSDN_COOKIE);
  const payload = {
    title: article.title,
    markdowncontent: markdown,
    content: rewriteHtmlImages(article.html, article),
    readType: "public",
    level: 0,
    tags: article.tags.join(","),
    status: publish ? 0 : 2,
    categories: article.categories[0] || "",
    type: env.CSDN_ARTICLE_TYPE || "original",
    original_link: "",
    authorized_status: false,
    Description: article.summary,
    resource_url: "",
    not_auto_saved: "1",
    source: "pc_mdeditor",
    cover_images: [],
    cover_type: 0,
    is_new: 1,
    vote_id: 0,
    resource_id: "",
    pubStatus: publish ? "publish" : "draft",
    sync_git_code: 0,
    creator_activity_id: "",
  };

  const response = await fetch(`https://bizapi.csdn.net${API_PATH}`, {
    method: "POST",
    headers,
    body: JSON.stringify(payload),
  });
  const text = await response.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`CSDN 返回非 JSON: HTTP ${response.status}`);
  }

  if (!response.ok || data.code !== 200 || !data.data?.id) {
    throw new Error(`CSDN 发布失败: ${data.msg || data.message || `HTTP ${response.status}`}`);
  }

  const id = String(data.data.id);
  return {
    platform: "CSDN",
    mode: publish ? "publish" : "draft",
    id,
    url: publish && env.CSDN_USERNAME
      ? `https://blog.csdn.net/${env.CSDN_USERNAME}/article/details/${id}`
      : `https://editor.csdn.net/md?articleId=${id}`,
  };
}

function signHeaders(cookie) {
  const nonce = crypto.randomUUID();
  const signText = `POST\n*/*\n\napplication/json\n\nx-ca-key:${API_KEY}\nx-ca-nonce:${nonce}\n${API_PATH}`;
  const signature = crypto.createHmac("sha256", API_SECRET).update(signText).digest("base64");

  return {
    accept: "*/*",
    "content-type": "application/json",
    cookie,
    origin: "https://editor.csdn.net",
    referer: "https://editor.csdn.net/",
    "user-agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/120 Safari/537.36",
    "x-ca-key": API_KEY,
    "x-ca-nonce": nonce,
    "x-ca-signature": signature,
    "x-ca-signature-headers": "x-ca-key,x-ca-nonce",
  };
}
