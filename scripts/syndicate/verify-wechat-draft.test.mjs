import assert from 'node:assert/strict';
import test from 'node:test';
import { validateSavedWechatHtml, verifyWechatDraft } from './verify-wechat-draft.mjs';

test('saved HTML rejects formatting, local images, relative links and token-host lookalikes', () => {
  const errors = validateSavedWechatHtml('<pre>SQL</pre><table><td>x</td></table><a href="/x">x</a><img src="https://mmbiz.qpic.cn.evil.test/a.png"><p style="a" style="b">:::&#8203;</p>');
  for (const expected of ['pre tags remain','missing inline style','relative link','image is not WeChat-hosted','duplicate style attribute','container or zero-width marker remains']) assert.ok(errors.includes(expected));
});

test('saved HTML accepts inline code, hosted image and absolute links', () => {
  assert.deepEqual(validateSavedWechatHtml('<h2 style="margin:1px">SQL</h2><section><code style="white-space:pre-wrap">a<br>b</code></section><img src="https://mmbiz.qpic.cn/a.png"><a href="https://blog.chcbz.net/a" style="color:blue">a</a>'), []);
  assert.ok(validateSavedWechatHtml('').includes('empty body'));
});

test('verify exact saved draft, author, source and counts without writing', async context => {
  const original = globalThis.fetch;
  const requests = [];
  context.after(() => { globalThis.fetch = original; });
  const article = {title:'Guide',author:'Writer',sourceUrl:'https://blog.chcbz.net/guide.html'};
  globalThis.fetch = async (url, options) => {
    requests.push({url,options});
    return new Response(JSON.stringify(String(url).includes('batchget')
      ? {total_count:1,item_count:1,item:[{media_id:'draft',content:{news_item:[{title:'Guide'}]}}]}
      : {news_item:[{title:'Guide',author:'Writer',content_source_url:article.sourceUrl,
          thumb_media_id:'thumb',thumb_url:'https://mmbiz.qpic.cn/cover',content:'<p>Body</p>'}]}),
      {headers:{'content-type':'application/json'}});
  };
  const r=await verifyWechatDraft(article,{}, {accessToken:'test-token',mediaId:'draft'});
  assert.equal(r.draftCount,1); assert.equal(r.uniqueTitles,1);
  assert.deepEqual(r.duplicateTitles,[]); assert.equal(r.savedHtmlVerified,true);
  assert.equal(requests.length,2);
  assert.ok(requests.every(r => !/\/add|\/delete|\/submit/.test(r.url)));
});
