import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'gray-matter';

// Generate a small, public-only index at build time; never ship article bodies.
export function getHomePosts(directory, now = Date.now()) {
  const posts = [];
  for (const year of readdirSync(directory, { withFileTypes: true })) {
    if (!year.isDirectory() || !/^\d{4}$/.test(year.name)) continue;
    for (const file of readdirSync(join(directory, year.name))) {
      if (!file.endsWith('.md') || file === 'README.md') continue;
      const source = readFileSync(join(directory, year.name, file), 'utf8').replace(/^\uFEFF/, '');
      const { data } = matter(source);
      const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)?.[1] || '';
      if (!data.title || !data.date || data.article === false || data.draft || data.encrypt || data.password) continue;
      // YAML parses bare timestamps as UTC Dates. Preserve the source clock so
      // timezone-less blog dates consistently mean Asia/Shanghai, not runner UTC.
      const sourceDate = frontmatter.match(/^date:\s*["']?([\dT: .+Z-]+?)["']?\s*$/m)?.[1];
      const raw = sourceDate?.trim() || (data.date instanceof Date ? data.date.toISOString() : String(data.date).trim());
      const normalized = /^\d{4}-\d{2}-\d{2}( \d{2}:\d{2}:\d{2})?$/.test(raw)
        ? `${raw.replace(' ', 'T')}${raw.length === 10 ? 'T00:00:00' : ''}+08:00` : raw;
      const timestamp = Date.parse(normalized);
      if (!Number.isFinite(timestamp) || timestamp > now) continue;
      posts.push({
        title: String(data.title),
        summary: typeof data.summary === 'string' ? data.summary : '',
        date: raw.slice(0, 10),
        path: `/article/${year.name}/${file.replace(/\.md$/, '.html')}`,
        timestamp,
      });
    }
  }
  return posts.sort((a, b) => b.timestamp - a.timestamp || a.path.localeCompare(b.path)).slice(0, 6);
}
