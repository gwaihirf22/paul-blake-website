import Head from "next/head";
import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { bundleMDX } from "mdx-bundler";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import rehypePrism from "rehype-prism-plus";
import ReadingProgress from "../../../components/ReadingProgress";
import Comments from "../../../components/Comments";
import SubscriptionForm from "../../../components/SubscriptionForm";

export default function TheologyPost({ post, showProgress }) {
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
        <meta name="description" content={`Theology blog post: ${post.frontmatter.title}`} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {showProgress && <ReadingProgress />}
      
      <div>
        <article>
          <header>
            <h1>{post.frontmatter.title}</h1>
            <p suppressHydrationWarning>
              Published on {formatDate(post.frontmatter.date)}
              {post.frontmatter.author && ` by ${post.frontmatter.author}`}
            </p>
          </header>
          
          <div>
            <Component />
          </div>
        </article>
        
        <Comments />
        
        <SubscriptionForm categories={['theology']} compact={true} />
        
        <nav>
          <p>
            <Link href="/blog/theology">← Back to theology blog</Link> | <Link href="/blog">← Back to main blog</Link>
          </p>
        </nav>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const theologyDir = path.join(process.cwd(), 'content/blog/theology');
  const filenames = fs.readdirSync(theologyDir);
  
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
  const fullPath = path.join(process.cwd(), 'content/blog/theology', `${params.slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  
  // Calculate reading time
  const wordsPerMinute = 200;
  const wordCount = fileContents.split(/\s+/).length;
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
  
  const { code, frontmatter } = await bundleMDX({
    source: fileContents,
    cwd: path.join(process.cwd(), 'content/blog/theology'),
    mdxOptions: (options) => {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])];
      options.rehypePlugins = [...(options.rehypePlugins ?? []), rehypePrism];
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
          readingTime: readingTimeMinutes,
        },
      },
      showProgress: readingTimeMinutes > 2, // Show progress bar for posts > 2 minutes
    },
  };
} 