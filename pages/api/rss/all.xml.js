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
      title: 'Paul Blake - All Blog Posts',
      description: 'All blog posts including technology, development, theology, and more',
      id: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog`,
      link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog`,
      language: 'en',
      image: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/favicon.ico`,
      favicon: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/favicon.ico`,
      copyright: `All rights reserved ${new Date().getFullYear()}, Paul Blake`,
      updated: new Date(),
      feedLinks: {
        rss2: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/api/rss/all.xml`,
      },
      author: {
        name: 'Paul Blake',
        email: 'paul@paulblake.dev',
        link: process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev',
      },
    });

    // Get all posts from both directories
    const allPosts = [];

    // Get main blog posts
    const blogDir = path.join(process.cwd(), 'content/blog');
    const blogFilenames = fs.readdirSync(blogDir);
    
    blogFilenames
      .filter(name => name.endsWith('.mdx'))
      .forEach(filename => {
        const slug = filename.replace(/\.mdx$/, '');
        const fullPath = path.join(blogDir, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);
        
        allPosts.push({
          slug,
          title: data.title,
          date: new Date(data.date),
          author: data.author || 'Paul Blake',
          content: content.substring(0, 500) + '...',
          category: 'Technology',
          url: `/blog/${slug}`,
        });
      });

    // Get theology posts
    const theologyDir = path.join(process.cwd(), 'content/blog/theology');
    if (fs.existsSync(theologyDir)) {
      const theologyFilenames = fs.readdirSync(theologyDir);
      
      theologyFilenames
        .filter(name => name.endsWith('.mdx'))
        .forEach(filename => {
          const slug = filename.replace(/\.mdx$/, '');
          const fullPath = path.join(theologyDir, filename);
          const fileContents = fs.readFileSync(fullPath, 'utf8');
          const { data, content } = matter(fileContents);
          
          allPosts.push({
            slug,
            title: data.title,
            date: new Date(data.date),
            author: data.author || 'Paul Blake',
            content: content.substring(0, 500) + '...',
            category: 'Theology',
            url: `/blog/theology/${slug}`,
          });
        });
    }

    // Sort all posts by date descending and limit to 30 most recent
    const sortedPosts = allPosts
      .sort((a, b) => b.date - a.date)
      .slice(0, 30);

    // Add posts to feed
    sortedPosts.forEach(post => {
      feed.addItem({
        title: post.title,
        id: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}${post.url}`,
        link: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}${post.url}`,
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
            name: post.category,
            domain: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://paulblake.dev'}/blog${post.category === 'Theology' ? '/theology' : ''}`,
          },
        ],
      });
    });

    res.setHeader('Content-Type', 'application/rss+xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.status(200).send(feed.rss2());
  } catch (error) {
    console.error('Error generating combined RSS feed:', error);
    res.status(500).json({ error: 'Failed to generate RSS feed' });
  }
}