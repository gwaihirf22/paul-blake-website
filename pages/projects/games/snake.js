import Head from "next/head";
import Link from "next/link";
import SnakeGame from "../../../components/games/SnakeGame";

export default function Snake() {
  return (
    <>
      <Head>
        <title>Snake Game - Paul Blake</title>
        <meta name="description" content="Play the classic Snake game with modern twists! Eat food to grow, collect power-ups, and beat your high score." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Snake Game - Paul Blake" />
        <meta property="og:description" content="Classic snake game with power-ups, progressive difficulty, and smooth gameplay." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Snake Game - Paul Blake" />
        <meta name="twitter:description" content="Play the classic Snake game right in your browser!" />
      </Head>

      <div>
        <h1>🐍 Snake Game</h1>
        <p>Guide your snake through the grid, eating food to grow longer. Avoid hitting walls and yourself in this classic arcade game with modern features!</p>

        <SnakeGame />

        <div className="game-info">
          <div className="dark-card">
            <h2>How to Play</h2>
            <ul>
              <li><strong>Objective:</strong> Eat food to grow your snake and achieve the highest score possible</li>
              <li><strong>Controls:</strong> Use arrow keys or WASD to change direction. Spacebar to pause.</li>
              <li><strong>Mobile:</strong> Swipe in any direction to move the snake</li>
              <li><strong>Rules:</strong> Avoid hitting walls or your own body, or it's game over!</li>
              <li><strong>Growth:</strong> Each food item makes your snake one segment longer</li>
            </ul>
          </div>

          <div className="dark-card">
            <h2>Game Features</h2>
            <div className="features-grid">
              <div className="feature">
                <h4>🎮 Classic Gameplay</h4>
                <p>Timeless snake mechanics that never get old</p>
              </div>
              <div className="feature">
                <h4>✨ Power-Ups</h4>
                <p>Collect special items for temporary abilities</p>
              </div>
              <div className="feature">
                <h4>📱 Mobile Responsive</h4>
                <p>Swipe controls optimized for touch devices</p>
              </div>
              <div className="feature">
                <h4>🏆 High Score Tracking</h4>
                <p>Your best score is saved locally</p>
              </div>
              <div className="feature">
                <h4>⚡ Progressive Difficulty</h4>
                <p>Speed increases as you score more points</p>
              </div>
              <div className="feature">
                <h4>🎨 Modern Graphics</h4>
                <p>Clean neon aesthetic with particle effects</p>
              </div>
            </div>
          </div>

          <div className="dark-card">
            <h2>Power-Ups</h2>
            <p>Collect special power-ups for temporary advantages:</p>
            <div className="powerups-grid">
              <div className="powerup">
                <span className="powerup-icon" style={{color: '#ff6b35'}}>⚡</span>
                <h4>Speed Boost</h4>
                <p>Move faster for a short time - risk vs reward!</p>
              </div>
              <div className="powerup">
                <span className="powerup-icon" style={{color: '#ffd700'}}>🛡️</span>
                <h4>Invincibility Shield</h4>
                <p>Pass through walls and yourself safely</p>
              </div>
              <div className="powerup">
                <span className="powerup-icon" style={{color: '#00ff88'}}>✨</span>
                <h4>Score Multiplier</h4>
                <p>Earn double points for each food collected</p>
              </div>
            </div>
          </div>

          <div className="dark-card">
            <h2>Technical Details</h2>
            <p>This game is built using modern web technologies:</p>
            <ul>
              <li><strong>HTML5 Canvas:</strong> For smooth 2D grid-based rendering</li>
              <li><strong>JavaScript ES6+:</strong> Modern language features with clean architecture</li>
              <li><strong>React Hooks:</strong> State management and component lifecycle</li>
              <li><strong>RequestAnimationFrame:</strong> Smooth 60fps game loop</li>
              <li><strong>Touch Events:</strong> Native swipe gesture detection for mobile</li>
              <li><strong>Local Storage:</strong> Persistent high score tracking</li>
            </ul>

            <p>The game features grid-based collision detection, procedurally spawned power-ups, progressive speed scaling, particle effects for visual feedback, and a combo system for skilled players.</p>
          </div>

          <div className="dark-card">
            <h2>Tips & Strategy</h2>
            <div className="tips">
              <div className="tip">
                <strong>🎯 Plan Your Path:</strong>
                <p>Think several moves ahead - avoid boxing yourself into corners</p>
              </div>
              <div className="tip">
                <strong>🌀 Spiral Pattern:</strong>
                <p>Create a spiral path to maximize space utilization as you grow</p>
              </div>
              <div className="tip">
                <strong>⚡ Power-Up Timing:</strong>
                <p>Save invincibility for when you're long and need to navigate tight spaces</p>
              </div>
              <div className="tip">
                <strong>🎮 Smooth Movements:</strong>
                <p>Use gentle direction changes instead of sharp turns to maintain control</p>
              </div>
              <div className="tip">
                <strong>🏃 Speed Management:</strong>
                <p>As speed increases, stick to the edges for more reaction time</p>
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

        .powerups-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .powerup {
          text-align: center;
          padding: 1.5rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.05), rgba(0, 188, 212, 0.02));
          border: 1px solid rgba(0, 188, 212, 0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .powerup:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 188, 212, 0.2);
        }

        .powerup-icon {
          font-size: 2.5rem;
          display: block;
          margin-bottom: 0.5rem;
          filter: drop-shadow(0 0 8px currentColor);
        }

        .powerup h4 {
          margin: 0.5rem 0;
          color: var(--color-text-primary);
          font-size: 1.1rem;
        }

        .powerup p {
          margin: 0;
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          line-height: 1.5;
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
          .features-grid,
          .powerups-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .navigation-links {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }

          .powerup {
            padding: 1rem;
          }

          .powerup-icon {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
