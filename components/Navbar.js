import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };

  // Close the mobile menu on route change for a polished UX
  useEffect(() => {
    setIsMenuOpen(false);
  }, [router.pathname]);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link href="/" className="brand-link" aria-label="Go to homepage">
            <Logo />
            <span className="brand-text">Paul Blake</span>
          </Link>
        </div>

        <button
          type="button"
          className="menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-bars" />
        </button>

        <div className={`navbar-links ${isMenuOpen ? 'open' : ''}`}>
          <Link
            href="/"
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
            aria-current={isActive('/') ? 'page' : undefined}
          >
            Home
          </Link>
          <Link
            href="/blog"
            className={`nav-link ${isActive('/blog') || router.pathname.startsWith('/blog/') ? 'active' : ''}`}
            aria-current={isActive('/blog') || router.pathname.startsWith('/blog/') ? 'page' : undefined}
          >
            Blog
          </Link>
          <Link
            href="/projects"
            className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
            aria-current={isActive('/projects') ? 'page' : undefined}
          >
            Projects
          </Link>
          <Link
            href="/about"
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
            aria-current={isActive('/about') ? 'page' : undefined}
          >
            About
          </Link>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          background-color: var(--color-background);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--color-border);
          z-index: 1000;
          transition: all 0.3s ease;
        }

        .navbar-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center !important;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: center !important;
        }

        .brand-link {
          font-size: 1.5rem;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem;
        }

        .brand-text {
          font-weight: 800 !important;
          font-size: 1.5rem !important;
          color: var(--color-accent) !important;
          line-height: 1 !important;
          display: inline-block !important;
        }

        .brand-link:hover {
          color: var(--color-accent);
          transform: none;
        }

        .brand-link:hover .brand-text {
          color: var(--color-text-primary) !important;
        }

        .brand-link:hover :global(.logo-svg) {
           color: var(--color-accent);
        }

        .navbar-links {
          display: flex;
          gap: 2rem;
          align-items: center !important;
        }

        .nav-link {
          color: var(--color-text-secondary);
          text-decoration: none;
          font-weight: 500;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          transition: all 0.2s ease;
          position: relative;
          line-height: 1 !important;
          display: inline-block !important;
        }

        .nav-link:hover {
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.1);
          transform: none;
        }

        .nav-link.active {
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.15);
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          background-color: var(--color-accent);
          border-radius: 50%;
        }

        /* Menu toggle button */
        .menu-toggle {
          display: none;
          background: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
          padding: 0.4rem 0.6rem;
          border-radius: 6px;
          cursor: pointer;
        }

        .menu-bars {
          display: inline-block;
          width: 22px;
          height: 2px;
          background: currentColor;
          position: relative;
        }
        .menu-bars::before,
        .menu-bars::after {
          content: '';
          position: absolute;
          left: 0;
          width: 22px;
          height: 2px;
          background: currentColor;
        }
        .menu-bars::before { top: -6px; }
        .menu-bars::after { top: 6px; }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0 1rem;
            height: 60px;
          }

          .brand-link {
            font-size: 1.25rem;
            gap: 0.5rem;
          }

          .brand-text {
            font-size: 1.25rem !important;
          }

          /* Hide desktop links and show toggle */
          .navbar-links {
            display: none;
          }
          .menu-toggle {
            display: inline-flex;
            align-items: center;
            justify-content: center;
          }

          /* Override SVG size for compact header */
          .brand-link :global(.logo-svg) {
            width: 36px !important;
            height: 36px !important;
          }

          .nav-link {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }

          /* Mobile dropdown */
          .navbar-links.open {
            position: absolute;
            top: 60px;
            left: 0;
            right: 0;
            display: flex;
            flex-direction: column;
            background: var(--color-background);
            border-bottom: 1px solid var(--color-border);
          }
          .navbar-links.open .nav-link {
            padding: 0.9rem 1rem;
            border-radius: 0;
          }
        }

        @media (max-width: 480px) {
          .nav-link { font-size: 0.95rem; }
          .brand-link { gap: 0.4rem; }
        }

        /* Extremely small devices: keep the header clean */
        @media (max-width: 360px) {
          .brand-text { display: none !important; }
        }
      `}</style>
    </nav>
  );
} 