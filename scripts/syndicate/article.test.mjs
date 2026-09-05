import assert from "node:assert/strict";
import test from "node:test";
import path from "node:path";
import { getPlatformEnabled, resolveImageSource, resolvePublicUrl, rewriteHtmlImages, rewriteMarkdownImages } from "./article.mjs";

const article = {
  baseDir: path.resolve("docs/article/2026"),
  sourceUrl: "https://blog.chcbz.net/article/2026/demo.html",
  syndicate: { enabled: true, wechat: true, csdn: false },
};

test("解析平台开关", () => {
  assert.equal(getPlatformEnabled(article, "wechat"), true);
  assert.equal(getPlatformEnabled(article, "csdn"), false);
  assert.equal(getPlatformEnabled({ ...article, syndicate: { enabled: false } }, "wechat"), false);
});

test("将相对图片转换为博客绝对地址", () => {
  assert.equal(resolvePublicUrl("assets/demo/a.png", article), "https://blog.chcbz.net/article/2026/assets/demo/a.png");
  assert.equal(resolvePublicUrl("/logo.png", article), "https://blog.chcbz.net/logo.png");
  assert.equal(rewriteMarkdownImages("![图](assets/a.png)", article), "![图](https://blog.chcbz.net/article/2026/assets/a.png)");
  assert.equal(rewriteHtmlImages('<img src="assets/a.png">', article), '<img src="https://blog.chcbz.net/article/2026/assets/a.png">');
});

test("将图片定位到本地文件", () => {
  assert.deepEqual(resolveImageSource("assets/a.png", article), {
    type: "local",
    value: path.resolve("docs/article/2026/assets/a.png"),
  });
});
