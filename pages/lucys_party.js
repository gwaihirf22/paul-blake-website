import Head from "next/head";
import { useState } from "react";

export default function LucysParty() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    guestName: '',
    guestCount: 1,
    attending: true,
    email: '',
    phone: '',
    bookTitle: '',
    dietaryNeeds: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' or 'error'
  const [statusMessage, setStatusMessage] = useState('');

  const handlePrint = () => {
    window.print();
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  const handleAttendingChange = (value) => {
    setFormData(prev => ({ ...prev, attending: value }));
  };

  const handleSubmitRSVP = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/rsvp-party', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus('success');
        setStatusMessage(data.message || '🕷️ Amazing! Your RSVP has been received! 🕸️');
        // Reset form after 3 seconds
        setTimeout(() => {
          setShowModal(false);
          setFormData({
            guestName: '',
            guestCount: 1,
            attending: true,
            email: '',
            phone: '',
            bookTitle: '',
            dietaryNeeds: '',
            message: ''
          });
          setSubmitStatus(null);
        }, 3000);
      } else {
        setSubmitStatus('error');
        setStatusMessage(data.error || 'Something went wrong. Please try again!');
      }
    } catch (error) {
      setSubmitStatus('error');
      setStatusMessage('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Lucy&apos;s Spider-Verse Birthday Party</title>
        <meta name="description" content="Lucy Blake&apos;s 6th Birthday Party - Ghost Spider Themed Celebration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Force Comic Sans font loading on all platforms */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('data:text/css,*{font-family:"Comic Sans MS","Chalkboard SE","Bradley Hand","Marker Felt",cursive,fantasy!important}');
            body,html,*{font-family:"Comic Sans MS","Chalkboard SE","Bradley Hand","Marker Felt",cursive,fantasy!important}
          `
        }} />
        
        {/* Security through obscurity - prevent search engine indexing */}
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
        <meta name="googlebot" content="noindex, nofollow" />
        <meta name="bingbot" content="noindex, nofollow" />
      </Head>

      {/* Hide navbar and enforce Comic Sans globally for this page */}
      <style jsx global>{`
        .navbar { display: none !important; }
        .main-content { padding-top: 0 !important; }
        
        /* Force Comic Sans globally on this page - override any system fonts */
        body, html, * {
          font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', 'Marker Felt', cursive, fantasy, sans-serif !important;
        }
        
        /* iOS-specific font enforcement */
        @supports (-webkit-touch-callout: none) {
          body, html, * {
            font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', cursive !important;
            font-style: normal !important;
          }
        }
        
        /* Mobile Safari font override prevention */
        @media screen and (-webkit-min-device-pixel-ratio: 2) {
          body, html, *, *::before, *::after {
            font-family: 'Comic Sans MS', 'Chalkboard SE', 'Marker Felt', cursive, fantasy !important;
            -webkit-font-smoothing: antialiased !important;
            text-rendering: optimizeLegibility !important;
          }
        }
      `}</style>

      {/* Hidden image for print only */}
      <img 
        src="/lucy_invatation.png" 
        alt="Lucy Blake's 6th Birthday Party Official Invitation" 
        className="print-only-image"
        style={{ display: 'none' }}
      />
      
      <div className="invitation-container">
        {/* Compact Header */}
        <header className="party-header">
          <div className="comic-burst">AMAZING!</div>
          <h1 className="main-title">🕷️ You&apos;re Invited! 🕸️</h1>
          <h2 className="birthday-title">Lucy Blake&apos;s 6th Birthday Party</h2>
          <div className="theme-subtitle">🕷️ Ghost Spider & Spidey Friends Adventure! 🕷️</div>
          <div className="web-decoration web-top-left"></div>
          <div className="web-decoration web-top-right"></div>
        </header>

        {/* Party Details Cards */}
        <div className="party-details">
          <div className="detail-card">
            <div className="card-icon">🕷️</div>
            <h3>When</h3>
            <p className="detail-text">
              <strong>October 11th, 2025</strong><br />
              4:50 PM - 6:00 PM
            </p>
          </div>

          <div className="detail-card">
            <div className="card-icon">📍</div>
            <h3>Where</h3>
            <p className="detail-text">
              <strong>Shadle Park Library</strong><br />
              Shadle Park Studio Room<br />
              2111 W. Wellesley Ave<br />
              Spokane, WA 99205
            </p>
          </div>

          <div className="detail-card">
            <div className="card-icon">🍕</div>
            <h3>Food</h3>
            <p className="detail-text">
              <strong>Pizza & Cake</strong>
            </p>
          </div>

          <div className="detail-card special-request">
            <div className="card-icon">📚</div>
            <h3>🕷️ Special Spider Mission! 🕷️</h3>
            <div className="special-content">
              <p className="detail-text highlight">
                <strong>🎁 Book Exchange Instead of Gifts! 📚</strong><br />
                Please bring a used book to share.<br />
                <em>Every spider needs a good story to spin!</em> 🕸️
              </p>
            </div>
          </div>
        </div>


        {/* Official Invitation Preview */}
        <div className="invitation-preview">
          <h3>🕷️ Official Invitation 🕸️</h3>
          <div className="preview-container">
            <img 
              src="/lucy_invatation.png" 
              alt="Lucy Blake's 6th Birthday Party Official Invitation" 
              className="official-invitation"
            />
          </div>
        </div>

        {/* RSVP and Print Section */}
        <div className="action-section">
          <div className="comic-burst action">WEB-SLINGING!</div>
          <div className="rsvp-info">
            <h3>🕷️ Web your RSVP! 🕸️</h3>
            <button onClick={() => setShowModal(true)} className="rsvp-btn">
              🕷️ RSVP Now!
            </button>
            <p className="contact-info-small">
              Questions? Call <a href="tel:509-473-0924">509-473-0924</a>
            </p>
          </div>

          <button onClick={handlePrint} className="print-btn">
            🖨️ Print Official Invitation
          </button>
          <div className="web-decoration web-bottom"></div>
        </div>

        {/* RSVP Modal */}
        {showModal && (
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>

              <h2 className="modal-title">🕷️ RSVP for Lucy's Party! 🕸️</h2>

              {submitStatus === 'success' ? (
                <div className="success-message">
                  <div className="success-icon">🎉</div>
                  <p>{statusMessage}</p>
                </div>
              ) : (
                <form onSubmit={handleSubmitRSVP} className="rsvp-form">
                  <div className="form-group">
                    <label htmlFor="guestName">Your Name *</label>
                    <input
                      type="text"
                      id="guestName"
                      name="guestName"
                      value={formData.guestName}
                      onChange={handleInputChange}
                      required
                      placeholder="Parent/Guardian Name"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="guestCount">Number of Guests *</label>
                    <input
                      type="number"
                      id="guestCount"
                      name="guestCount"
                      value={formData.guestCount}
                      onChange={handleInputChange}
                      min="1"
                      max="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Will you attend? *</label>
                    <div className="radio-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="attending"
                          checked={formData.attending === true}
                          onChange={() => handleAttendingChange(true)}
                        />
                        Yes! We'll be there! 🎉
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="attending"
                          checked={formData.attending === false}
                          onChange={() => handleAttendingChange(false)}
                        />
                        Sorry, can't make it 😢
                      </label>
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email (for confirmation)</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(555) 123-4567"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="bookTitle">Book Title (for exchange)</label>
                    <input
                      type="text"
                      id="bookTitle"
                      name="bookTitle"
                      value={formData.bookTitle}
                      onChange={handleInputChange}
                      placeholder="What book are you bringing?"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="dietaryNeeds">Dietary Restrictions</label>
                    <textarea
                      id="dietaryNeeds"
                      name="dietaryNeeds"
                      value={formData.dietaryNeeds}
                      onChange={handleInputChange}
                      placeholder="Any allergies or dietary needs?"
                      rows="2"
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message / Questions</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Anything else we should know?"
                      rows="3"
                    />
                  </div>

                  {submitStatus === 'error' && (
                    <div className="error-message">{statusMessage}</div>
                  )}

                  <button type="submit" className="submit-btn" disabled={submitting}>
                    {submitting ? '🕸️ Sending...' : '🕷️ Submit RSVP'}
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="party-footer">
          <div className="spider-web-small"></div>
          <p>🕷️ Can&apos;t wait to web-swing into this celebration with you! 🕸️</p>
          <p className="signature">- Lucy & Family 🕷️</p>
        </footer>
      </div>

      <style jsx>{`
        .invitation-container {
          min-height: 100vh;
          background:
            linear-gradient(rgba(255, 182, 255, 0.2), rgba(183, 234, 255, 0.3)),
            url('/Spidey.png') center center/contain no-repeat,
            linear-gradient(135deg, #fce7f3 0%, #ddd6fe 25%, #bfdbfe 50%, #e0f2fe 75%, #fce7f3 100%);
          background-attachment: fixed;
          padding: 1rem;
          font-family: 'Comic Sans MS', 'Apple Color Emoji', 'Chalkboard SE', 'Bradley Hand', cursive, fantasy, sans-serif !important;
          position: relative;
          overflow-x: hidden;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        /* Force Comic Sans on all text elements with iOS-specific fixes */
        .invitation-container *,
        .invitation-container *::before,
        .invitation-container *::after {
          font-family: 'Comic Sans MS', 'Apple Color Emoji', 'Chalkboard SE', 'Bradley Hand', cursive, fantasy, sans-serif !important;
          -webkit-font-smoothing: antialiased !important;
          -moz-osx-font-smoothing: grayscale !important;
        }

        /* iOS Safari specific font fixes */
        @supports (-webkit-touch-callout: none) {
          .invitation-container,
          .invitation-container * {
            font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', 'Marker Felt', cursive, fantasy !important;
          }
        }

        /* Additional mobile font enforcement */
        @media screen and (max-width: 768px) {
          .invitation-container,
          .invitation-container *,
          .invitation-container *::before,
          .invitation-container *::after {
            font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', 'Marker Felt', 'Apple Color Emoji', cursive, fantasy, sans-serif !important;
            font-style: normal !important;
            font-weight: inherit !important;
          }
        }

        /* Official Invitation Print Styles */
        @media print {
          body {
            margin: 0 !important;
            padding: 0 !important;
          }
          
          body * {
            visibility: hidden !important;
          }
          
          .print-only-image {
            visibility: visible !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            right: 0 !important;
            bottom: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            display: block !important;
            object-fit: contain !important;
            object-position: center !important;
            margin: 0 !important;
            padding: 0 !important;
            z-index: 9999 !important;
          }
          
          @page {
            size: auto;
            margin: 0;
          }
        }

        /* Enhanced Spider-Themed Header */
        .party-header {
          text-align: center;
          margin-bottom: 2rem;
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(220, 38, 127, 0.1)),
            radial-gradient(circle at 20% 20%, rgba(147, 51, 234, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(220, 38, 127, 0.1) 0%, transparent 50%);
          border-radius: 15px;
          padding: 1.5rem 1rem;
          box-shadow: 
            0 8px 25px rgba(147, 51, 234, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }
        
        /* Comic Book Burst Effects */
        .comic-burst {
          position: absolute;
          background: linear-gradient(45deg, #ff1493, #ff69b4, #ffb6d9);
          color: white;
          padding: 0.3rem 0.8rem;
          border-radius: 50px;
          font-size: 0.8rem;
          font-weight: bold;
          text-shadow: 1px 1px 3px rgba(0,0,0,0.4);
          transform: rotate(-15deg);
          z-index: 10;
          top: -10px;
          right: 15px;
          border: 2px solid #ffffff;
          box-shadow: 0 4px 12px rgba(255, 20, 147, 0.4), 0 0 20px rgba(255, 105, 180, 0.3);
          animation: pulse 2s ease-in-out infinite alternate;
        }

        .comic-burst.small {
          top: -8px;
          right: 10px;
          font-size: 0.7rem;
          padding: 0.2rem 0.5rem;
          background: linear-gradient(45deg, #00d9ff, #7dd3fc);
        }

        .comic-burst.action {
          top: -15px;
          right: 15px;
          left: auto;
          transform: rotate(15deg);
          background: linear-gradient(45deg, #00d9ff, #7dd3fc, #bfdbfe);
          font-size: 0.9rem;
          animation: pulse-action 2s ease-in-out infinite alternate;
        }
        
        @keyframes pulse {
          from { transform: rotate(-15deg) scale(1); }
          to { transform: rotate(-15deg) scale(1.05); }
        }
        
        @keyframes pulse-action {
          from { transform: rotate(15deg) scale(1); }
          to { transform: rotate(15deg) scale(1.05); }
        }
        
        /* Spider Web Decorations */
        .web-decoration {
          position: absolute;
          width: 60px;
          height: 60px;
          background-image:
            radial-gradient(circle, transparent 20%, rgba(0, 217, 255, 0.4) 20%, rgba(0, 217, 255, 0.4) 25%, transparent 25%),
            linear-gradient(0deg, transparent 48%, rgba(255, 105, 180, 0.5) 48%, rgba(255, 105, 180, 0.5) 52%, transparent 52%),
            linear-gradient(60deg, transparent 48%, rgba(0, 217, 255, 0.5) 48%, rgba(0, 217, 255, 0.5) 52%, transparent 52%),
            linear-gradient(120deg, transparent 48%, rgba(255, 105, 180, 0.5) 48%, rgba(255, 105, 180, 0.5) 52%, transparent 52%);
          background-size: 20px 20px, 60px 60px, 60px 60px, 60px 60px;
          animation: web-shimmer 3s ease-in-out infinite;
          filter: drop-shadow(0 0 8px rgba(255, 105, 180, 0.4));
        }
        
        .web-top-left {
          top: -20px;
          left: -20px;
        }
        
        .web-top-right {
          top: -20px;
          right: -20px;
        }
        
        .web-bottom {
          bottom: -20px;
          right: 20px;
        }
        
        @keyframes web-shimmer {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
        
        /* Enhanced Typography with Spider Theme */
        .main-title {
          font-size: 2rem;
          color: #1a0a3e;
          font-weight: 900;
          margin: 0 0 0.5rem 0;
          text-shadow:
            2px 2px 0 #ff1493,
            3px 3px 0 #00d9ff,
            4px 4px 10px rgba(255, 20, 147, 0.5);
          animation: text-glow 2s ease-in-out infinite alternate;
        }

        @keyframes text-glow {
          from {
            text-shadow:
              2px 2px 0 #ff1493,
              3px 3px 0 #00d9ff,
              4px 4px 10px rgba(255, 20, 147, 0.5);
          }
          to {
            text-shadow:
              2px 2px 0 #ff1493,
              3px 3px 0 #00d9ff,
              4px 4px 20px rgba(255, 20, 147, 0.8);
          }
        }

        .birthday-title {
          font-size: 1.5rem;
          color: #2d0a5e;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          text-shadow:
            1px 1px 0 #ff69b4,
            2px 2px 0 #00d9ff,
            3px 3px 8px rgba(255, 20, 147, 0.4);
        }

        .theme-subtitle {
          font-size: 1.1rem;
          color: #1e0a3d;
          font-weight: 800;
          margin: 0;
          text-shadow:
            1px 1px 0 #00d9ff,
            2px 2px 0 #ff69b4,
            2px 2px 6px rgba(0, 217, 255, 0.4);
        }

        /* Enhanced Spider-Themed Party Details */
        .party-details {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 1rem;
          margin: 1.5rem 0;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .detail-card {
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(220, 38, 127, 0.05)),
            radial-gradient(circle at 10% 10%, rgba(147, 51, 234, 0.1) 0%, transparent 30%);
          border: 2px solid transparent;
          border-radius: 12px;
          padding: 1rem;
          text-align: center;
          box-shadow: 
            0 4px 15px rgba(147, 51, 234, 0.2),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        /* Spider Web Border Effect */
        .detail-card::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(135deg, #ff69b4, #00d9ff, #ff1493, #7dd3fc);
          border-radius: 14px;
          z-index: -1;
          opacity: 0.8;
        }

        .detail-card::after {
          content: '';
          position: absolute;
          top: 5px;
          left: 5px;
          right: 5px;
          bottom: 5px;
          background-image:
            linear-gradient(45deg, transparent 48%, rgba(255, 105, 180, 0.1) 48%, rgba(255, 105, 180, 0.1) 52%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(0, 217, 255, 0.1) 48%, rgba(0, 217, 255, 0.1) 52%, transparent 52%);
          background-size: 15px 15px, 15px 15px;
          border-radius: 8px;
          opacity: 0.3;
          z-index: 0;
          pointer-events: none;
        }

        .detail-card > * {
          position: relative;
          z-index: 1;
        }

        .detail-card:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 8px 25px rgba(255, 105, 180, 0.4),
            0 0 20px rgba(0, 217, 255, 0.3);
          animation: web-pulse 0.5s ease-out;
        }

        .detail-card:hover::before {
          opacity: 1;
          animation: border-spin 2s linear infinite;
        }

        @keyframes web-pulse {
          0% { transform: translateY(-3px) scale(1.02); }
          50% { transform: translateY(-5px) scale(1.05); }
          100% { transform: translateY(-3px) scale(1.02); }
        }

        @keyframes border-spin {
          from { background: linear-gradient(135deg, #ff69b4, #00d9ff, #ff1493, #7dd3fc); }
          25% { background: linear-gradient(135deg, #00d9ff, #ff1493, #7dd3fc, #ff69b4); }
          50% { background: linear-gradient(135deg, #ff1493, #7dd3fc, #ff69b4, #00d9ff); }
          75% { background: linear-gradient(135deg, #7dd3fc, #ff69b4, #00d9ff, #ff1493); }
          to { background: linear-gradient(135deg, #ff69b4, #00d9ff, #ff1493, #7dd3fc); }
        }

        .card-icon {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }

        .detail-card h3 {
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.2rem;
          margin: 0.5rem 0;
          font-weight: bold;
        }

        .detail-text {
          color: #1f2937;
          font-size: 0.95rem;
          line-height: 1.4;
          margin: 0;
        }

        /* Enhanced Spider Mission Special Request */
        .special-request {
          grid-column: 1 / -1;
          background:
            linear-gradient(135deg, #ff1493, #ff69b4, #ffb6d9) !important,
            radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.3) 0%, transparent 50%);
          border: 3px solid #ffffff !important;
          position: relative;
          overflow: visible;
        }

        .special-request::before {
          background: linear-gradient(135deg, #ff1493, #ff69b4, #00d9ff, #7dd3fc) !important;
          animation: special-border-glow 3s ease-in-out infinite alternate;
        }

        @keyframes special-border-glow {
          from {
            background: linear-gradient(135deg, #ff1493, #ff69b4, #00d9ff, #7dd3fc);
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.6);
          }
          to {
            background: linear-gradient(135deg, #ff69b4, #00d9ff, #7dd3fc, #ff1493);
            box-shadow: 0 0 30px rgba(0, 217, 255, 0.8);
          }
        }

        .special-request::after {
          background-image: 
            radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(45deg, transparent 48%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.1) 52%, transparent 52%),
            linear-gradient(-45deg, transparent 48%, rgba(255, 255, 255, 0.1) 48%, rgba(255, 255, 255, 0.1) 52%, transparent 52%);
          background-size: 10px 10px, 20px 20px, 20px 20px;
          opacity: 0.4;
        }

        .special-content {
          padding: 0.5rem;
          position: relative;
          z-index: 2;
        }

        .special-request .detail-text.highlight {
          color: #ffffff !important;
          font-size: 1.1rem !important;
          font-weight: bold;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.7);
          filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.3));
        }

        /* Official Invitation Preview Section */
        .invitation-preview {
          text-align: center;
          margin: 3rem 0;
          padding: 2rem;
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(147, 51, 234, 0.05)),
            radial-gradient(circle at 30% 30%, rgba(220, 38, 127, 0.1) 0%, transparent 50%);
          border-radius: 15px;
          backdrop-filter: blur(10px);
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .invitation-preview::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff69b4, #00d9ff, #ff1493, #7dd3fc);
          border-radius: 17px;
          z-index: -1;
          opacity: 0.8;
        }

        .invitation-preview h3 {
          color: #1a0a3e;
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 1.5rem;
          text-shadow:
            2px 2px 0 #ff1493,
            3px 3px 0 #00d9ff,
            4px 4px 10px rgba(255, 20, 147, 0.5);
        }

        .preview-container {
          max-width: 600px;
          margin: 0 auto;
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 8px 32px rgba(255, 105, 180, 0.3),
            0 0 20px rgba(0, 217, 255, 0.2);
          transition: all 0.3s ease;
        }

        .preview-container:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow:
            0 12px 40px rgba(255, 105, 180, 0.4),
            0 0 30px rgba(0, 217, 255, 0.3);
        }

        .official-invitation {
          width: 100%;
          height: auto;
          display: block;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .official-invitation:hover {
          filter: brightness(1.05);
        }

        /* Enhanced Spider Action Section */
        .action-section {
          text-align: center;
          margin: 2rem 0;
          padding: 1.5rem;
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(20, 184, 166, 0.05)),
            radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.1) 0%, transparent 40%);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          position: relative;
          border: 2px solid transparent;
          background-clip: padding-box;
        }

        .action-section::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00d9ff, #7dd3fc, #bfdbfe);
          border-radius: 14px;
          z-index: -1;
          opacity: 0.8;
        }

        .rsvp-info h3 {
          color: #1a0a3e;
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 0.5rem;
          text-shadow:
            1px 1px 0 #ff1493,
            2px 2px 0 #00d9ff,
            3px 3px 8px rgba(255, 20, 147, 0.5);
          animation: text-wobble 3s ease-in-out infinite;
        }

        @keyframes text-wobble {
          0%, 100% { transform: translateX(0px); }
          25% { transform: translateX(1px); }
          75% { transform: translateX(-1px); }
        }

        .contact-info {
          color: #1f2937;
          font-size: 1.1rem;
          margin-bottom: 1rem;
        }

        .contact-info a {
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          font-weight: bold;
          filter: drop-shadow(1px 1px 2px rgba(255, 20, 147, 0.3));
          transition: all 0.3s ease;
        }

        .contact-info a:hover {
          filter: drop-shadow(2px 2px 4px rgba(255, 105, 180, 0.5));
          transform: scale(1.05);
        }

        /* Enhanced Spider Print Button */
        .print-btn {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff, #7dd3fc);
          background-size: 200% 200%;
          color: white;
          border: 2px solid #ffffff;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: bold;
          border-radius: 25px;
          cursor: pointer;
          box-shadow:
            0 4px 12px rgba(255, 105, 180, 0.4),
            0 0 20px rgba(0, 217, 255, 0.3);
          transition: all 0.3s ease;
          font-family: inherit;
          position: relative;
          overflow: hidden;
          animation: gradient-shift 3s ease infinite;
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .print-btn::before {
          content: '🕸️';
          position: absolute;
          top: -10px;
          right: -10px;
          font-size: 1.5rem;
          opacity: 0;
          transition: all 0.3s ease;
        }

        .print-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            0 8px 25px rgba(255, 105, 180, 0.5),
            0 0 30px rgba(0, 217, 255, 0.4);
          animation: print-pulse 0.6s ease-out;
        }

        .print-btn:hover::before {
          opacity: 1;
          transform: rotate(360deg);
        }

        @keyframes print-pulse {
          0% { transform: translateY(-3px) scale(1.05); }
          50% { transform: translateY(-5px) scale(1.1); }
          100% { transform: translateY(-3px) scale(1.05); }
        }

        /* Enhanced Spider Footer */
        .party-footer {
          text-align: center;
          margin-top: 2rem;
          padding: 1rem;
          background: 
            linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(147, 51, 234, 0.05)),
            radial-gradient(circle at center, rgba(220, 38, 127, 0.1) 0%, transparent 50%);
          border-radius: 12px;
          backdrop-filter: blur(10px);
          border: 2px solid transparent;
          position: relative;
        }

        .party-footer::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #ff69b4, #00d9ff, #ff1493);
          border-radius: 14px;
          z-index: -1;
          opacity: 0.6;
        }

        .spider-web-small {
          width: 40px;
          height: 40px;
          background-image:
            radial-gradient(circle, #ff1493 2px, transparent 2px),
            linear-gradient(0deg, transparent 48%, #ff69b4 48%, #ff69b4 52%, transparent 52%),
            linear-gradient(60deg, transparent 48%, #00d9ff 48%, #00d9ff 52%, transparent 52%),
            linear-gradient(120deg, transparent 48%, #7dd3fc 48%, #7dd3fc 52%, transparent 52%);
          background-size: 10px 10px, 40px 40px, 40px 40px, 40px 40px;
          margin: 0 auto 1rem auto;
          animation: web-spin 4s linear infinite;
        }

        @keyframes web-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .party-footer p {
          color: #1f2937;
          font-size: 1rem;
          margin: 0.25rem 0;
          position: relative;
          z-index: 1;
        }

        .signature {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-style: italic;
          font-weight: bold;
          filter: drop-shadow(1px 1px 2px rgba(255, 20, 147, 0.3));
        }

        /* Mobile Responsiveness */
        @media (max-width: 768px) {
          .invitation-container {
            padding: 0.5rem;
          }

          .party-header {
            padding: 1rem;
            margin-bottom: 1rem;
          }

          .main-title {
            font-size: 1.8rem;
          }

          .birthday-title {
            font-size: 1.3rem;
          }

          .theme-subtitle {
            font-size: 1rem;
          }

          .party-details {
            grid-template-columns: 1fr;
            gap: 0.75rem;
            margin: 1rem 0;
          }

          .detail-card {
            padding: 0.75rem;
          }

          .card-icon {
            font-size: 1.8rem;
          }

          .detail-card h3 {
            font-size: 1.1rem;
          }

          .detail-text {
            font-size: 0.9rem;
          }

          .action-section {
            padding: 1rem;
            margin: 1rem 0;
          }

          .print-btn {
            padding: 0.7rem 1.2rem;
            font-size: 0.9rem;
          }

          /* Adjust comic burst positioning for mobile */
          .comic-burst.action {
            top: -12px;
            right: 10px;
            font-size: 0.8rem;
          }

          /* Mobile invitation preview adjustments */
          .invitation-preview {
            margin: 2rem 0;
            padding: 1.5rem;
          }

          .invitation-preview h3 {
            font-size: 1.4rem;
          }

          .preview-container {
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .main-title {
            font-size: 1.6rem;
          }

          .birthday-title {
            font-size: 1.2rem;
          }

          .party-details {
            gap: 0.5rem;
          }

          .detail-card {
            padding: 0.6rem;
          }
        }

        /* RSVP Button Styles */
        .rsvp-btn {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-size: 200% 200%;
          color: white;
          border: 2px solid #ffffff;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          font-weight: bold;
          border-radius: 25px;
          cursor: pointer;
          box-shadow:
            0 4px 12px rgba(255, 105, 180, 0.4),
            0 0 20px rgba(0, 217, 255, 0.3);
          transition: all 0.3s ease;
          font-family: inherit;
          margin: 1rem 0;
          animation: gradient-shift 3s ease infinite;
        }

        .rsvp-btn:hover {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            0 8px 25px rgba(255, 105, 180, 0.5),
            0 0 30px rgba(0, 217, 255, 0.4);
        }

        .contact-info-small {
          font-size: 0.9rem;
          color: #1f2937;
          margin-top: 0.5rem;
        }

        .contact-info-small a {
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-decoration: none;
          font-weight: bold;
        }

        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(5px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10000;
          padding: 1rem;
          animation: fadeIn 0.3s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .modal-content {
          background: linear-gradient(135deg, #ffffff 0%, #fce7f3 100%);
          border-radius: 20px;
          padding: 2rem;
          max-width: 600px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          box-shadow:
            0 20px 60px rgba(255, 105, 180, 0.4),
            0 0 40px rgba(0, 217, 255, 0.3);
          border: 3px solid transparent;
          background-clip: padding-box;
          animation: slideIn 0.3s ease;
        }

        .modal-content::before {
          content: '';
          position: absolute;
          top: -3px;
          left: -3px;
          right: -3px;
          bottom: -3px;
          background: linear-gradient(45deg, #ff69b4, #00d9ff, #ff1493, #7dd3fc);
          border-radius: 23px;
          z-index: -1;
          animation: border-spin 3s linear infinite;
        }

        @keyframes slideIn {
          from {
            transform: translateY(-50px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .modal-close {
          position: absolute;
          top: 1rem;
          right: 1rem;
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          font-size: 1.5rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
        }

        .modal-close:hover {
          transform: rotate(90deg) scale(1.1);
          box-shadow: 0 6px 20px rgba(255, 20, 147, 0.5);
        }

        .modal-title {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 2rem;
          text-align: center;
          margin: 0 0 2rem 0;
          filter: drop-shadow(2px 2px 4px rgba(255, 20, 147, 0.3));
        }

        /* Form Styles */
        .rsvp-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .form-group label {
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-weight: bold;
          font-size: 1rem;
        }

        .form-group input,
        .form-group textarea {
          padding: 0.75rem;
          border: 2px solid #ff69b4;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          background: white;
          transition: all 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #00d9ff;
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
        }

        .radio-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .radio-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          border: 2px solid #ffb6d9;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          background: white;
          color: #1f2937 !important;
          -webkit-text-fill-color: #1f2937 !important;
          background-clip: border-box !important;
        }

        .radio-label:hover {
          border-color: #ff69b4;
          background: rgba(255, 182, 217, 0.1);
        }

        .radio-label input[type="radio"] {
          width: 20px;
          height: 20px;
          accent-color: #ff1493;
        }

        .submit-btn {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff, #7dd3fc);
          background-size: 200% 200%;
          color: white;
          border: 2px solid #ffffff;
          padding: 1rem 2rem;
          font-size: 1.2rem;
          font-weight: bold;
          border-radius: 25px;
          cursor: pointer;
          box-shadow:
            0 4px 12px rgba(255, 105, 180, 0.4),
            0 0 20px rgba(0, 217, 255, 0.3);
          transition: all 0.3s ease;
          font-family: inherit;
          margin-top: 1rem;
          animation: gradient-shift 3s ease infinite;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px) scale(1.05);
          box-shadow:
            0 8px 25px rgba(255, 105, 180, 0.5),
            0 0 30px rgba(0, 217, 255, 0.4);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        /* Success/Error Messages */
        .success-message {
          text-align: center;
          padding: 3rem 1rem;
        }

        .success-icon {
          font-size: 5rem;
          margin-bottom: 1rem;
          animation: bounce 1s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .success-message p {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .error-message {
          background: linear-gradient(135deg, #ff1493, #ff69b4);
          color: white;
          padding: 1rem;
          border-radius: 12px;
          text-align: center;
          font-weight: bold;
          box-shadow: 0 4px 12px rgba(255, 20, 147, 0.3);
        }

        /* Modal Mobile Responsiveness */
        @media (max-width: 768px) {
          .modal-content {
            padding: 1.5rem;
            max-height: 95vh;
          }

          .modal-title {
            font-size: 1.5rem;
          }

          .rsvp-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }

          .submit-btn {
            font-size: 1rem;
            padding: 0.8rem 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .modal-content {
            padding: 1rem;
          }

          .modal-title {
            font-size: 1.3rem;
            margin-bottom: 1.5rem;
          }

          .form-group {
            gap: 0.3rem;
          }

          .rsvp-form {
            gap: 1rem;
          }
        }
      `}</style>
    </>
  );
}