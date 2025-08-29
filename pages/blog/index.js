import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import SubscriptionForm from "../../components/SubscriptionForm";

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
        <link rel="icon" href="/favicon.ico" />
        <link rel="alternate" type="application/rss+xml" title="Paul Blake - Blog Posts" href="/api/rss/blog.xml" />
        <link rel="alternate" type="application/rss+xml" title="Paul Blake - All Posts" href="/api/rss/all.xml" />
      </Head>
      <div>
        <h1>Blog</h1>
        <div className="dark-profile-section">
          <p>Welcome to my blog! Here you'll find my thoughts on technology, theology, and the intersection of faith and innovation. Browse by category below or view all posts.</p>
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
              <div key={post.slug} className="dark-card">
                <div className="category-badge technology">Technology & Development</div>
                <h3>
                  <Link href={`/blog/technology/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="post-date" suppressHydrationWarning>
                  Published: {formatDate(post.date)}
                </p>
              </div>
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
              <div key={post.slug} className="dark-card">
                <div className="category-badge theology">Theology & Faith</div>
                <h3>
                  <Link href={`/blog/theology/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="post-date" suppressHydrationWarning>
                  Published: {formatDate(post.date)}
                </p>
              </div>
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
              <div key={`${post.category}-${post.slug}`} className="dark-card">
                <div className={`category-badge ${post.category}`}>{post.category === 'technology' ? 'Technology & Development' : 'Theology & Faith'}</div>
                <h3>
                  <Link href={`/blog/${post.category}/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
                <p className="post-date" suppressHydrationWarning>
                  Published: {formatDate(post.date)}
                </p>
              </div>
            ))}
          </div>
        </section>
        
        <SubscriptionForm categories={['blog']} />
        
        <p>
          <Link href="/">← Back to home</Link>
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