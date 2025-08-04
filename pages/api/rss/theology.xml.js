import { Feed } from 'feed';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const feed = new Feed({
      title: 'Paul Blake - Theology Posts',
      description: 'Latest theology and faith-related blog posts',
      id: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog/theology`,
      link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog/theology`,
      language: 'en',
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/favicon.ico`,
      favicon: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Paul Blake`,
      updated: new Date(),
      feedLinks: {
        rss2: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/api/rss/theology.xml`,
      },
      author: {
        name: 'Paul Blake',
        email: 'paul@paulblake.dev',
        link: process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev',
      },
    });

    // Get all theology posts
    const theologyDir = path.join(process.cwd(), 'content/blog/theology');
    const filenames = fs.readdirSync(theologyDir);
    
    const posts = filenames
      .filter(name => name.endsWith('.mdx'))
      .map(filename => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(theologyDir, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        return {
          slug,
          title: data.title,
          date: new Date(data.date),
          author: data.author || 'Paul Blake',
          content: content.substring(0, 500) + '...', // First 500 chars as description
        };
      })
      .sort((a, b) => b.date - a.date) // Sort by date descending
      .slice(0, 20); // Limit to 20 most recent posts

    // Add posts to feed
    posts.forEach(post => {
      feed.addItem({
        title: post.title,
        id: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog/theology/${post.slug}`,
        link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog/theology/${post.slug}`,
        description: post.content,
        content: post.content,
        author: [
          {
            name: post.author,
            email: 'paul@paulblake.dev',
            link: process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev',
          },
        ],
        date: post.date,
        category: [
          {
            name: 'Theology',
            domain: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog/theology`,
          },
        ],
      });
    });

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).send(feed.rss2());
  } catch (error) {
    console.error('Error generating theology RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}