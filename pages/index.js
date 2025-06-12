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
            <h1>Paul Blake: Software Developer & Engineer</h1>
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
            <div className="about-with-image">
              <div className="profile-image">
                <img src="/beach-profile-pic.jpeg" alt="Paul Blake" />
              </div>
              <div className="about-text">
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
            </div>
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
              <p>Community-focused web application for skill bartering and local tool sharing. Next.js 14, PostgreSQL, Docker, CI/CD, and more.</p>
            </div>
            <div className="dark-card">
              <h3>⚡ Atomic Momentum</h3>
              <p>Lightweight habit tracker focused on building daily momentum through small wins. React, TypeScript, and more.</p>
            </div>
            <div className="dark-card">
              <h3>🦁 Lion Tails</h3>
              <p>AI-powered platform for generating personalized and interactive children's Bible stories with illustrations and narration. React, Next.js, OpenAI API, and more.</p>
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

        {/* Technologies Section */}
        <section className="technologies">
          <h2>Technologies I'm Building With</h2>
          <div className="technologies-grid">
            <div className="technology-card">
              <h3>JavaScript</h3>
              <p>The foundational language for building interactive web experiences.</p>
            </div>
            <div className="technology-card">
              <h3>TypeScript</h3>
              <p>A statically-typed superset of JavaScript that enhances code quality and scalability.</p>
            </div>
            <div className="technology-card">
              <h3>Python</h3>
              <p>A versatile language I've used for scripting and introductory computer science concepts.</p>
            </div>
            <div className="technology-card">
              <h3>C</h3>
              <p>A low-level language that taught me fundamental memory management and system principles.</p>
            </div>
            <div className="technology-card">
              <h3>React</h3>
              <p>A powerful library for building declarative and component-based user interfaces.</p>
            </div>
            <div className="technology-card">
              <h3>Next.js</h3>
              <p>The full-stack React framework I used to build this statically-generated, SEO-friendly website.</p>
            </div>
            <div className="technology-card">
              <h3>HTML & CSS</h3>
              <p>The core technologies for structuring and styling the web.</p>
            </div>
            <div className="technology-card">
              <h3>MDX</h3>
              <p>A powerful format allowing me to write blog posts in Markdown with embedded React components.</p>
            </div>
            <div className="technology-card">
              <h3>Docker</h3>
              <p>Containerizing my applications for consistent, isolated deployment on my Unraid server.</p>
            </div>
            <div className="technology-card">
              <h3>Git & GitHub Actions</h3>
              <p>For version control and building the automated CI/CD pipeline that deploys this site.</p>
            </div>
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
          max-width: 1000px;
        }

        .about-with-image {
          display: flex;
          gap: 3rem;
          align-items: flex-start;
        }

        .profile-image {
          flex-shrink: 0;
        }

        .profile-image img {
          width: 250px;
          height: 250px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .profile-image img:hover {
          transform: scale(1.02);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.4);
        }

        .about-text {
          flex: 1;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 1.5rem;
        }

        /* Technologies Section */
        .technologies {
          margin-bottom: 4rem;
        }

        .technologies-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .technology-card {
          background-color: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 1.25rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .technology-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 188, 212, 0.15);
          border-color: var(--color-accent);
        }

        .technology-card h3 {
          color: var(--color-accent);
          margin-top: 0;
          margin-bottom: 0.75rem;
          font-size: 1.2rem;
          font-weight: 600;
        }

        .technology-card p {
          color: var(--color-text-secondary);
          margin-bottom: 0;
          font-size: 0.95rem;
          line-height: 1.25;
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

          .about-with-image {
            flex-direction: column;
            gap: 2rem;
            align-items: center;
            text-align: center;
          }

          .profile-image img {
            width: 200px;
            height: 200px;
          }

          .technologies-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 1rem;
          }

          .skills-grid {
            grid-template-columns: 1fr;
          }

          .projects-content,
          .blog-cta {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .technologies-grid {
            grid-template-columns: 1fr;
          }

          .technology-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </>
  );
}
