import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SubscriptionForm from "../../../components/SubscriptionForm";
import BlogPostCard from "../../../components/BlogPostCard";

export default function TechnologyIndex({ posts }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }).format(date);
  };

  return (
    <>
      <Head>
        <title>Technology & Development - Paul Blake</title>
        <meta name="description" content="Read my technology and development blog posts about software engineering, AI, DevOps, and cloud infrastructure." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="alternate" type="application/rss+xml" title="Paul Blake - Technology Posts" href="/api/rss/blog.xml" />
        <link rel="alternate" type="application/rss+xml" title="Paul Blake - All Posts" href="/api/rss/all.xml" />
      </Head>
      <div>
        <h1>Technology & Development</h1>
        <div className="dark-profile-section">
          <p>Welcome to my technology and development blog! Here you'll find posts about software engineering, AI, DevOps, cloud infrastructure, and my latest technical projects. I share practical insights, lessons learned, and deep dives into the technologies I work with.</p>
        </div>
        
        <div className="blog-navigation">
          <p>
            <strong>Navigation:</strong> <Link href="/blog">All Posts</Link> • <Link href="/blog/theology">Theology & Faith</Link>
          </p>
          <p>
            <strong>Subscribe:</strong> 
            <a href="/api/rss/blog.xml" target="_blank" rel="noopener noreferrer">Tech RSS</a> • 
            <a href="/api/rss/all.xml" target="_blank" rel="noopener noreferrer">All RSS</a>
          </p>
        </div>
        
        <div className="posts-grid">
          {posts.map((post) => (
            <BlogPostCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={formatDate(post.date)}
              category="technology"
              thumbnail={post.thumbnail}
              basePath="/blog/technology"
            />
          ))}
        </div>
        
        <SubscriptionForm categories={['blog']} />
        
        <p>
          <Link href="/blog">← Back to main blog</Link> | <Link href="/">← Back to home</Link>
        </p>
      </div>
      
      <style jsx>{`
        .blog-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 1.5rem 0;
          padding: 1rem;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 8px;
        }

        .blog-navigation p {
          margin: 0;
        }

        .blog-navigation a {
          color: var(--card-link-color);
          text-decoration: none;
          font-size: 0.9rem;
        }

        .blog-navigation a:hover {
          color: var(--card-link-hover);
          text-decoration: underline;
        }

        @media (max-width: 640px) {
          .blog-navigation {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }
        }

        .posts-grid {
          margin: 2rem 0;
        }
        
        .post-date {
          font-size: 0.9rem;
          font-style: italic;
          margin: 0.5rem 0 0 0;
        }
        
        h1 {
          color: var(--card-text-primary);
          margin: 2rem 0 1rem 0;
          font-weight: 600;
        }
        
        p {
          color: var(--card-text-secondary);
          line-height: 1.6;
        }
        
        p a {
          color: var(--card-link-color);
          text-decoration: none;
        }
        
        p a:hover {
          color: var(--card-link-hover);
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  const technologyDir = path.join(process.cwd(), 'content/blog/technology');
  const filenames = fs.readdirSync(technologyDir);
  
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(technologyDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      // Ensure date is consistently formatted as YYYY-MM-DD string
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.getFullYear() + '-' + 
        String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + 
        String(dateObj.getDate()).padStart(2, '0');
      
      return {
        slug,
        title: data.title,
        date: formattedDate,
        thumbnail: data.thumbnail || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  
  return {
    props: {
      posts,
    },
  };
}
