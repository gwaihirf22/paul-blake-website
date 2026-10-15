import Link from "next/link";
import { Globe, Download, Gamepad2, BookOpen } from "lucide-react";
import { TECH } from "../data/techStack";

function GitHubMark({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// Button order: the primary action first, then source.
const BUTTONS = [
  { key: "website", label: "Website", Icon: Globe, variant: "solid" },
  { key: "play", label: "Play", Icon: Gamepad2, variant: "solid" },
  { key: "download", label: "Download", Icon: Download, variant: "solid" },
  { key: "source", label: "Source", Icon: GitHubMark, variant: "outline" },
  { key: "guide", label: "Guide", Icon: BookOpen, variant: "ghost" },
];

function ActionLink({ href, className, children }) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
}

export default function ProjectCard({ project, compact = false }) {
  const { title, blurb, image, imageAlt, tech = [], links = {}, status } = project;
  const buttons = BUTTONS.filter((b) => links[b.key]);
  const chips = tech.map((key) => ({ key, ...TECH[key] })).filter((t) => t.name);

  return (
    <article className={`project-card ${compact ? "compact" : ""}`}>
      {!compact && image && (
        <div className="project-card-media">
          <img src={image} alt={imageAlt || title} loading="lazy" />
        </div>
      )}
      <div className="project-card-body">
        <h3 className="project-card-title">
          {title}
          {status && <span className="project-card-status">{status}</span>}
        </h3>
        <p className="project-card-blurb">{blurb}</p>
        {chips.length > 0 && (
          <ul className="tech-chips" aria-label="Built with">
            {chips.map((t) => (
              <li className="tech-chip" key={t.key}>
                {t.icon && <img src={t.icon} alt="" className={t.mono ? "mono" : ""} loading="lazy" />}
                {t.name}
              </li>
            ))}
          </ul>
        )}
      </div>
      {buttons.length > 0 && (
        <div className="project-card-actions">
          {buttons.map(({ key, label, Icon, variant }) => (
            <ActionLink key={key} href={links[key]} className={`pbtn pbtn-${variant}`}>
              <Icon size={16} aria-hidden="true" />
              {label}
            </ActionLink>
          ))}
        </div>
      )}

      <style jsx>{`
        .project-card {
          display: flex;
          flex-direction: column;
          min-width: 0;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          overflow: hidden;
          transition: border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease;
        }

        .project-card:hover {
          border-color: var(--color-accent);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
        }

        .project-card.compact:hover {
          transform: none;
          box-shadow: none;
        }

        .project-card-media {
          aspect-ratio: 16 / 10;
          overflow: hidden;
          border-bottom: 1px solid var(--color-border);
          background-color: var(--color-background);
        }

        .project-card-media img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        .project-card-body {
          flex: 1 1 auto;
          padding: 1rem 1.25rem 0.75rem;
        }

        .project-card-title {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0 0 0.35rem;
          font-size: 1.125rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .project-card-status {
          font-size: 0.7rem;
          font-weight: 500;
          letter-spacing: 0.3px;
          padding: 0.1rem 0.5rem;
          border-radius: 999px;
          border: 1px solid var(--color-border);
          color: var(--color-text-secondary);
        }

        .project-card-blurb {
          margin: 0 0 0.75rem;
          font-size: 0.9rem;
          line-height: 1.5;
          color: var(--color-text-secondary);
        }

        .project-card:not(.compact) .project-card-blurb {
          min-height: 2.7em;
        }

        .tech-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 0.4rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .tech-chip {
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 0.3rem;
          height: 1.5rem;
          padding: 0 0.55rem;
          border-radius: 6px;
          background-color: var(--color-background);
          border: 1px solid var(--color-border);
          font-size: 0.75rem;
          color: var(--color-text-primary);
          white-space: nowrap;
        }

        .tech-chip img {
          width: 14px;
          height: 14px;
        }

        .tech-chip img.mono {
          filter: invert(1);
        }

        .project-card-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-top: auto;
          padding: 0.25rem 1.25rem 1rem;
        }

        .project-card :global(.pbtn) {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          height: 2rem;
          padding: 0 0.8rem;
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          white-space: nowrap;
          transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease;
        }

        .project-card :global(.pbtn-solid) {
          background-color: var(--color-accent);
          color: var(--color-background);
        }

        .project-card :global(.pbtn-solid:hover) {
          background-color: var(--color-hover);
          color: var(--color-background);
        }

        .project-card :global(.pbtn-outline) {
          background-color: transparent;
          border: 1px solid var(--color-border);
          color: var(--color-text-primary);
        }

        .project-card :global(.pbtn-outline:hover) {
          border-color: var(--color-accent);
          color: var(--color-text-primary);
        }

        .project-card :global(.pbtn-ghost) {
          background-color: transparent;
          color: var(--color-text-secondary);
        }

        .project-card :global(.pbtn-ghost:hover) {
          color: var(--color-text-primary);
        }

        /* Compact rows for projects without a screenshot */
        .project-card.compact .project-card-body {
          padding: 0.9rem 1.25rem 0.5rem;
        }

        .project-card.compact .project-card-actions {
          padding: 0 1.25rem 0.9rem;
        }
      `}</style>
    </article>
  );
}
