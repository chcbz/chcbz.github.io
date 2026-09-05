import assert from "node:assert/strict";
import test from "node:test";
import { publishCsdn } from "./csdn.mjs";
import { loadArticle } from "./article.mjs";
import { formatWechatCodeBlocks, formatWechatTables, getWechatDrafts, getWechatDraftTitles, prepareWechatHtml, publishWechat, replaceWechatDiagrams } from "./wechat.mjs";

const article = {
  title: "同步测试",
  author: "作者",
  summary: "​摘要",
  tags: ["Node.js", "自动化"],
  categories: ["文章"],
  cover: "",
  sourceUrl: "https://blog.chcbz.net/article/2026/demo.html",
  markdown: "正文",
  html: '<p>​<a href="../README.md">正文</a></p>',
  baseDir: process.cwd(),
};

test("微信公众号草稿发布请求", async (context) => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url, options = {}) => {
    requests.push({ url: String(url), options });
    if (String(url).endsWith("/cgi-bin/stable_token")) return jsonResponse({ access_token: "token" });
    return jsonResponse({ media_id: "draft-id" });
  };
  context.after(() => { globalThis.fetch = originalFetch; });

  const result = await publishWechat(article, {
    WECHAT_APP_ID: "app-id",
    WECHAT_APP_SECRET: "app-secret",
    WECHAT_THUMB_MEDIA_ID: "thumb-id",
    WECHAT_PUBLISH_MODE: "draft",
  });

  assert.equal(result.id, "draft-id");
  assert.equal(requests.length, 2);
  const payload = JSON.parse(requests[1].options.body);
  assert.equal(payload.articles[0].title, article.title);
  assert.equal(payload.articles[0].digest, "摘要");
  assert.equal(payload.articles[0].content_source_url, article.sourceUrl);
  assert.doesNotMatch(payload.articles[0].content, /\u200B/);
  assert.match(payload.articles[0].content, /https:\/\/blog\.chcbz\.net\/article\/README\.html/);
});

test("CSDN 发布请求包含标签和模式", async (context) => {
  const originalFetch = globalThis.fetch;
  let request;
  globalThis.fetch = async (url, options = {}) => {
    request = { url: String(url), options };
    return jsonResponse({ code: 200, data: { id: 12345 } });
  };
  context.after(() => { globalThis.fetch = originalFetch; });

  const result = await publishCsdn(article, {
    CSDN_COOKIE: "token=secret",
    CSDN_PUBLISH_MODE: "publish",
    CSDN_USERNAME: "demo",
  });

  const payload = JSON.parse(request.options.body);
  assert.equal(payload.tags, "Node.js,自动化");
  assert.equal(payload.pubStatus, "publish");
  assert.equal(result.url, "https://blog.csdn.net/demo/article/details/12345");
  assert.match(request.options.headers["x-ca-signature"], /.+/);
});

test("读取微信公众号草稿标题", async (context) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({
    total_count: 1,
    item_count: 1,
    item: [{ content: { news_item: [{ title: "已有文章" }] } }],
  });
  context.after(() => { globalThis.fetch = originalFetch; });

  const titles = await getWechatDraftTitles({}, "token");
  assert.deepEqual([...titles], ["已有文章"]);
});

test("读取微信公众号草稿 ID", async (context) => {
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async () => jsonResponse({
    total_count: 1,
    item_count: 1,
    item: [{ media_id: "draft-id", content: { news_item: [{ title: "已有文章" }] } }],
  });
  context.after(() => { globalThis.fetch = originalFetch; });

  const drafts = await getWechatDrafts({}, "token");
  assert.deepEqual(drafts, [{ mediaId: "draft-id", titles: ["已有文章"] }]);
});

test("清理微信公众号不兼容 HTML", () => {
  const html = '<!-- note --><p><a href="#章节">正文</a><code class="language-md">code</code></p>';
  const prepared = prepareWechatHtml(html, article);
  assert.doesNotMatch(prepared, /<!--|class=/);
  assert.match(prepared, /https:\/\/blog\.chcbz\.net\/article\/2026\/demo\.html#章节/);
});

test("将 Mermaid flowchart 转换为微信图片", async (context) => {
  const originalFetch = globalThis.fetch;
  const requests = [];
  globalThis.fetch = async (url) => {
    requests.push(String(url));
    if (String(url).includes("mermaid.ink")) {
      return new Response(Buffer.from([137, 80, 78, 71]), {
        status: 200,
        headers: { "content-type": "image/png" },
      });
    }
    return jsonResponse({ url: "https://mmbiz.qpic.cn/flowchart.png" });
  };
  context.after(() => { globalThis.fetch = originalFetch; });

  const html = '<pre><code class="language-mermaid">flowchart LR\nA--&gt;B\n</code></pre>';
  const result = await replaceWechatDiagrams(html, article, "token", {});
  assert.match(requests[0], /mermaid\.ink\/img\/pako:/);
  assert.match(result, /mmbiz\.qpic\.cn\/flowchart\.png/);
  assert.doesNotMatch(result, /language-mermaid|flowchart LR/);
});

test("将代码块转换为逐行微信 HTML", () => {
  const html = '<pre><code class="language-js">const value = 1;\n  return value;\n\n</code></pre>';
  const result = formatWechatCodeBlocks(html);
  assert.doesNotMatch(result, /<pre>/);
  assert.equal((result.match(/<br>/g) || []).length, 2);
  assert.match(result, /&#160;&#160;return value;/);
  assert.match(result, /white-space:pre-wrap/);
});

test("为微信公众号表格添加内联样式", () => {
  const html = '<table><thead><tr><th style="text-align:center">名称</th></tr></thead><tbody><tr><td>示例</td></tr></tbody></table>';
  const result = formatWechatTables(html);
  assert.match(result, /overflow-x:auto/);
  assert.match(result, /border-collapse:collapse/);
  assert.match(result, /<th[^>]+border:1px solid/);
  assert.match(result, /<td[^>]+border:1px solid/);
  assert.equal((result.match(/<th[^>]*style=/g) || []).length, 1);
  assert.match(result, /text-align:center/);
});

test("将 VuePress 容器转换为微信公众号提示块", async () => {
  const loaded = await loadArticle("docs/article/2026/202603071721.md");
  assert.doesNotMatch(loaded.html, /:::/);
  assert.match(loaded.html, /data-wechat-container="tip"/);
  assert.match(loaded.html, /核心技术/);
  assert.match(loaded.html, /data-wechat-container="details"/);
});

test("将 LaTeX 行内公式转换为微信公众号图片", async () => {
  const loaded = await loadArticle("docs/article/2018/2018122117.md");
  assert.match(loaded.html, /data-wechat-math="true"/);
  assert.match(loaded.html, /latex\.codecogs\.com\/png\.image/);
  assert.doesNotMatch(loaded.html, /\$y = W \\times x \+ b\$/);
});

test("为微信公众号常用排版元素添加内联样式", () => {
  const html = "<h4>标题</h4><ul><li><a href=\"https://example.com\">链接</a>和<code>代码</code></li></ul><hr>";
  const result = prepareWechatHtml(html, article);
  assert.match(result, /<h4 style=/);
  assert.match(result, /<ul style=/);
  assert.match(result, /<li style=/);
  assert.match(result, /<a href="https:\/\/example\.com" style=/);
  assert.match(result, /<code style=/);
  assert.match(result, /<hr style=/);
});

function jsonResponse(data) {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
