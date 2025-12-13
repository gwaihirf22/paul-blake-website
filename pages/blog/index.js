import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SubscriptionForm from "../../components/SubscriptionForm";
import BlogPostCard from "../../components/BlogPostCard";

export default function BlogIndex({ technologyPosts, theologyPosts, allPosts }) {
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
        <title>Blog - Paul Blake</title>
        <meta name="description" content="Read my latest blog posts about technology, theology, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="alternate" type="application/rss+xml" title="Paul Blake - Blog Posts" href="/api/rss/blog.xml" />
        <link rel="alternate" type="application/rss+xml" title="Paul Blake - All Posts" href="/api/rss/all.xml" />
      </Head>
      <div>
        <h1>Blog</h1>

        {/* Pinned Welcome Post */}
        <div className="pinned-post">
          <div className="pinned-badge">📌 Pinned</div>
          <h2>Welcome to My Blog</h2>
          <p>Here you'll find my thoughts on technology, theology, and the intersection of faith and innovation. This blog is a space where I explore how modern development practices intersect with timeless truths, share technical insights, and reflect on matters of faith.</p>
          <p>Browse by category below, subscribe to stay updated, or dive into the recent posts. Thanks for stopping by!</p>
        </div>

        <div className="blog-navigation">
          <p>
            <strong>Categories:</strong> 
            <Link href="/blog/technology">Technology & Development</Link> • 
            <Link href="/blog/theology">Theology & Faith</Link>
          </p>
          <p>
            <strong>Subscribe:</strong> 
            <a href="/api/rss/blog.xml" target="_blank" rel="noopener noreferrer">Tech RSS</a> • 
            <a href="/api/rss/theology.xml" target="_blank" rel="noopener noreferrer">Theology RSS</a> • 
            <a href="/api/rss/all.xml" target="_blank" rel="noopener noreferrer">All RSS</a>
          </p>
        </div>

        {/* Technology Section */}
        <section className="category-section">
          <div className="category-header">
            <h2>Technology & Development</h2>
            <Link href="/blog/technology" className="view-all-link">View All →</Link>
          </div>
          <div className="posts-grid">
            {technologyPosts.slice(0, 3).map((post) => (
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
        </section>

        {/* Theology Section */}
        <section className="category-section">
          <div className="category-header">
            <h2>Theology & Faith</h2>
            <Link href="/blog/theology" className="view-all-link">View All →</Link>
          </div>
          <div className="posts-grid">
            {theologyPosts.slice(0, 3).map((post) => (
              <BlogPostCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                category="theology"
                thumbnail={post.thumbnail}
                basePath="/blog/theology"
              />
            ))}
          </div>
        </section>

        {/* Recent Posts Section */}
        <section className="category-section">
          <div className="category-header">
            <h2>Recent Posts</h2>
          </div>
          <div className="posts-grid">
            {allPosts.slice(0, 6).map((post) => (
              <BlogPostCard
                key={`${post.category}-${post.slug}`}
                slug={post.slug}
                title={post.title}
                date={formatDate(post.date)}
                category={post.category}
                thumbnail={post.thumbnail}
                basePath={`/blog/${post.category}`}
              />
            ))}
          </div>
        </section>
        
        <SubscriptionForm categories={['blog']} />
        
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </div>
      
      <style jsx>{`
        .pinned-post {
          position: relative;
          margin: 2rem 0;
          padding: 2rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(0, 188, 212, 0.02) 100%);
          border: 2px solid var(--color-accent);
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 188, 212, 0.1);
        }

        .pinned-badge {
          display: inline-block;
          padding: 0.4rem 1rem;
          background: var(--color-accent);
          color: var(--color-background);
          font-size: 0.85rem;
          font-weight: 600;
          border-radius: 20px;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .pinned-post h2 {
          color: var(--color-accent);
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
        }

        .pinned-post p {
          color: var(--color-text-primary);
          line-height: 1.7;
          margin: 0.75rem 0;
          font-size: 1.05rem;
        }

        .pinned-post p:last-child {
          margin-bottom: 0;
        }

        @media (max-width: 768px) {
          .pinned-post {
            padding: 1.5rem;
          }

          .pinned-post h2 {
            font-size: 1.5rem;
          }

          .pinned-post p {
            font-size: 1rem;
          }
        }

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

        .category-section {
          margin: 3rem 0;
        }

        .category-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid var(--color-border);
        }

        .category-header h2 {
          color: var(--card-text-primary);
          margin: 0;
          font-size: 1.8rem;
          font-weight: 600;
        }

        .view-all-link {
          color: var(--color-accent);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          transition: color 0.2s ease;
        }

        .view-all-link:hover {
          color: var(--color-hover);
          text-decoration: underline;
        }

        .posts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 1.5rem 0;
        }

        .category-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 0.75rem;
        }

        .category-badge.technology {
          background-color: rgba(59, 130, 246, 0.15);
          color: #60a5fa;
          border: 1px solid rgba(59, 130, 246, 0.3);
        }

        .category-badge.theology {
          background-color: rgba(147, 51, 234, 0.15);
          color: #a78bfa;
          border: 1px solid rgba(147, 51, 234, 0.3);
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

        @media (max-width: 768px) {
          .posts-grid {
            grid-template-columns: 1fr;
          }
          
          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticProps() {
  // Read technology posts
  const technologyDir = path.join(process.cwd(), 'content/blog/technology');
  const technologyFilenames = fs.readdirSync(technologyDir);
  
  const technologyPosts = technologyFilenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(technologyDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.getFullYear() + '-' + 
        String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + 
        String(dateObj.getDate()).padStart(2, '0');
      
      return {
        slug,
        title: data.title,
        date: formattedDate,
        category: 'technology',
        thumbnail: data.thumbnail || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Read theology posts
  const theologyDir = path.join(process.cwd(), 'content/blog/theology');
  const theologyFilenames = fs.readdirSync(theologyDir);
  
  const theologyPosts = theologyFilenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(theologyDir, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data } = matter(fileContents);
      
      const dateObj = new Date(data.date);
      const formattedDate = dateObj.getFullYear() + '-' + 
        String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + 
        String(dateObj.getDate()).padStart(2, '0');
      
      return {
        slug,
        title: data.title,
        date: formattedDate,
        category: 'theology',
        thumbnail: data.thumbnail || null,
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Combine all posts for recent section
  const allPosts = [...technologyPosts, ...theologyPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  
  return {
    props: {
      technologyPosts,
      theologyPosts,
      allPosts,
    },
  };
} 