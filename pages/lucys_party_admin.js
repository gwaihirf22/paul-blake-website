import Head from "next/head";
import { useState, useEffect } from "react";

export default function LucysPartyAdmin() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [rsvps, setRsvps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/get-rsvps?password=${encodeURIComponent(password)}`);
      const data = await response.json();

      if (response.ok) {
        setAuthenticated(true);
        setRsvps(data.rsvps);
      } else {
        setError('Incorrect password');
      }
    } catch (err) {
      setError('Failed to load RSVPs');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/get-rsvps?password=${encodeURIComponent(password)}`);
      const data = await response.json();

      if (response.ok) {
        setRsvps(data.rsvps);
      }
    } catch (err) {
      setError('Failed to refresh RSVPs');
    } finally {
      setLoading(false);
    }
  };

  const attendingCount = rsvps.filter(r => r.attending).reduce((sum, r) => sum + r.guestCount, 0);
  const notAttendingCount = rsvps.filter(r => !r.attending).length;

  return (
    <>
      <Head>
        <title>Lucy's Party - RSVP Admin</title>
        <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
      </Head>

      {/* Hide navbar */}
      <style jsx global>{`
        .navbar { display: none !important; }
        .main-content { padding-top: 0 !important; }
      `}</style>

      <div className="admin-container">
        {!authenticated ? (
          <div className="login-card">
            <h1>🕷️ Lucy's Party RSVPs</h1>
            <p>Enter password to view responses</p>
            <form onSubmit={handleLogin}>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? 'Loading...' : 'View RSVPs'}
              </button>
              {error && <p className="error">{error}</p>}
            </form>
          </div>
        ) : (
          <div className="rsvp-list">
            <div className="header">
              <h1>🕷️ Lucy's Party RSVPs</h1>
              <button onClick={handleRefresh} disabled={loading} className="refresh-btn">
                {loading ? '🔄 Loading...' : '🔄 Refresh'}
              </button>
            </div>

            <div className="summary">
              <div className="stat">
                <span className="stat-number">{attendingCount}</span>
                <span className="stat-label">Guests Attending</span>
              </div>
              <div className="stat">
                <span className="stat-number">{rsvps.filter(r => r.attending).length}</span>
                <span className="stat-label">Families Attending</span>
              </div>
              <div className="stat">
                <span className="stat-number">{notAttendingCount}</span>
                <span className="stat-label">Can't Attend</span>
              </div>
              <div className="stat">
                <span className="stat-number">{rsvps.length}</span>
                <span className="stat-label">Total Responses</span>
              </div>
            </div>

            <div className="rsvp-cards">
              {rsvps.length === 0 ? (
                <p className="no-rsvps">No RSVPs yet! 🕸️</p>
              ) : (
                rsvps.map((rsvp) => (
                  <div key={rsvp.id} className={`rsvp-card ${rsvp.attending ? 'attending' : 'not-attending'}`}>
                    <div className="rsvp-header">
                      <h3>{rsvp.guestName}</h3>
                      <span className="status-badge">
                        {rsvp.attending ? '✅ Attending' : '❌ Can\'t Make It'}
                      </span>
                    </div>

                    <div className="rsvp-details">
                      <div className="detail">
                        <strong>Guests:</strong> {rsvp.guestCount}
                      </div>

                      {rsvp.email && (
                        <div className="detail">
                          <strong>Email:</strong> <a href={`mailto:${rsvp.email}`}>{rsvp.email}</a>
                        </div>
                      )}

                      {rsvp.phone && (
                        <div className="detail">
                          <strong>Phone:</strong> <a href={`tel:${rsvp.phone}`}>{rsvp.phone}</a>
                        </div>
                      )}

                      {rsvp.bookTitle && (
                        <div className="detail">
                          <strong>Book:</strong> {rsvp.bookTitle}
                        </div>
                      )}

                      {rsvp.dietaryNeeds && (
                        <div className="detail">
                          <strong>Dietary:</strong> {rsvp.dietaryNeeds}
                        </div>
                      )}

                      {rsvp.message && (
                        <div className="detail message">
                          <strong>Message:</strong> {rsvp.message}
                        </div>
                      )}

                      <div className="detail timestamp">
                        <strong>Submitted:</strong> {rsvp.submittedAt}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .admin-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #fce7f3 0%, #ddd6fe 25%, #bfdbfe 50%, #e0f2fe 75%, #fce7f3 100%);
          padding: 2rem;
          font-family: 'Comic Sans MS', 'Chalkboard SE', 'Bradley Hand', cursive, sans-serif;
        }

        .login-card {
          max-width: 400px;
          margin: 10vh auto;
          background: white;
          padding: 2rem;
          border-radius: 20px;
          box-shadow: 0 20px 60px rgba(255, 105, 180, 0.3);
          border: 3px solid #ff69b4;
          text-align: center;
        }

        .login-card h1 {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 0.5rem 0;
        }

        .login-card p {
          color: #64748b;
          margin-bottom: 1.5rem;
        }

        .login-card form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .login-card input {
          padding: 0.75rem;
          border: 2px solid #ff69b4;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
        }

        .login-card input:focus {
          outline: none;
          border-color: #00d9ff;
          box-shadow: 0 0 15px rgba(0, 217, 255, 0.3);
        }

        .login-card button {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          color: white;
          border: none;
          padding: 0.75rem;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .login-card button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(255, 105, 180, 0.4);
        }

        .login-card button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .error {
          color: #ff1493;
          font-weight: bold;
          margin: 0;
        }

        .rsvp-list {
          max-width: 1200px;
          margin: 0 auto;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .header h1 {
          background: linear-gradient(45deg, #ff1493, #ff69b4, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0;
          font-size: 2.5rem;
        }

        .refresh-btn {
          background: linear-gradient(45deg, #00d9ff, #7dd3fc);
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 12px;
          font-family: inherit;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .refresh-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 217, 255, 0.4);
        }

        .refresh-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .summary {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .stat {
          background: white;
          padding: 1.5rem;
          border-radius: 15px;
          text-align: center;
          box-shadow: 0 4px 15px rgba(255, 105, 180, 0.2);
          border: 2px solid #ffb6d9;
        }

        .stat-number {
          display: block;
          font-size: 2.5rem;
          font-weight: bold;
          background: linear-gradient(45deg, #ff1493, #00d9ff);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .stat-label {
          display: block;
          color: #64748b;
          font-size: 0.9rem;
          margin-top: 0.5rem;
        }

        .rsvp-cards {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .rsvp-card {
          background: white;
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
        }

        .rsvp-card.attending {
          border: 3px solid #00d9ff;
        }

        .rsvp-card.not-attending {
          border: 3px solid #ff69b4;
          opacity: 0.7;
        }

        .rsvp-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(255, 105, 180, 0.3);
        }

        .rsvp-header {
          display: flex;
          justify-content: space-between;
          align-items: start;
          margin-bottom: 1rem;
          gap: 1rem;
        }

        .rsvp-header h3 {
          margin: 0;
          background: linear-gradient(45deg, #ff1493, #ff69b4);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          flex: 1;
        }

        .status-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: bold;
          white-space: nowrap;
        }

        .attending .status-badge {
          background: #00d9ff;
          color: white;
        }

        .not-attending .status-badge {
          background: #ff69b4;
          color: white;
        }

        .rsvp-details {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .detail {
          color: #334155;
          font-size: 0.95rem;
        }

        .detail strong {
          color: #ff1493;
          margin-right: 0.5rem;
        }

        .detail a {
          color: #00d9ff;
          text-decoration: none;
        }

        .detail a:hover {
          text-decoration: underline;
        }

        .detail.message {
          padding: 0.75rem;
          background: #fce7f3;
          border-radius: 8px;
          border-left: 3px solid #ff69b4;
        }

        .detail.timestamp {
          font-size: 0.85rem;
          color: #94a3b8;
          margin-top: 0.5rem;
          padding-top: 0.75rem;
          border-top: 1px solid #e2e8f0;
        }

        .no-rsvps {
          text-align: center;
          font-size: 1.5rem;
          color: #94a3b8;
          padding: 3rem;
        }

        @media (max-width: 768px) {
          .admin-container {
            padding: 1rem;
          }

          .header h1 {
            font-size: 1.8rem;
          }

          .rsvp-cards {
            grid-template-columns: 1fr;
          }

          .summary {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  );
}
