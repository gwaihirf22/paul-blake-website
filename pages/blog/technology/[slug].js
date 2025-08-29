import Head from "next/head";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import { Callout } from "../../../components/Callout";
import { CodeBlock } from "../../../components/CodeBlock";
import { Image } from "../../../components/Image";
import { YouTube } from "../../../components/YouTube";
import Comments from "../../../components/Comments";
import ReadingProgress from "../../../components/ReadingProgress";

const components = {
  Callout,
  CodeBlock,
  Image,
  YouTube,
  Comments,
};

export default function TechnologyPost({ frontMatter, mdxSource, slug }) {
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
        <title>{frontMatter.title} - Paul Blake</title>
        <meta name="description" content={frontMatter.description || frontMatter.title} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph */}
        <meta property="og:title" content={frontMatter.title} />
        <meta property="og:description" content={frontMatter.description || frontMatter.title} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://paulblake.dev/blog/technology/${slug}`} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={frontMatter.title} />
        <meta name="twitter:description" content={frontMatter.description || frontMatter.title} />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              headline: frontMatter.title,
              description: frontMatter.description || frontMatter.title,
              author: {
                "@type": "Person",
                name: "Paul Blake"
              },
              datePublished: frontMatter.date,
              url: `https://paulblake.dev/blog/technology/${slug}`
            })
          }}
        />
      </Head>
      
      <ReadingProgress />
      
      <article>
        <header>
          <h1>{frontMatter.title}</h1>
          <p suppressHydrationWarning>
            Published on {formatDate(frontMatter.date)} in <Link href="/blog/technology">Technology</Link>
          </p>
        </header>
        
        <MDXRemote {...mdxSource} components={components} />
        
        <div className="blog-nav">
          <p>
            <Link href="/blog/technology">← Back to Technology</Link> | 
            <Link href="/blog"> All Posts</Link> | 
            <Link href="/"> Home</Link>
          </p>
        </div>
        
        <Comments />
      </article>
      
      <style jsx>{`
        article {
          margin-bottom: 3rem;
        }
        
        header {
          margin-bottom: 2rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--color-border);
        }
        
        header h1 {
          color: var(--color-text-primary);
          margin: 0 0 1rem 0;
          font-weight: 700;
          font-size: 2.5rem;
          line-height: 1.2;
        }
        
        header p {
          color: var(--color-text-secondary);
          font-style: italic;
          margin: 0;
          font-size: 1rem;
        }
        
        header p a {
          color: var(--color-accent);
          text-decoration: none;
        }
        
        header p a:hover {
          text-decoration: underline;
        }
        
        .blog-nav {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
        }
        
        .blog-nav p {
          color: var(--color-text-secondary);
          margin: 0;
        }
        
        .blog-nav a {
          color: var(--color-accent);
          text-decoration: none;
          margin-right: 0.5rem;
        }
        
        .blog-nav a:hover {
          text-decoration: underline;
        }
        
        @media (max-width: 768px) {
          header h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}

export async function getStaticPaths() {
  const technologyDir = path.join(process.cwd(), 'content/blog/technology');
  const filenames = fs.readdirSync(technologyDir);
  
  const paths = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace(/\.mdx$/, '')
      }
    }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const fullPath = path.join(process.cwd(), 'content/blog/technology', `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { data: frontMatter, content } = matter(fileContents);
  
  const mdxSource = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: 'wrap',
          properties: {
            className: ['anchor']
          }
        }],
        [rehypePrism, { ignoreMissing: true }]
      ]
    }
  });

  return {
    props: {
      frontMatter,
      mdxSource,
      slug
    }
  };
}
