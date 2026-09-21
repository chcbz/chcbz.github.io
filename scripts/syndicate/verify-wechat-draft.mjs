import { getWechatAccessToken, getWechatDrafts } from './wechat.mjs';

export function validateSavedWechatHtml(html) {
  const errors = [];
  if (!html?.trim()) errors.push('empty body');
  if (/<pre\b/i.test(html)) errors.push('pre tags remain');
  if (/:::|[\u200B-\u200D\uFEFF]/u.test(html)) errors.push('container or zero-width marker remains');
  if (/latex\.codecogs\.com/i.test(html)) errors.push('unuploaded formula');
  for (const match of html.matchAll(/<[a-z][^>]*>/gi)) {
    if ((match[0].match(/\sstyle\s*=/gi) || []).length > 1) errors.push('duplicate style attribute');
  }
  for (const tag of html.match(/<(?:table|td|th|h[1-6]|ul|ol|li|a|code|blockquote|hr)\b[^>]*>/gi) || []) {
    if (!/\sstyle\s*=/i.test(tag)) errors.push('missing inline style');
  }
  for (const [, src] of html.matchAll(/<img\b[^>]*\bsrc=["']([^"']+)["']/gi)) {
    let host = '';
    try { host = new URL(src.replaceAll('&amp;', '&')).hostname; } catch {}
    if (!/^mmbiz\.(?:qpic|qlogo)\.cn$/i.test(host)) errors.push('image is not WeChat-hosted');
  }
  for (const [, href] of html.matchAll(/<a\b[^>]*\bhref=["']([^"']+)["']/gi)) {
    if (!/^(?:https?:|mailto:|tel:)/i.test(href)) errors.push('relative link');
  }
  return [...new Set(errors)];
}

export async function verifyWechatDraft(article, env = process.env, options = {}) {
  const token = options.accessToken || await getWechatAccessToken(env);
  const drafts = await getWechatDrafts(env, token);
  const titles = drafts.flatMap(d => d.titles);
  const frequencies = new Map();
  for (const title of titles) frequencies.set(title, (frequencies.get(title) || 0) + 1);
  const duplicates = [...frequencies].filter(([, count]) => count > 1).map(([title]) => title);
  const matching = drafts.filter(d => d.titles.includes(article.title));
  if (matching.length !== 1 || frequencies.get(article.title) !== 1) {
    throw new Error('目标文章草稿数量不是1，请人工核查；不会自动删除任何草稿');
  }
  if (options.mediaId && matching[0].mediaId !== options.mediaId) throw new Error('草稿ID不一致');
  const response = await fetch(`https://api.weixin.qq.com/cgi-bin/draft/get?access_token=${token}`, {
    method: 'POST', headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ media_id: matching[0].mediaId }), signal: AbortSignal.timeout(30000),
  });
  const data = await response.json();
  if (!response.ok || data.errcode) throw new Error(`草稿回读失败，错误码 ${data.errcode || response.status}`);
  const saved = data.news_item?.find(item => item.title === article.title);
  if (!saved) throw new Error('回读未找到目标文章');
  if (saved.author !== article.author || saved.content_source_url !== article.sourceUrl) throw new Error('作者或阅读原文地址不一致');
  if (!saved.thumb_media_id || !/^https?:\/\/mmbiz\.(?:qpic|qlogo)\.cn\//i.test(saved.thumb_url || '')) {
    throw new Error('封面素材或微信封面地址缺失');
  }
  const errors = validateSavedWechatHtml(saved.content);
  if (errors.length) throw new Error(`草稿已保存但格式验证失败：${errors.join(', ')}`);
  return { draftCount: drafts.length, articleCount: titles.length, uniqueTitles: frequencies.size,
    duplicateTitles: duplicates, savedHtmlVerified: true, authorVerified: true, sourceUrlVerified: true,
    coverVerified: true, bodyCharacters: saved.content.length };
}
