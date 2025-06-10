import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export default function BlogIndex({ posts }) {
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
        <meta name="description" content="Read my latest blog posts about development, technology, and more." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Blog</h1>
        <div className="dark-profile-section">
          <p>Welcome to my blog! Here you'll find my thoughts on development, technology, and whatever else I find interesting.</p>
        </div>
        
        <p>
          <strong>Categories:</strong> <Link href="/blog/theology">Theology</Link>
        </p>
        
        <div className="posts-grid">
          {posts.map((post) => (
            <div key={post.slug} className="dark-card">
              <h3>
                <Link href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h3>
              <p className="post-date" suppressHydrationWarning>
                Published: {formatDate(post.date)}
              </p>
            </div>
          ))}
        </div>
        
        <p>
          <Link href="/">← Back to home</Link>
        </p>
      </div>
      
      <style jsx>{`
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
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(blogDir);
  
  const posts = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDir, filename);
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
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date descending
  
  return {
    props: {
      posts,
    },
  };
} 