import Head from "next/head";
import Link from "next/link";
import HelicopterGame from "../../../components/games/HelicopterGame";

export default function Helicopter() {
  return (
    <>
      <Head>
        <title>Helicopter Game - Paul Blake</title>
        <meta name="description" content="Play the addictive Helicopter Game! Simple one-click controls - hold to ascend, release to descend. Navigate through obstacles and beat your high score." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Helicopter Game - Paul Blake" />
        <meta property="og:description" content="Addictive browser-based helicopter game with simple controls and challenging gameplay." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Helicopter Game - Paul Blake" />
        <meta name="twitter:description" content="Play the addictive Helicopter Game right in your browser!" />
      </Head>
      
      <div>
        <h1>🚁 Helicopter Game</h1>
        <p>Navigate your helicopter through challenging obstacles in this classic arcade-style game. Simple one-click controls make it easy to learn but hard to master!</p>
        
        <HelicopterGame />
        
        <div className="game-info">
          <div className="dark-card">
            <h2>How to Play</h2>
            <ul>
              <li><strong>Objective:</strong> Navigate through as many obstacles as possible without crashing</li>
              <li><strong>Controls:</strong> Hold to make the helicopter ascend, release to descend</li>
              <li><strong>Scoring:</strong> Earn 1 point for each obstacle you successfully pass</li>
              <li><strong>Physics:</strong> The helicopter has realistic momentum - plan your movements!</li>
            </ul>
          </div>

          <div className="dark-card">
            <h2>Game Features</h2>
            <div className="features-grid">
              <div className="feature">
                <h4>🎮 Simple Controls</h4>
                <p>One-click control system works on any device</p>
              </div>
              <div className="feature">
                <h4>📱 Mobile Responsive</h4>
                <p>Touch controls optimized for mobile devices</p>
              </div>
              <div className="feature">
                <h4>🏆 High Score Tracking</h4>
                <p>Your best score is saved locally</p>
              </div>
              <div className="feature">
                <h4>⚡ Smooth Performance</h4>
                <p>60fps gameplay with particle effects</p>
              </div>
              <div className="feature">
                <h4>🎨 Modern Graphics</h4>
                <p>Clean, responsive design with animations</p>
              </div>
              <div className="feature">
                <h4>🔄 Progressive Difficulty</h4>
                <p>Obstacles become more challenging over time</p>
              </div>
            </div>
          </div>

          <div className="dark-card">
            <h2>Technical Details</h2>
            <p>This game is built using modern web technologies:</p>
            <ul>
              <li><strong>HTML5 Canvas:</strong> For smooth 2D graphics rendering</li>
              <li><strong>JavaScript ES6+:</strong> Modern language features for clean code</li>
              <li><strong>React Hooks:</strong> State management and lifecycle handling</li>
              <li><strong>RequestAnimationFrame:</strong> Optimal 60fps game loop</li>
              <li><strong>Touch API:</strong> Native mobile device support</li>
              <li><strong>Local Storage:</strong> Persistent high score tracking</li>
            </ul>
            
            <p>The game features physics-based movement with gravity simulation, procedurally generated obstacles, particle effects for visual feedback, and collision detection optimized for performance.</p>
          </div>

          <div className="dark-card">
            <h2>Tips & Strategy</h2>
            <div className="tips">
              <div className="tip">
                <strong>🎯 Timing is Everything:</strong>
                <p>Don&apos;t hold the controls too long - small, controlled movements work best</p>
              </div>
              <div className="tip">
                <strong>👀 Look Ahead:</strong>
                <p>Plan your path through upcoming obstacles rather than reacting at the last moment</p>
              </div>
              <div className="tip">
                <strong>🌊 Use Momentum:</strong>
                <p>The helicopter has realistic physics - use its momentum to glide through tight spaces</p>
              </div>
              <div className="tip">
                <strong>💎 Stay Centered:</strong>
                <p>Try to fly through the middle of gaps when possible for maximum safety margin</p>
              </div>
            </div>
          </div>
        </div>

        <div className="navigation-links">
          <Link href="/projects/games">← Back to Games</Link>
          <Link href="/projects">Back to Projects</Link>
          <Link href="/">Home</Link>
        </div>
      </div>

      <style jsx>{`
        .game-info {
          margin-top: 3rem;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .feature {
          padding: 1rem;
          background: rgba(0, 188, 212, 0.05);
          border: 1px solid rgba(0, 188, 212, 0.2);
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .feature:hover {
          background: rgba(0, 188, 212, 0.1);
          border-color: rgba(0, 188, 212, 0.3);
          transform: translateY(-2px);
        }

        .feature h4 {
          margin: 0 0 0.5rem 0;
          color: var(--color-accent);
          font-size: 1rem;
        }

        .feature p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
        }

        .tips {
          display: grid;
          gap: 1rem;
          margin-top: 1rem;
        }

        .tip {
          padding: 1rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.05), rgba(0, 188, 212, 0.02));
          border-left: 3px solid var(--color-accent);
          border-radius: 0 8px 8px 0;
        }

        .tip strong {
          display: block;
          color: var(--color-accent);
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
        }

        .tip p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .navigation-links {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--color-border);
          display: flex;
          gap: 2rem;
          flex-wrap: wrap;
        }

        .navigation-links a {
          color: var(--color-accent);
          text-decoration: none;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .navigation-links a:hover {
          color: var(--color-hover);
          transform: translateX(-2px);
        }

        ul {
          margin: 1rem 0;
          padding-left: 2rem;
        }

        li {
          margin-bottom: 0.75rem;
          color: var(--color-text-secondary);
          line-height: 1.5;
        }

        li strong {
          color: var(--color-text-primary);
        }

        @media (max-width: 768px) {
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .navigation-links {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
        }
      `}</style>
    </>
  );
}