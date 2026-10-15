import Link from "next/link";
import SocialLinks from "./SocialLinks";
import { site } from "../data/site";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <span className="footer-copy">&copy; {new Date().getFullYear()} {site.name}</span>
        <nav className="footer-nav" aria-label="Footer">
          <Link href="/blog">Blog</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About</Link>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages -- API route, not a page */}
          <a href="/api/rss/all.xml">RSS</a>
          <a href={site.dockerHub} target="_blank" rel="noopener noreferrer">Docker Hub</a>
        </nav>
        <SocialLinks size={18} />
      </div>

      <style jsx>{`
        .site-footer {
          border-top: 1px solid var(--color-border);
          margin-top: 4rem;
          padding: 2rem 0;
        }

        .footer-inner {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem 2rem;
        }

        .footer-copy {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .footer-nav {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem 1.25rem;
          font-size: 0.9rem;
        }

        .footer-nav :global(a) {
          color: var(--color-text-secondary);
          text-decoration: none;
          transition: color 0.2s ease;
        }

        .footer-nav :global(a:hover) {
          color: var(--color-text-primary);
        }
      `}</style>
    </footer>
  );
}
