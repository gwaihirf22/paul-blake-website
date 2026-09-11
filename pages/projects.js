import Head from "next/head";
import Link from "next/link";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Paul Blake</title>
        <meta name="description" content="Explore my software projects, applications, and development work." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <div>
        <h1>Projects</h1>
        <p>Welcome to my project showcase! Here you'll find a collection of software applications, tools, and experiments I've been working on. From web applications to mobile apps, each project represents a journey of learning and problem-solving.</p>
        
        <div className="dark-profile-section">
          <h2>Find Me Online</h2>
          <div className="external-links">
            <a href="https://github.com/gwaihirf22" target="_blank" rel="noopener noreferrer">
              <strong>GitHub</strong> - View my source code and contributions
            </a>
            <a href="https://hub.docker.com/repositories/flyingoat03" target="_blank" rel="noopener noreferrer">
              <strong>Docker Hub</strong> - Check out my containerized applications
            </a>
          </div>
        </div>

        <div className="projects-grid">
          <h2>Featured Projects</h2>

          <div className="dark-card">
            <h3>⚔️ Loom — AoE2 Build Order Assistant</h3>
            <p><strong>Tech Stack:</strong> Python, PyQt6, OpenCV</p>
            <p><strong>Platforms:</strong> Windows (.exe), Linux (Flatpak), macOS (limited)</p>
            <p>A real-time build-order assistant for Age of Empires II: Definitive Edition. Captures the game&apos;s HUD, extracts villager count and game clock via computer vision, and overlays step-by-step build instructions with pace and resource alerts — all without touching the game&apos;s memory or files. Includes automated tests via GitHub Actions and binary releases so players need no Python install.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/loom_AOE" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
              <a href="https://github.com/gwaihirf22/loom_AOE/releases" target="_blank" rel="noopener noreferrer" className="dark-card-button">Download</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>🏘️ Neighborly</h3>
            <p><strong>Tech Stack:</strong> Frontend: Next.js 14 with TypeScript, React, Tailwind CSS</p>
            <p>Backend: Next.js API routes with NextAuth.js authentication</p>
            <p>Database: PostgreSQL with Prisma ORM</p>
            <p>Deployment: Docker (multi-architecture) with CI/CD pipeline</p>
            <p>Additional: React Hot Toast, MailerLite email service, image optimization with Sharp</p>
            <p>A community-focused web application designed for skill bartering and local tool sharing among friends and nearby communities. This project aims to strengthen neighborhood connections by enabling people to share resources and expertise. The application features user authentication, friend connections, messaging, tool/skill management, reservations, and location-based community discovery. It's deployed via Docker containers with PostgreSQL database backend and includes comprehensive admin functionality for community management.</p>
            <div className="project-links">
              <a href="https://neighborly-community.com" target="_blank" rel="noopener noreferrer" className="dark-card-button">Visit App</a>
              <a href="https://github.com/gwaihirf22/Neighborly" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>⚡ Atomic Momentum</h3>
            <p><strong>Tech Stack:</strong> HTML, CSS, JavaScript</p>
            <p>A lightweight, offline-first habit tracker application focused on building daily momentum through small wins. The app emphasizes the power of atomic habits and consistent daily progress.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/atomic-momentum" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>🦁 Lion Tails</h3>
            <p><strong>Tech Stack:</strong> TypeScript, React, Express, Postgres, Drizzle, Tailwind, OpenAI API, Docker</p>
            <p>Christian bedtime stories written around characters you save and reuse, so a child can be the hero of every one. Set a story in a real biblical account or send a character on a Quest with the Timekeeper; illustrate any passage you like, with pictures built from each character&rsquo;s own portrait so they look the same every time. Parent Mode gates the things that should not be one tap from a seven-year-old. Self-hosted on my own server, deployed by GitHub Actions.</p>
            <div className="project-links">
              <a href="https://liontails.paul-blake.com" target="_blank" rel="noopener noreferrer" className="dark-card-button">Visit App</a>
              <a href="/blog/technology/how-to-use-lion-tails" className="dark-card-button">How to Use It</a>
              <a href="https://github.com/gwaihirf22/lion-tails" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>📄 Multilingual PDF-TXT Converter</h3>
            <p><strong>Tech Stack:</strong> Python</p>
            <p>A versatile document conversion tool that supports multiple languages for converting PDF files to plain text format. Useful for text extraction and document processing workflows.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/multilingual-pdf-txt-converter" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>🌐 Personal Website</h3>
            <p><strong>Tech Stack:</strong> Next.js, React, MDX, Docker</p>
            <p>This very website! A modern blog and portfolio built with Next.js featuring a dedicated theology section, automated CI/CD deployment to Unraid server, and Docker containerization.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/paul-blake-website" target="_blank" rel="noopener noreferrer" className="dark-card-button">View on GitHub</a>
            </div>
          </div>

          <div className="dark-card">
            <h3>🎓 CS50 Coding Projects</h3>
            <p><strong>Tech Stack:</strong> C, Python, Web Development</p>
            <p>A collection of projects and exercises from Harvard&apos;s CS50 course, spanning fundamental computer science concepts across multiple languages. Course completed and certificate earned — and the final project grew into Loom, the AoE2 build-order assistant featured above.</p>
          </div>

          <h2>Works in Progress</h2>
          
          <div className="dark-card-secondary">
            <h3>🖥️ Linux Server Maintenance & Automation</h3>
            <p><strong>Tech Stack:</strong> Docker, Shell Scripts, System Administration</p>
            <p>A collection of scripts and tools for maintaining and automating tasks on Linux servers. Includes backup automation, system monitoring, and deployment workflows.</p>
            <p><em>Status: Active Development</em></p>
          </div>

          <div className="dark-card-secondary">
            <h3>📚 Book on Bezalel and Ohliab</h3>
            <p><strong>Focus:</strong> Biblical Studies, Theology, Craftsmanship</p>
            <p>A theological work exploring the biblical figures of Bezalel and Ohliab - the master craftsmen chosen by God to build the Tabernacle. Examining the intersection of faith, creativity, and skilled work.</p>
            <p><em>Status: Research & Writing Phase</em></p>
          </div>

          <h2>Games</h2>
          
          <div className="dark-card games-card">
            <h3>🚁 Helicopter Game</h3>
            <p><strong>Genre:</strong> Arcade / Endless Runner</p>
            <p><strong>Controls:</strong> One-click control - Hold to ascend, release to descend</p>
            <p><strong>Tech Stack:</strong> HTML5 Canvas, JavaScript, React Hooks</p>
            <p>Navigate your helicopter through challenging obstacles in this addictive arcade-style game. Features physics-based movement, procedurally generated obstacles, particle effects, and high score tracking. Optimized for both desktop and mobile devices.</p>
            <div className="project-links">
              <Link href="/projects/games/helicopter" className="dark-card-button play-button">Play Game</Link>
              <Link href="/projects/games" className="dark-card-button">View All Games</Link>
            </div>
          </div>
        </div>

        <div className="dark-card">
          <h2>Development Philosophy</h2>
          <p>I believe in building software that serves people and strengthens communities. Whether it's creating tools for local collaboration, developing systems for personal growth, or exploring the intersection of technology and faith, my projects aim to have a positive impact.</p>
          
          <p>Each project is an opportunity to learn something new, solve real problems, and contribute to the open-source community. I'm passionate about clean code, thoughtful design, and creating solutions that are both technically sound and meaningful.</p>
        </div>

        <p>
          <Link href="/">← Back to home</Link> | <Link href="/blog">Visit my blog</Link>
        </p>
      </div>

      <style jsx>{`
        .external-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .projects-grid {
          margin: 2rem 0;
        }
        
        .project-links {
          margin-top: 1rem;
        }
        
        .games-card {
          position: relative;
          border-left: 4px solid #ff6b35;
          background: linear-gradient(135deg, var(--card-bg-primary), rgba(255, 107, 53, 0.05));
        }
        
        .games-card h3 {
          color: #ff6b35;
        }
        
        .play-button {
          background: linear-gradient(135deg, #ff6b35, #f7931e) !important;
          color: var(--color-background) !important;
          font-weight: 700 !important;
          box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3) !important;
        }
        
        .play-button:hover {
          background: linear-gradient(135deg, #f7931e, #ff6b35) !important;
          color: var(--color-background) !important;
          transform: translateY(-3px) !important;
          box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4) !important;
        }
        
        @media (min-width: 768px) {
          .external-links {
            flex-direction: row;
            gap: 2rem;
          }
        }
      `}</style>
    </>
  );
} 