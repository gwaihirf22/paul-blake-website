import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

export default function BlogPost({ post }) {
  const Component = useMemo(() => getMDXComponent(post.code), [post.code]);
  
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
        <title>{`${post.frontmatter.title} - Paul Blake`}</title>
        <meta name="description" content={`Blog post: ${post.frontmatter.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p suppressHydrationWarning>
              Published on {formatDate(post.frontmatter.date)}
            </p>
          </header>
          
          <div>
            <Component />
          </div>
        </article>
        
        <nav>
          <p>
            <Link href="/blog">← Back to blog</Link>
          </p>
        </nav>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  const filenames = fs.readdirSync(blogDir);
  
  const paths = filenames
    .filter(name => name.endsWith('.mdx'))
    .map(filename => ({
      params: {
        slug: filename.replace(/\.mdx$/, ''),
      },
    }));
  
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const fullPath = path.join(process.cwd(), 'content/blog', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    cwd: path.join(process.cwd(), 'content/blog'),
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? [])];
      return options;
    },
  });
  
  // Ensure date is consistently formatted as YYYY-MM-DD string
  const dateObj = new Date(frontmatter.date);
  const formattedDate = dateObj.getFullYear() + '-' + 
    String(dateObj.getMonth() + 1).padStart(2, '0') + '-' + 
    String(dateObj.getDate()).padStart(2, '0');
  
  return {
    props: {
      post: {
        code,
        frontmatter: {
          ...frontmatter,
          date: formattedDate,
        },
      },
    },
  };
} 