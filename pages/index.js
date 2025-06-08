import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Paul Blake - Developer & Writer</title>
        <meta name="description" content="Personal website of Paul Blake - Full-stack developer, writer, and technology enthusiast. Former aircraft mechanic turned software developer sharing insights into the world of code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Paul Blake: Software Developer/Engineer</h1>
            <p className="hero-tagline">
              Crafting robust solutions and sharing insights into the world of code.
            </p>
            <div className="hero-cta">
              <Link href="/blog" className="btn">
                Read My Blog
              </Link>
              <Link href="/projects" className="btn btn-secondary">
                Explore My Work
              </Link>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="about">
          <h2>About Me</h2>
          <div className="about-content">
            <p>
              I'm a passionate software developer with a unique background that bridges hands-on mechanical expertise 
              with modern technology. Starting my career as an aircraft mechanic, I developed a deep appreciation 
              for precision, systematic problem-solving, and the critical importance of reliable systems.
            </p>
            <p>
              This foundation has been invaluable in my transition to computer science and software development. 
              I bring the same meticulous attention to detail and systematic approach to building robust, 
              scalable applications. Whether I'm debugging complex code or architecting new solutions, 
              I apply the same principles that kept aircraft safely in the sky.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section className="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>JavaScript & React</h3>
              <p>Building modern, interactive web applications with React, Next.js, and the latest JavaScript features.</p>
            </div>
            <div className="skill-card">
              <h3>Backend Development</h3>
              <p>Creating robust APIs and server-side applications with Node.js, databases, and cloud technologies.</p>
            </div>
            <div className="skill-card">
              <h3>DevOps & Deployment</h3>
              <p>Containerization with Docker, CI/CD pipelines, and deployment strategies for reliable software delivery.</p>
            </div>
            <div className="skill-card">
              <h3>System Administration</h3>
              <p>Linux server management, networking, and infrastructure optimization from my mechanical background.</p>
            </div>
            <div className="skill-card">
              <h3>Problem Solving</h3>
              <p>Systematic debugging and troubleshooting approach developed through aircraft maintenance experience.</p>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="projects">
          <h2>Featured Projects</h2>
          <div className="projects-content">
            <div className="dark-card">
              <h3>🏘️ Neighborly</h3>
              <p>Community-focused web application for skill bartering and local tool sharing</p>
            </div>
            <div className="dark-card">
              <h3>⚡ Atomic Momentum</h3>
              <p>Lightweight habit tracker focused on building daily momentum through small wins</p>
            </div>
            <div className="dark-card">
              <h3>🌐 This Website</h3>
              <p>Next.js blog with theology section, Docker deployment, and automated CI/CD</p>
            </div>
            <Link href="/projects" className="btn">
              View All Projects
            </Link>
          </div>
        </section>

        {/* Blog CTA Section */}
        <section className="blog-cta">
          <h2>Latest Insights</h2>
          <div className="blog-content">
            <p>
              I regularly write about my journey in software development, sharing lessons learned from my unique journey 
              from aircraft maintenance to coding. Explore articles on JavaScript, React, system design, 
              and the parallels between mechanical and software engineering. I also write about my journey in Christian faith, theology, and philosophy.
            </p>
            <Link href="/blog" className="btn">
              Visit the Blog
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        main {
          padding: 2rem 0;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 4rem 0 6rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%);
          border-radius: 12px;
          margin-bottom: 4rem;
        }

        .hero-content h1 {
          margin-bottom: 1.5rem;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-tagline {
          font-size: 1.3rem;
          color: var(--color-text-secondary);
          margin-bottom: 2.5rem;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        /* About Section */
        .about {
          margin-bottom: 4rem;
        }

        .about-content {
          max-width: 800px;
        }

        .about-content p {
          font-size: 1.1rem;
          line-height: 1.7;
        }

        /* Skills Section */
        .skills {
          margin-bottom: 4rem;
        }

        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }

        .skill-card {
          background-color: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 2rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .skill-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .skill-card h3 {
          color: var(--color-accent);
          margin-top: 0;
          margin-bottom: 1rem;
          font-size: 1.3rem;
        }

        .skill-card p {
          color: var(--color-text-secondary);
          margin-bottom: 0;
          font-size: 1rem;
        }

        /* Projects Section */
        .projects {
          margin-bottom: 4rem;
        }

        .projects-content {
          padding: 3rem 2rem;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
        }

        .projects-content .btn {
          margin-top: 2rem;
          display: inline-block;
        }

        /* Blog CTA Section */
        .blog-cta {
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.05) 0%, rgba(107, 70, 193, 0.05) 100%);
          border: 1px solid var(--color-border);
          border-radius: 12px;
          padding: 3rem 2rem;
          text-align: center;
        }

        .blog-content p {
          max-width: 700px;
          margin: 0 auto 2rem;
          font-size: 1.1rem;
          line-height: 1.7;
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .hero {
            padding: 3rem 0 4rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-tagline {
            font-size: 1.1rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: center;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .projects-content,
          .blog-cta {
            padding: 2rem 1rem;
          }
        }
      `}</style>
    </>
  );
}
