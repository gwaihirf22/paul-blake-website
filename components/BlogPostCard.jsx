import Link from 'next/link';
import PropTypes from 'prop-types';

export default function BlogPostCard({ slug, title, date, category, thumbnail = null, basePath }) {
  const categoryColors = {
    technology: {
      bg: 'rgba(59, 130, 246, 0.15)',
      color: '#60a5fa',
      border: 'rgba(59, 130, 246, 0.3)',
    },
    theology: {
      bg: 'rgba(147, 51, 234, 0.15)',
      color: '#a78bfa',
      border: 'rgba(147, 51, 234, 0.3)',
    },
  };

  const categoryStyle = categoryColors[category] || categoryColors.technology;
  const categoryLabel = category === 'theology' ? 'Theology & Faith' : 'Technology & Development';

  return (
    <Link href={`${basePath}/${slug}`}>
      <div className="dark-card post-card-container">
        <div className="category-badge" style={{
          backgroundColor: categoryStyle.bg,
          color: categoryStyle.color,
          border: `1px solid ${categoryStyle.border}`,
        }}>
          {categoryLabel}
        </div>

        <div className="post-card-content-wrapper">
          {thumbnail && (
            <img
              src={thumbnail}
              alt={title}
              className="post-card-thumbnail"
              loading="lazy"
            />
          )}

          <div className="post-card-content">
            <h3>{title}</h3>
            <p className="post-date" suppressHydrationWarning>
              Published: {date}
            </p>
          </div>
        </div>

        <style jsx>{`
          .post-card-container {
            cursor: pointer;
            display: flex;
            flex-direction: column;
          }

          .category-badge {
            display: inline-block;
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 0.75rem;
            width: fit-content;
          }

          .post-card-content-wrapper {
            display: flex;
            gap: 1.5rem;
            align-items: flex-start;
          }

          .post-card-thumbnail {
            width: 120px;
            height: 120px;
            object-fit: cover;
            border-radius: 8px;
            border: 1px solid var(--color-border, #334155);
            flex-shrink: 0;
          }

          .post-card-content {
            flex: 1;
            min-width: 0;
          }

          .post-card-content h3 {
            margin: 0 0 0.5rem 0;
            color: var(--card-text-primary, #f9fafb);
            font-weight: 600;
          }

          .post-date {
            color: var(--card-text-secondary, #d1d5db);
            margin: 0.5rem 0 0 0;
            font-size: 0.9rem;
          }

          /* Mobile layout */
          @media (max-width: 768px) {
            .post-card-content-wrapper {
              flex-direction: column;
              gap: 1rem;
            }

            .post-card-thumbnail {
              width: 100%;
              height: auto;
              aspect-ratio: 16 / 9;
              max-width: 100%;
            }
          }
        `}</style>
      </div>
    </Link>
  );
}

BlogPostCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  category: PropTypes.oneOf(['technology', 'theology']).isRequired,
  thumbnail: PropTypes.string,
  basePath: PropTypes.string.isRequired,
};
