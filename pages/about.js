import Head from "next/head";
import Link from "next/link";

export default function About() {
  return (
    <>
      <Head>
        <title>About - Paul Blake</title>
        <meta name="description" content="Learn more about Paul Blake's journey from aircraft mechanic to software developer, and his passion for technology, faith, and community." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>About Paul Blake</h1>
        
        <div className="dark-profile-section">
          <p>Welcome! I'm Paul, a software developer with a passion for building meaningful technology solutions and exploring the intersection of faith, philosophy, and code.</p>
        </div>

        <section className="journey">
          <h2>My Journey</h2>
          
          <div className="career-section">
            <h3>🔧 From Aircraft Mechanic to Software Engineer</h3>
            <p>
              My career began in the highly regulated world of aircraft maintenance, where precision isn't just important—it's literally a matter of life and death. Working on complex aircraft systems taught me invaluable lessons about:
            </p>
            <ul>
              <li><strong>Systematic problem-solving:</strong> Breaking down complex issues into manageable components</li>
              <li><strong>Attention to detail:</strong> Understanding that small oversights can have major consequences</li>
              <li><strong>Documentation and processes:</strong> Following precise procedures and maintaining detailed records</li>
              <li><strong>Safety-first mindset:</strong> Always considering the broader impact of technical decisions</li>
            </ul>
            
            <p>
              These principles have proven incredibly valuable in software development. The same systematic approach that kept aircraft safely airborne now helps me debug complex applications and architect reliable systems.
            </p>
          </div>

          <div className="transition-section">
            <h3>💻 The Transition to Technology</h3>
            <p>
              My fascination with technology and problem-solving naturally led me toward software development. What started as a personal interest in understanding how systems work evolved into a passion for building them.
            </p>
            <p>
              I discovered that many of the skills from my mechanical background—logical thinking, troubleshooting, working with complex systems—translated beautifully to the world of code. The main difference? Software problems rarely require getting your hands dirty with grease!
            </p>
          </div>
        </section>

        <section className="values">
          <h2>What Drives Me</h2>
          
          <div className="dark-card">
            <h3>🏘️ Community-Focused Development</h3>
            <p>
              I believe technology should strengthen communities rather than isolate us. Projects like Neighborly reflect my commitment to building tools that help people connect and share resources locally.
            </p>
          </div>

          <div className="dark-card">
            <h3>⚡ Incremental Progress</h3>
            <p>
              Whether it's through my Atomic Momentum habit tracker or my approach to learning new technologies, I'm passionate about the power of small, consistent improvements over time.
            </p>
          </div>

          <div className="dark-card">
            <h3>🎯 Purpose-Driven Technology</h3>
            <p>
              Every line of code should serve a purpose. I strive to build solutions that solve real problems and have a positive impact on people's lives.
            </p>
          </div>

          <div className="dark-card">
            <h3>📚 Faith and Philosophy</h3>
            <p>
              My Christian faith deeply influences how I approach both technology and life. I'm particularly interested in exploring how biblical principles can inform our approach to craftsmanship, work, and innovation.
            </p>
          </div>
        </section>

        <section className="current-focus">
          <h2>Current Focus</h2>
          <p>
            These days, you'll find me working on a variety of projects that span from practical web applications to theological writing. I'm particularly excited about:
          </p>
          <ul>
            <li>Building community-focused applications that strengthen local connections</li>
            <li>Exploring modern web technologies like Next.js and React</li>
            <li>Developing robust CI/CD pipelines and deployment strategies</li>
            <li>Writing about the intersection of faith, technology, and philosophy</li>
            <li>Contributing to open-source projects that align with my values</li>
          </ul>
        </section>

        <section className="connect">
          <h2>Let's Connect</h2>
          <p>
            I'm always interested in connecting with fellow developers, theologians, and anyone passionate about using technology for good. Whether you want to discuss a project, share ideas about faith and technology, or just chat about the journey from mechanical to digital, I'd love to hear from you.
          </p>
          
          <div className="connect-links">
            <p>Find me on:</p>
            <ul>
              <li><a href="https://github.com/gwaihirf22" target="_blank" rel="noopener noreferrer">GitHub</a> - Check out my code</li>
              <li><a href="https://hub.docker.com/repositories/flyingoat03" target="_blank" rel="noopener noreferrer">Docker Hub</a> - My containerized applications</li>
              <li><Link href="/blog">My Blog</Link> - Thoughts on development and faith</li>
              <li><Link href="/projects">My Projects</Link> - See what I'm building</li>
            </ul>
          </div>
        </section>

        <div className="navigation">
          <p>
            <Link href="/">← Back to home</Link> | <Link href="/blog">Visit my blog</Link> | <Link href="/projects">View my projects</Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        .journey, .values, .current-focus, .connect {
          margin: 2.5rem 0;
        }

        .career-section, .transition-section {
          margin: 2rem 0;
        }

        .career-section h3, .transition-section h3 {
          color: var(--card-text-primary);
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .career-section ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .career-section li {
          margin: 0.5rem 0;
          color: var(--card-text-secondary);
        }

        .current-focus ul, .connect-links ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .current-focus li, .connect-links li {
          margin: 0.5rem 0;
          color: var(--card-text-secondary);
        }

        .connect-links {
          margin-top: 1.5rem;
        }

        .navigation {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid var(--card-border-primary);
        }

        .navigation a {
          color: var(--card-link-color);
          text-decoration: none;
          margin-right: 1rem;
        }

        .navigation a:hover {
          color: var(--card-link-hover);
          text-decoration: underline;
        }

        p {
          line-height: 1.6;
          margin: 1rem 0;
          color: var(--card-text-secondary);
        }

        h1, h2 {
          color: var(--card-text-primary);
          margin: 2rem 0 1rem 0;
          font-weight: 600;
        }

        h2 {
          border-bottom: 2px solid var(--card-link-color);
          padding-bottom: 0.5rem;
        }

        h3 {
          color: var(--card-text-primary);
          margin: 1.5rem 0 0.5rem 0;
          font-weight: 600;
        }
      `}</style>
    </>
  );
} 