import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getHomePosts } from './home-posts.mjs';

test('homepage index sorts dates, uses Shanghai time, excludes drafts and future/private pages', () => {
  const directory = mkdtempSync(join(tmpdir(), 'blog-home-test-'));
  try {
    mkdirSync(join(directory, '2026'));
    const add = (name, fields) => writeFileSync(join(directory, '2026', name + '.md'), `---\ntitle: ${name}\n${fields}\n---\nPrivate body not included`);
    add('latest', 'date: 2026-11-12 16:00:00\nsummary: 最新文章摘要');
    add('older', 'date: 2026-11-11');
    add('future', 'date: 2026-11-13');
    add('draft', 'date: 2026-11-12\ndraft: true');
    add('private', 'date: 2026-11-12\npassword: secret');
    add('encrypted', 'date: 2026-11-12\nencrypt: true');
    add('directory', 'date: 2026-11-12\narticle: false');
    add('invalid', 'date: not-a-date');
    add('README', 'date: 2026-11-12');
    const posts = getHomePosts(directory, Date.parse('2026-11-12T08:01:00Z'));
    assert.deepEqual(posts.map(p => p.title), ['latest', 'older']);
    assert.equal(posts[0].timestamp, Date.parse('2026-11-12T08:00:00Z'));
    assert.equal(posts[0].summary, '最新文章摘要');
    assert.equal(posts[1].summary, '');
    assert.equal(posts[0].path, '/article/2026/latest.html');
    assert.ok(!JSON.stringify(posts).includes('Private body'));
    for (let i = 0; i < 8; i++) add(`extra-${i}`, 'date: 2026-11-10');
    assert.equal(getHomePosts(directory, Date.parse('2026-11-12T08:01:00Z')).length, 6);
  } finally {
    rmSync(directory, { recursive: true, force: true });
  }
});

test('actual homepage entries point to existing articles and keep the newest project visible', () => {
  const directory = fileURLToPath(new URL('../article/', import.meta.url));
  const posts = getHomePosts(directory, Date.parse('2026-11-12T23:59:59+08:00'));
  assert.equal(posts.length, 6);
  assert.equal(posts[0].path, '/article/2026/202611121600.html');
  for (const post of posts) {
    assert.ok(existsSync(new URL(`../${post.path.slice(1).replace(/\.html$/, '.md')}`, import.meta.url)));
  }
});
