import Head from "next/head";
import Link from "next/link";
import ProjectCard from "../components/ProjectCard";
import SocialLinks from "../components/SocialLinks";
import { projects, experimentProjects } from "../data/projects";
import { site } from "../data/site";

export default function Projects() {
  const withScreenshots = projects.filter((p) => p.image && !p.experiment);
  const more = projects.filter((p) => !p.image && !p.status && !p.experiment);
  const inProgress = projects.filter((p) => p.status && !p.image);

  return (
    <>
      <Head>
        <title>Projects - Paul Blake</title>
        <meta name="description" content="Software projects by Paul Blake: web applications, desktop tools and browser games." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Projects</h1>
        <p className="intro">Things I&apos;ve built, from desktop overlays to community web apps.</p>
        <div className="find-me">
          <SocialLinks />
          <a href={site.dockerHub} target="_blank" rel="noopener noreferrer">Docker Hub</a>
        </div>

        <section>
          <h2>Featured</h2>
          <div className="project-grid">
            {withScreenshots.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        <section>
          <h2>More Projects</h2>
          <div className="project-list">
            {more.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </section>

        <section>
          <h2>Fun with AI Programming</h2>
          <p className="section-note">
            Small projects I had AI write from my prompts, to see what it could do. They are tests, not my own
            work, and are listed here for honesty. I plan to add more as the tools change.
          </p>
          <div className="project-grid">
            {experimentProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
          <p className="games-link">
            <Link href="/projects/games">All games →</Link>
          </p>
        </section>

        <section>
          <h2>In Progress</h2>
          <div className="project-list">
            {inProgress.map((project) => (
              <ProjectCard key={project.slug} project={project} compact />
            ))}
          </div>
        </section>

        <p>
          <Link href="/">← Back to home</Link> | <Link href="/blog">Visit my blog</Link>
        </p>
      </div>

      <style jsx>{`
        .intro {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
        }

        .find-me {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          margin: 1rem 0 2rem;
        }

        .find-me a {
          color: var(--color-text-secondary);
          font-size: 0.9rem;
          text-decoration: none;
        }

        .find-me a:hover {
          color: var(--color-text-primary);
        }

        section {
          margin-bottom: 3rem;
          padding: 0;
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-top: 1.5rem;
        }

        .project-list {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .section-note {
          color: var(--color-text-secondary);
          max-width: 720px;
          margin: 0.5rem 0 0;
        }

        .games-link {
          margin-top: 1.5rem;
          text-align: right;
        }

        @media (max-width: 480px) {
          .project-grid,
          .project-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
