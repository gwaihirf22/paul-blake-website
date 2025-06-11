import Link from "next/link";
import { useRouter } from "next/router";
import Logo from "./Logo";

export default function Navbar() {
  const router = useRouter();

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <Link href="/" className="brand-link">
            <Logo />
            <span className="brand-text">Paul Blake</span>
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link 
            href="/" 
            className={`nav-link ${isActive('/') ? 'active' : ''}`}
          >
            Home
          </Link>
          <Link 
            href="/blog" 
            className={`nav-link ${isActive('/blog') || router.pathname.startsWith('/blog/') ? 'active' : ''}`}
          >
            Blog
          </Link>
          <Link 
            href="/projects" 
            className={`nav-link ${isActive('/projects') ? 'active' : ''}`}
          >
            Projects
          </Link>
          <Link 
            href="/about" 
            className={`nav-link ${isActive('/about') ? 'active' : ''}`}
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
          align-items: baseline !important;
          height: 70px;
        }

        .navbar-brand {
          display: flex;
          align-items: baseline !important;
        }

        .brand-link {
          font-size: 1.5rem;
          color: var(--color-text-primary);
          text-decoration: none;
          transition: color 0.2s ease;
          display: flex !important;
          align-items: baseline !important;
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
          align-items: baseline !important;
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

          .navbar-links {
            gap: 1rem;
          }

          .nav-link {
            padding: 0.5rem 0.75rem;
            font-size: 0.9rem;
          }
        }

        @media (max-width: 480px) {
          .navbar-links {
            gap: 0.5rem;
          }

          .nav-link {
            padding: 0.25rem 0.5rem;
            font-size: 0.85rem;
          }

          .brand-link {
            gap: 0.4rem;
          }
        }
      `}</style>
    </nav>
  );
} 