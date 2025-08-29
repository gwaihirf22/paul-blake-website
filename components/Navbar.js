import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlogMobileOpen, setIsBlogMobileOpen] = useState(false);

  const isActive = (pathname) => {
    return router.pathname === pathname;
  };

  // Close the mobile menu on route change for a polished UX
  useEffect(() => {
    setIsMenuOpen(false);
    setIsBlogMobileOpen(false);
  }, [router.pathname]);

  const handleBlogClick = (e) => {
    // Toggle dropdown on mobile; on desktop let hover handle it
    const menuToggle = document.querySelector('.menu-toggle');
    const isMobileView = menuToggle && getComputedStyle(menuToggle).display !== 'none';
    if (isMobileView) {
      e.preventDefault();
      e.stopPropagation();
      setIsBlogMobileOpen((prev) => !prev);
    }
  };


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
          <div className="nav-dropdown">
            <Link
              href="/blog"
              className={`nav-link nav-link-with-dropdown ${isActive('/blog') || router.pathname.startsWith('/blog/') ? 'active' : ''} ${isBlogMobileOpen ? 'mobile-open' : ''}`}
              aria-current={isActive('/blog') || router.pathname.startsWith('/blog/') ? 'page' : undefined}
              aria-haspopup="true"
              aria-expanded={isBlogMobileOpen}
              onClick={handleBlogClick}
            >
              Blog
              <span className="dropdown-arrow" aria-hidden="true">▼</span>
            </Link>
            <div className={`dropdown-menu ${isBlogMobileOpen ? 'mobile-open' : ''}`} style={{ display: isBlogMobileOpen ? 'block' : undefined, opacity: isBlogMobileOpen ? 1 : undefined, visibility: isBlogMobileOpen ? 'visible' : undefined, height: isBlogMobileOpen ? 'auto' : undefined, overflow: isBlogMobileOpen ? 'visible' : undefined }}>
              <Link href="/blog" className="dropdown-item primary">
                <div className="dropdown-item-content">
                  <span className="dropdown-item-title">All Blog Posts</span>
                  <span className="dropdown-item-description">View all articles and insights</span>
                </div>
              </Link>
              <hr className="dropdown-divider" style={{ display: isBlogMobileOpen ? 'block' : undefined }} />
              <Link href="/blog/technology" className="dropdown-item">
                <div className="dropdown-item-content">
                  <span className="dropdown-item-title">Technology & Development</span>
                  <span className="dropdown-item-description">Programming, tools, and tech insights</span>
                </div>
              </Link>
              <Link href="/blog/theology" className="dropdown-item">
                <div className="dropdown-item-content">
                  <span className="dropdown-item-title">Theology & Faith</span>
                  <span className="dropdown-item-description">Faith, theology, and spiritual reflection</span>
                </div>
              </Link>
            </div>
          </div>
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
          transition: all 0.2s ease;
          display: flex !important;
          align-items: center !important;
          gap: 0.75rem;
          padding: 0.5rem;
          border-radius: 8px;
          outline: none;
          position: relative;
        }

        .brand-link:focus-visible {
          background-color: rgba(0, 188, 212, 0.1);
          box-shadow: 0 0 0 2px var(--color-accent);
          transform: none;
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

        .nav-dropdown {
          position: relative;
          display: inline-block;
        }

        /* Create a hover bridge to prevent dropdown from closing */
        .nav-dropdown::after {
          content: '';
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          height: 0.25rem;
          background: transparent;
          z-index: 1000;
        }





        /* Ensure the dropdown stays visible when hovering over the invisible bridge */
        .nav-dropdown:hover::after {
          display: block;
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
          display: inline-block;
          outline: none;
        }



        /* General nav-link styles - base styles that apply to ALL nav links including blog */
        .nav-link:focus-visible {
          background-color: rgba(0, 188, 212, 0.15);
          color: var(--color-accent);
          transform: translateY(-1px);
          box-shadow: 0 0 0 2px var(--color-accent), 0 4px 12px rgba(0, 188, 212, 0.2);
        }

        .nav-link:hover {
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.1);
          transform: translateY(-1px);
        }

        /* Professional Blog Dropdown - Amazon-inspired design */
        .nav-link-with-dropdown {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          position: relative;
        }
        
        .dropdown-arrow {
          font-size: 0.7rem;
          transition: transform 0.2s ease;
          display: inline-block;
          opacity: 0.8;
        }

        .nav-dropdown:hover .dropdown-arrow {
          transform: rotate(180deg);
          opacity: 1;
        }

        /* Professional Dropdown Menu */
        .dropdown-menu {
          position: absolute;
          top: calc(100% + 0.5rem);
          left: 0;
          right: 1rem;
          background: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.4);
          min-width: 340px;
          max-width: 420px;
          padding: 0.75rem 0;
          overflow: hidden; /* ensure inner item corners clip nicely */
          box-sizing: border-box;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-10px);
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 1000;
          backdrop-filter: blur(10px);
        }

        .nav-dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        /* Dropdown Items */
        .dropdown-item {
          display: block;
          padding: 1.25rem 3rem; /* visibly larger left padding */
          text-decoration: none;
          color: var(--color-text-secondary);
          transition: all 0.15s ease;
          border-radius: 8px;
          margin: 0 1rem; /* keep items inset so full menu has rounded corners visually */
        }

        .dropdown-item:hover {
          background-color: rgba(0, 188, 212, 0.08);
          color: var(--color-text-primary);
          transform: none; /* Prevent nav-link hover transform */
        }

        .dropdown-item.primary {
          background-color: rgba(0, 188, 212, 0.05);
          border-left: 3px solid var(--color-accent);
        }

        .dropdown-item.primary:hover {
          background-color: rgba(0, 188, 212, 0.12);
        }

        .dropdown-item-content {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .dropdown-item-title {
          font-weight: 600;
          font-size: 0.95rem;
          color: inherit;
          line-height: 1.3;
        }

        .dropdown-item-description {
          font-size: 0.8rem;
          opacity: 0.7;
          line-height: 1.4;
        }

        .dropdown-item:hover .dropdown-item-description {
          opacity: 0.9;
        }

        .dropdown-divider {
          margin: 0.75rem 1rem;
          border: none;
          height: 1px;
          background: rgba(255, 255, 255, 0.15);
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
          outline: none;
          transition: all 0.2s ease;
        }

        .menu-toggle:focus-visible {
          border-color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.1);
          box-shadow: 0 0 0 2px var(--color-accent);
          color: var(--color-accent);
        }

        .menu-toggle:hover {
          border-color: var(--color-accent);
          color: var(--color-accent);
          background-color: rgba(0, 188, 212, 0.05);
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
            align-items: center; /* center top-level links */
            gap: 0.25rem; /* tighter vertical spacing */
            background: var(--color-background);
            border-bottom: 1px solid var(--color-border);
          }
          .navbar-links.open .nav-link {
            padding: 0.6rem 0.75rem; /* less vertical padding */
            border-radius: 0;
            text-align: center; /* ensure text centered */
          }

          /* Mobile Dropdown Adjustments */
          @media (max-width: 768px) {
            /* Disable hover-open on mobile */
            .nav-dropdown:hover .dropdown-menu {
              opacity: 0;
              visibility: hidden;
              transform: none;
            }

            /* Center Blog trigger and keep top-level links tight */
            .navbar-links.open { align-items: center; gap: 0.25rem; }
            .navbar-links.open .nav-link { padding: 0.6rem 0.75rem; text-align: center; }
            .navbar-links.open .nav-dropdown { align-self: center; text-align: center; width: 100%; }
            .navbar-links.open .nav-link-with-dropdown { margin: 0 auto; }
            .nav-link-with-dropdown.mobile-open .dropdown-arrow { transform: rotate(180deg); }

            /* Submenu: container-based show/hide */
            .dropdown-menu {
              position: static;
              display: none;
              height: 0;
              overflow: hidden;
              opacity: 0;
              visibility: hidden;
              transform: none;
              min-width: auto;
              width: 100%;
              background: transparent;
              border: none;
              border-radius: 0;
              box-shadow: none;
              padding: 1rem; /* Better edge spacing for touch */
              backdrop-filter: none;
              margin-top: 0;
            }

            .nav-link-with-dropdown.mobile-open + .dropdown-menu {
              display: block;
              height: auto;
              overflow: visible;
              opacity: 1;
              visibility: visible;
            }

            .dropdown-item {
              padding: 1rem 1.5rem; /* Larger touch targets (44px+) */
              margin: 0.5rem 0; /* Better spacing between items */
              border: 0;
              background: transparent;
              border-radius: 8px; /* Modern touch feel */
              transition: all 0.2s ease; /* Smooth interactions */
              font-size: 1rem; /* Better readability */
              display: block;
              text-decoration: none;
              color: var(--color-text-primary);
            }

            .dropdown-item:hover {
              background: rgba(0, 188, 212, 0.05); /* Subtle hover feedback */
            }

            .dropdown-item:active {
              background: rgba(0, 188, 212, 0.1); /* Touch feedback */
              transform: scale(0.98); /* Subtle press effect */
            }

            .dropdown-item-content { 
              align-items: center; 
              text-align: center;
            }
            .dropdown-item-title, .dropdown-item-description { 
              text-align: center; 
            }
            .dropdown-item-description { 
              display: none; 
            }

            .dropdown-divider { 
              display: none; 
              margin: 0.75rem 0; /* Better divider spacing */
            }
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