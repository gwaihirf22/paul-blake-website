import Head from "next/head";
import Link from "next/link";

export default function Games() {
  return (
    <>
      <Head>
        <title>Games - Paul Blake</title>
        <meta name="description" content="Interactive browser games built with modern web technologies. Play fun, engaging games right in your browser." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Games</h1>
        <p>Welcome to my collection of interactive browser games! Each game is built with modern web technologies, focusing on smooth gameplay, responsive design, and fun mechanics. All games work on both desktop and mobile devices.</p>
        
        <div className="games-grid">
          <h2>Available Games</h2>
          
          <div className="dark-card game-card">
            <h3>🚁 Helicopter Game</h3>
            <p><strong>Genre:</strong> Arcade / Endless Runner</p>
            <p><strong>Controls:</strong> One-click control - Hold to ascend, release to descend</p>
            <p><strong>Tech Stack:</strong> HTML5 Canvas, JavaScript, CSS3 Animations</p>
            <p>Navigate your helicopter through challenging obstacles in this addictive arcade-style game. Simple one-click controls make it easy to play but hard to master. Features physics-based movement, procedurally generated obstacles, and a dynamic scoring system.</p>
            <p><strong>Features:</strong></p>
            <ul>
              <li>Smooth 60fps gameplay</li>
              <li>Responsive controls for mobile and desktop</li>
              <li>High score tracking</li>
              <li>Particle effects and smooth animations</li>
              <li>Progressive difficulty</li>
            </ul>
            <div className="game-actions">
              <Link href="/projects/games/helicopter" className="dark-card-button play-button">Play Game</Link>
            </div>
          </div>

          <div className="dark-card game-card">
            <h3>🐍 Snake Game</h3>
            <p><strong>Genre:</strong> Arcade / Classic</p>
            <p><strong>Controls:</strong> Arrow keys or WASD (Desktop), Swipe gestures (Mobile)</p>
            <p><strong>Tech Stack:</strong> HTML5 Canvas, React Hooks, JavaScript</p>
            <p>Guide your snake through the grid in this classic arcade game with modern features. Eat food to grow longer, collect power-ups for special abilities, and avoid hitting walls or yourself. Progressive difficulty and smooth gameplay make this a fresh take on a timeless classic.</p>
            <p><strong>Features:</strong></p>
            <ul>
              <li>Classic snake mechanics with modern polish</li>
              <li>Three unique power-ups (speed, invincibility, multiplier)</li>
              <li>Mobile-optimized swipe controls</li>
              <li>Progressive difficulty scaling</li>
              <li>Particle effects and combo system</li>
            </ul>
            <div className="game-actions">
              <Link href="/projects/games/snake" className="dark-card-button play-button">Play Game</Link>
            </div>
          </div>

          <div className="dark-card-secondary coming-soon">
            <h3>🎮 More Games Coming Soon!</h3>
            <p>I&apos;m constantly working on new games and interactive experiences. Here&apos;s what&apos;s in development:</p>
            <ul>
              <li><strong>Pong Evolution:</strong> The classic game reimagined</li>
              <li><strong>Memory Maze:</strong> Test your memory with pattern challenges</li>
              <li><strong>Tetris Clone:</strong> Block-stacking puzzle action</li>
            </ul>
            <p><em>Stay tuned for more interactive experiences!</em></p>
          </div>
        </div>

        <div className="dark-card">
          <h2>Game Development Philosophy</h2>
          <p>Each game is crafted with attention to performance, accessibility, and user experience. I focus on creating games that are:</p>
          <ul>
            <li><strong>Accessible:</strong> Playable on any device with intuitive controls</li>
            <li><strong>Performant:</strong> Optimized for smooth gameplay on all devices</li>
            <li><strong>Engaging:</strong> Simple to learn but challenging to master</li>
            <li><strong>Clean:</strong> Built with modern web standards and clean code</li>
          </ul>
          
          <p>All games are built using vanilla JavaScript and HTML5 Canvas for maximum performance and minimal dependencies. This ensures fast loading times and compatibility across all modern browsers.</p>
        </div>

        <p>
          <Link href="/projects">← Back to Projects</Link> | <Link href="/">Back to Home</Link>
        </p>
      </div>

      <style jsx>{`
        .games-grid {
          margin: 2rem 0;
        }
        
        .game-card {
          position: relative;
          overflow: hidden;
        }
        
        .game-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, var(--color-accent), var(--color-hover));
          border-radius: 8px 8px 0 0;
        }
        
        .game-actions {
          margin-top: 2rem;
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }
        
        .play-button {
          background: linear-gradient(135deg, var(--color-accent), var(--color-hover));
          color: var(--color-background);
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          box-shadow: 0 4px 15px rgba(0, 188, 212, 0.3);
          transition: all 0.3s ease;
        }
        
        .play-button:hover {
          background: linear-gradient(135deg, var(--color-hover), var(--color-accent));
          transform: translateY(-3px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.4);
        }
        
        .coming-soon {
          border-left: 4px solid var(--color-accent);
          background: linear-gradient(135deg, var(--card-bg-secondary), var(--card-bg-primary));
        }
        
        .coming-soon h3 {
          color: var(--color-accent);
        }
        
        ul {
          margin: 1rem 0;
          padding-left: 2rem;
        }
        
        li {
          margin-bottom: 0.5rem;
          color: var(--color-text-secondary);
        }
        
        li strong {
          color: var(--color-text-primary);
        }
        
        @media (max-width: 768px) {
          .game-actions {
            justify-content: center;
          }
          
          .play-button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>
    </>
  );
} 