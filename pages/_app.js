import "../styles/globals.css";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }) {
  return (
    <>
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
