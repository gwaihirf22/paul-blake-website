import "../styles/globals.css";
import Head from "next/head";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import ScrollbarVisibility from "../components/ScrollbarVisibility";

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Disable browser's automatic scroll restoration
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const handleRouteChangeStart = () => {
      // Temporarily disable smooth scrolling during navigation
      document.documentElement.style.scrollBehavior = "auto";
      document.body.style.scrollBehavior = "auto";
    };

    const handleRouteChangeComplete = () => {
      // Aggressively scroll to top using multiple methods
      // This runs multiple times to catch Next.js's scroll restoration
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Immediate scroll
      scrollToTop();

      // Scroll again after Next.js has a chance to restore scroll
      requestAnimationFrame(() => {
        scrollToTop();
      });

      // One more time after a small delay to catch any deferred scroll restoration
      setTimeout(() => {
        scrollToTop();

        // Re-enable smooth scrolling
        document.documentElement.style.scrollBehavior = "smooth";
        document.body.style.scrollBehavior = "smooth";
      }, 10);
    };

    // Subscribe to route change events
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    // Cleanup
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <>
      <Head>
        {/* Mobile-optimized viewport for gaming */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, viewport-fit=cover" />
      </Head>
      <ScrollbarVisibility />
      <Navbar />
      <div className="main-content">
        <div className="container">
          <Component {...pageProps} />
        </div>
      </div>

      <style jsx>{`
        .main-content {
          padding-top: 70px !important; /* Account for fixed navbar */
          min-height: 100vh;
        }

        .main-content .container {
          padding-top: 2rem !important; /* Additional spacing below navbar */
        }

        @media (max-width: 768px) {
          .main-content {
            padding-top: 60px !important;
          }
        }
      `}</style>
    </>
  );
}
