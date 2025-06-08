import Head from "next/head";
import Link from "next/link";

export default function Projects() {
  return (
    <>
      <Head>
        <title>Projects - Paul Blake</title>
        <meta name="description" content="Explore my software projects, applications, and development work." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Projects</h1>
        <p>Welcome to my project showcase! Here you'll find a collection of software applications, tools, and experiments I've been working on. From web applications to mobile apps, each project represents a journey of learning and problem-solving.</p>
        
        <div className="profile-links">
          <h2>Find Me Online</h2>
          <div className="external-links">
            <a href="https://github.com/gwaihirf22" target="_blank" rel="noopener noreferrer" className="profile-link">
              <strong>GitHub</strong> - View my source code and contributions
            </a>
            <a href="https://hub.docker.com/repositories/flyingoat03" target="_blank" rel="noopener noreferrer" className="profile-link">
              <strong>Docker Hub</strong> - Check out my containerized applications
            </a>
          </div>
        </div>

        <div className="projects-grid">
          <h2>Featured Projects</h2>
          
          <div className="project-card">
            <h3>🏘️ Neighborly</h3>
            <p><strong>Tech Stack:</strong> TypeScript, Web Development</p>
            <p>A community-focused web application designed for skill bartering and local tool sharing among friends and nearby communities. This project aims to strengthen neighborhood connections by enabling people to share resources and expertise.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/Neighborly" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
          </div>

          <div className="project-card">
            <h3>⚡ Atomic Momentum</h3>
            <p><strong>Tech Stack:</strong> HTML, CSS, JavaScript</p>
            <p>A lightweight, offline-first habit tracker application focused on building daily momentum through small wins. The app emphasizes the power of atomic habits and consistent daily progress.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/atomic-momentum" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
          </div>

          <div className="project-card">
            <h3>📄 Multilingual PDF-TXT Converter</h3>
            <p><strong>Tech Stack:</strong> Python</p>
            <p>A versatile document conversion tool that supports multiple languages for converting PDF files to plain text format. Useful for text extraction and document processing workflows.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/multilingual-pdf-txt-converter" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
          </div>

          <div className="project-card">
            <h3>🌐 Personal Website</h3>
            <p><strong>Tech Stack:</strong> Next.js, React, MDX, Docker</p>
            <p>This very website! A modern blog and portfolio built with Next.js featuring a dedicated theology section, automated CI/CD deployment to Unraid server, and Docker containerization.</p>
            <div className="project-links">
              <a href="https://github.com/gwaihirf22/paul-blake-website" target="_blank" rel="noopener noreferrer">View on GitHub</a>
            </div>
          </div>

          <h2>Works in Progress</h2>
          
          <div className="project-card wip">
            <h3>🖥️ Unraid Maintenance & Automation</h3>
            <p><strong>Tech Stack:</strong> Docker, Shell Scripts, System Administration</p>
            <p>A collection of scripts and tools for maintaining and automating tasks on Unraid servers. Includes backup automation, system monitoring, and deployment workflows.</p>
            <p><em>Status: Active Development</em></p>
          </div>

          <div className="project-card wip">
            <h3>🎓 CS50 Coding Projects</h3>
            <p><strong>Tech Stack:</strong> C, Python, Web Development</p>
            <p>A collection of projects and exercises from Harvard's CS50 course, showcasing fundamental computer science concepts and programming skills across multiple languages.</p>
            <p><em>Status: Learning in Progress</em></p>
          </div>

          <div className="project-card wip">
            <h3>📚 Book on Bezalel and Ohliab</h3>
            <p><strong>Focus:</strong> Biblical Studies, Theology, Craftsmanship</p>
            <p>A theological work exploring the biblical figures of Bezalel and Ohliab - the master craftsmen chosen by God to build the Tabernacle. Examining the intersection of faith, creativity, and skilled work.</p>
            <p><em>Status: Research & Writing Phase</em></p>
          </div>
        </div>

        <div className="philosophy-section">
          <h2>Development Philosophy</h2>
          <p>I believe in building software that serves people and strengthens communities. Whether it's creating tools for local collaboration, developing systems for personal growth, or exploring the intersection of technology and faith, my projects aim to have a positive impact.</p>
          
          <p>Each project is an opportunity to learn something new, solve real problems, and contribute to the open-source community. I'm passionate about clean code, thoughtful design, and creating solutions that are both technically sound and meaningful.</p>
        </div>

        <p>
          <Link href="/">← Back to home</Link> | <Link href="/blog">Visit my blog</Link>
        </p>
      </div>

      <style jsx>{`
        .profile-links {
          margin: 2rem 0;
          padding: 1.5rem;
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .external-links {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .profile-link {
          display: inline-block;
          padding: 0.5rem 0;
          text-decoration: none;
          color: #0066cc;
          border-bottom: 1px solid transparent;
          transition: border-bottom-color 0.2s;
        }
        
        .profile-link:hover {
          border-bottom-color: #0066cc;
        }
        
        .projects-grid {
          margin: 2rem 0;
        }

        .profile-links h2,
        .projects-grid h2 {
          color: #111827;
          font-weight: 600;
        }
        
        .project-card {
          margin: 1.5rem 0;
          padding: 1.5rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background-color: #ffffff;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .project-card.wip {
          background-color: #fffbeb;
          border-color: #f59e0b;
          box-shadow: 0 1px 3px rgba(245, 158, 11, 0.1);
        }
        
        .project-card h3 {
          margin: 0 0 0.5rem 0;
          color: #111827;
          font-weight: 600;
        }
        
        .project-card p {
          margin: 0.5rem 0;
          line-height: 1.6;
          color: #374151;
        }
        
        .project-links {
          margin-top: 1rem;
        }
        
        .project-links a {
          display: inline-block;
          padding: 0.5rem 1rem;
          background-color: #0066cc;
          color: white;
          text-decoration: none;
          border-radius: 4px;
          font-size: 0.9rem;
          transition: background-color 0.2s;
        }
        
        .project-links a:hover {
          background-color: #0052a3;
        }
        
        .philosophy-section {
          margin: 3rem 0;
          padding: 2rem;
          background-color: #ffffff;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          border-left: 4px solid #0066cc;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        
        .philosophy-section h2 {
          margin-top: 0;
          color: #111827;
          font-weight: 600;
        }
        
        .philosophy-section p {
          line-height: 1.7;
          color: #374151;
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