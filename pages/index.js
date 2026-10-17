import fs from "fs";
import path from "path";
import Head from "next/head";
import Link from "next/link";
import { Download } from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import TechStack from "../components/TechStack";
import SocialLinks from "../components/SocialLinks";
import { featuredProjects } from "../data/projects";
import { site, resumePath } from "../data/site";

export async function getStaticProps() {
  const hasResume = fs.existsSync(path.join(process.cwd(), "public", site.resumeFile));
  return { props: { hasResume } };
}

export default function Home({ hasResume }) {
  return (
    <>
      <Head>
        <title>Paul Blake - Developer & Writer</title>
        <meta name="description" content="Personal website of Paul Blake - Full-stack developer, writer, and technology enthusiast. Former aircraft mechanic turned software developer sharing insights into the world of code." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>Paul Blake: Software Developer & Engineer</h1>
            <p className="hero-tagline">
              Software developer. Former aircraft mechanic. I build web apps, desktop tools and the server they run on.
            </p>
            <div className="hero-cta">
              <Link href="/projects" className="btn">
                Explore My Work
              </Link>
              {hasResume && (
                <a href={resumePath} download className="btn btn-secondary btn-icon">
                  <Download size={16} aria-hidden="true" />
                  Resume
                </a>
              )}
            </div>
            <div className="hero-social">
              <SocialLinks />
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="about">
          <h2>About Me</h2>
          <div className="about-with-image">
            <div className="profile-image">
              <img src="/beach-profile-pic.jpeg" alt="Paul Blake" />
            </div>
            <div className="about-text">
              <p>
                I spent years as an aircraft mechanic before moving into software, and I brought the habits with me:
                exact documentation, methodical root-cause debugging, and calm when something critical is down.
                Today I build full-stack web apps in TypeScript and React, desktop tools in Python, and the
                self-hosted infrastructure that runs them. <Link href="/about">More about me</Link>
              </p>
            </div>
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="tech-stack">
          <h2>Tech Stack</h2>
          <TechStack />
        </section>

        {/* Projects Section */}
        <section className="projects">
          <h2>Featured Projects</h2>
          <div className="project-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <div className="projects-more">
            <Link href="/projects" className="btn btn-secondary">
              All Projects
            </Link>
          </div>
        </section>

        {/* Blog CTA Section */}
        <section className="blog-cta">
          <h2>Latest Insights</h2>
          <div className="blog-content">
            <p>
              I write about software, the lessons that carried over from aircraft maintenance, and Christian faith and theology.
            </p>
            <Link href="/blog" className="btn">
              Visit the Blog
            </Link>
          </div>
        </section>
      </main>

      <style jsx>{`
        main {
          padding: 0 0 2rem;
        }

        /* Hero Section */
        .hero {
          text-align: center;
          padding: 2.5rem 1rem 2.75rem;
          background: linear-gradient(135deg, rgba(0, 188, 212, 0.1) 0%, rgba(107, 70, 193, 0.1) 100%);
          border-radius: 12px;
          margin-bottom: 2.5rem;
        }

        .hero-content h1 {
          margin-top: 0;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--color-text-primary) 0%, var(--color-accent) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-tagline {
          font-size: 1.3rem;
          color: var(--color-text-secondary);
          margin-bottom: 1.75rem;
          max-width: 640px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          flex-wrap: wrap;
        }

        .hero-social {
          display: flex;
          justify-content: center;
          margin-top: 1.25rem;
        }

        /* About Section */
        .about {
          margin-bottom: 4rem;
        }

        .about-with-image {
          display: flex;
          gap: 3rem;
          align-items: center;
          max-width: 1000px;
        }

        .profile-image {
          flex-shrink: 0;
        }

        .profile-image img {
          width: 220px;
          height: 220px;
          object-fit: cover;
          border-radius: 12px;
          box-shadow: 0 10px 30px var(--color-shadow);
        }

        .about-text {
          flex: 1;
        }

        .about-text p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin: 0;
        }

        /* Tech Stack Section */
        .tech-stack {
          margin-bottom: 4rem;
        }

        .tech-stack h2 {
          text-align: center;
          margin-bottom: 2rem;
        }

        /* Projects Section */
        .projects {
          margin-bottom: 4rem;
        }

        /* Two columns at desktop so four featured cards sit 2x2 */
        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(min(100%, 400px), 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .projects-more {
          text-align: center;
          margin-top: 2rem;
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
            padding: 2rem 1rem 2.25rem;
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

          .blog-cta {
            padding: 2rem 1rem;
          }
        }

        @media (max-width: 480px) {
          .project-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
