import { TECH, TECH_STACK_GROUPS } from "../data/techStack";

export default function TechStack() {
  return (
    <div className="tech-stack-groups">
      {TECH_STACK_GROUPS.map((group, gi) => (
        <section className="tech-group" key={gi}>
          {group.title && <h3 className="tech-group-title">{group.title}</h3>}
          {group.note && <p className="tech-group-note">{group.note}</p>}
          <div className="tech-grid">
            {group.items.map(({ key, subtitle }) => {
              const tool = TECH[key];
              return (
                <div className="tech-tile" key={key}>
                  <div className="tech-tile-icon">
                    <img src={tool.icon} alt="" className={tool.mono ? "mono" : ""} loading="lazy" />
                  </div>
                  <div className="tech-tile-text">
                    <span className="tech-tile-name">{tool.name}</span>
                    <span className="tech-tile-sub">{subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}

      <style jsx>{`
        .tech-stack-groups {
          max-width: 960px;
          margin: 0 auto;
        }

        .tech-group {
          margin: 0;
          padding: 0;
        }

        .tech-group + .tech-group {
          margin-top: 2rem;
        }

        .tech-group-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--color-text-primary);
          margin: 0 0 0.25rem;
        }

        .tech-group-note {
          font-size: 0.9rem;
          color: var(--color-text-secondary);
          margin: 0 0 1rem;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .tech-tile {
          display: flex;
          align-items: center;
          min-width: 0;
          background-color: var(--color-card-background);
          border: 1px solid var(--color-border);
          border-radius: 10px;
          transition: border-color 0.2s ease, background-color 0.2s ease;
        }

        .tech-tile:hover {
          border-color: var(--color-accent);
        }

        .tech-tile-icon {
          flex-shrink: 0;
          width: 3rem;
          height: 3rem;
          margin: 0.75rem;
          border-radius: 8px;
          background-color: rgba(0, 188, 212, 0.12);
          display: grid;
          place-items: center;
        }

        .tech-tile-icon img {
          width: 2rem;
          height: 2rem;
        }

        :global([data-theme="dark"]) .tech-tile-icon img.mono {
          filter: invert(1);
        }

        .tech-tile-text {
          display: flex;
          flex-direction: column;
          min-width: 0;
          padding: 0.5rem 0.75rem 0.5rem 0;
        }

        .tech-tile-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--color-text-primary);
        }

        .tech-tile-sub {
          font-size: 0.85rem;
          line-height: 1.3;
          color: var(--color-text-secondary);
        }

        @media (min-width: 900px) {
          .tech-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
            gap: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .tech-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
