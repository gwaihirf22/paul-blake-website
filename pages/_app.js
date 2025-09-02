import "../styles/globals.css";
import Head from "next/head";
import Navbar from "../components/Navbar";
import ScrollbarVisibility from "../components/ScrollbarVisibility";

export default function App({ Component, pageProps }) {
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
