import Head from "next/head";
import Link from "next/link";
import ProjectCard from "../../../components/ProjectCard";
import { gameProjects } from "../../../data/projects";

export default function Games() {
  return (
    <>
      <Head>
        <title>Games - Paul Blake</title>
        <meta name="description" content="Browser games built with HTML5 Canvas and React. They work on desktop and phone." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <h1>Games</h1>
        <p className="intro">Small browser games built with HTML5 Canvas and React. They work on desktop and on a phone.</p>

        <div className="project-grid">
          {gameProjects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>

        <div className="dark-card-secondary">
          <h3>In the works</h3>
          <p>Pong, a memory maze and a Tetris clone are on the list.</p>
        </div>

        <p>
          <Link href="/projects">← Back to projects</Link> | <Link href="/">Home</Link>
        </p>
      </div>

      <style jsx>{`
        .intro {
          font-size: 1.1rem;
          color: var(--color-text-secondary);
        }

        .project-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
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
