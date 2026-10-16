// Shared loader and builder for the RSS routes under pages/api/rss/.
//
// Posts live in content/blog/<category>/ (there is nothing at the top level of
// content/blog/), and their pages are served at /blog/<category>/<slug>. The
// category key doubles as the folder name. Each route picks its categories here
// instead of walking the tree itself, so the three feeds cannot drift apart again.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Feed } from 'feed';
import { site } from '../data/site';

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://paul-blake.com').replace(/\/+$/, '');

export const CATEGORIES = {
  technology: { urlPrefix: '/blog/technology', label: 'Technology' },
  theology: { urlPrefix: '/blog/theology', label: 'Theology' },
};

// A readable one-paragraph summary from MDX when the front matter has no
// description or excerpt. Strips imports, code, JSX and markdown markers.
export function plainExcerpt(content, max = 300) {
  const text = content
    .replace(/^(import|export)\s[^\n]*$/gm, '')
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^\s*[-*+]\s+/gm, '')
    .replace(/[*_`>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(' '), 0)) || cut}...`;
}

export function loadPosts(categoryKey) {
  const category = CATEGORIES[categoryKey];
  // Literal prefix on purpose: Turbopack traces fs access with a fully dynamic
  // path by bundling the whole project into the standalone output.
  const dir = path.join(process.cwd(), 'content/blog', categoryKey);
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((name) => name.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const { data, content } = matter(fs.readFileSync(path.join(dir, filename), 'utf8'));
      return {
        slug,
        title: data.title || slug,
        date: new Date(data.date),
        author: data.author || site.name,
        description: data.description || data.excerpt || plainExcerpt(content),
        category: category.label,
        categoryUrl: `${SITE_URL}${category.urlPrefix}`,
        url: `${SITE_URL}${category.urlPrefix}/${slug}`,
      };
    })
    .filter((post) => !Number.isNaN(post.date.getTime()));
}

export function buildFeed({ title, description, pagePath, feedPath, posts, limit = 20 }) {
  const sorted = [...posts].sort((a, b) => b.date - a.date).slice(0, limit);

  const feed = new Feed({
    title,
    description,
    id: `${SITE_URL}${pagePath}`,
    link: `${SITE_URL}${pagePath}`,
    language: 'en',
    image: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}, ${site.name}`,
    updated: sorted[0] ? sorted[0].date : new Date(),
    feedLinks: { rss2: `${SITE_URL}${feedPath}` },
    author: { name: site.name, email: site.email, link: SITE_URL },
  });

  sorted.forEach((post) => {
    feed.addItem({
      title: post.title,
      id: post.url,
      link: post.url,
      description: post.description,
      author: [{ name: post.author, email: site.email, link: SITE_URL }],
      date: post.date,
      category: [{ name: post.category, domain: post.categoryUrl }],
    });
  });

  return feed.rss2();
}

// Common handler shape: GET only, cached for a day at the edge, 500 on error.
export function rssHandler(build) {
  return function handler(req, res) {
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }
    try {
      res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
      res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
      res.status(200).send(build());
    } catch (error) {
      console.error('Error generating RSS feed:', error);
      res.status(500).json({ error: 'Failed to generate RSS feed' });
    }
  };
}
