import { useState } from 'react';

export default function SubscriptionForm({ categories = ['all'], compact = false }) {
  const [email, setEmail] = useState('');
  const [selectedCategories, setSelectedCategories] = useState(categories);
  const [status, setStatus] = useState('idle'); // idle, loading, success, error
  const [message, setMessage] = useState('');

  const categoryOptions = [
    { value: 'all', label: 'All Posts', description: 'Get notified for all blog posts' },
    { value: 'blog', label: 'Technology & Development', description: 'General blog posts about development and tech' },
    { value: 'theology', label: 'Theology & Faith', description: 'Posts about theology and faith-related topics' }
  ];

  const handleCategoryChange = (categoryValue) => {
    if (categoryValue === 'all') {
      setSelectedCategories(['all']);
    } else {
      const newCategories = selectedCategories.includes('all') 
        ? [categoryValue]
        : selectedCategories.includes(categoryValue)
          ? selectedCategories.filter(cat => cat !== categoryValue)
          : [...selectedCategories.filter(cat => cat !== 'all'), categoryValue];
      
      setSelectedCategories(newCategories.length === 0 ? ['all'] : newCategories);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          categories: selectedCategories
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus('success');
        setMessage('Thank you for subscribing! Please check your email for confirmation.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Failed to subscribe. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  };

  if (compact) {
    return (
      <div className="subscription-form-compact">
        <h4>Subscribe to Updates</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              disabled={status === 'loading'}
              required
            />
            <button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? '...' : 'Subscribe'}
            </button>
          </div>
          {message && (
            <p className={`status-message ${status}`}>{message}</p>
          )}
        </form>

        <style jsx>{`
          .subscription-form-compact {
            background: var(--card-bg);
            border: 1px solid var(--card-border);
            border-radius: 8px;
            padding: 1.5rem;
            margin: 2rem 0;
          }

          .subscription-form-compact h4 {
            margin: 0 0 1rem 0;
            color: var(--card-text-primary);
            font-weight: 600;
          }

          .form-row {
            display: flex;
            gap: 0.5rem;
            margin-bottom: 1rem;
          }

          .form-row input {
            flex: 1;
            padding: 0.75rem;
            border: 1px solid var(--card-border);
            border-radius: 4px;
            background: var(--bg-color);
            color: var(--card-text-primary);
            font-size: 0.9rem;
          }

          .form-row input:focus {
            outline: none;
            border-color: var(--card-link-color);
          }

          .form-row button {
            padding: 0.75rem 1.5rem;
            background: var(--card-link-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.9rem;
            font-weight: 500;
            transition: background-color 0.2s;
          }

          .form-row button:hover:not(:disabled) {
            background: var(--card-link-hover);
          }

          .form-row button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }

          .status-message {
            margin: 0;
            font-size: 0.85rem;
            padding: 0.5rem;
            border-radius: 4px;
          }

          .status-message.success {
            background: #d4edda;
            color: #155724;
            border: 1px solid #c3e6cb;
          }

          .status-message.error {
            background: #f8d7da;
            color: #721c24;
            border: 1px solid #f1aeb5;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="subscription-form">
      <h3>Subscribe to Blog Updates</h3>
      <p>Get notified when I publish new posts. Choose the categories you're interested in:</p>
      
      <form onSubmit={handleSubmit}>
        <div className="categories-section">
          {categoryOptions.map((option) => (
            <label key={option.value} className="category-option">
              <input
                type="checkbox"
                checked={selectedCategories.includes(option.value)}
                onChange={() => handleCategoryChange(option.value)}
                disabled={status === 'loading'}
              />
              <div className="category-info">
                <strong>{option.label}</strong>
                <span className="category-description">{option.description}</span>
              </div>
            </label>
          ))}
        </div>

        <div className="email-section">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            disabled={status === 'loading'}
            required
          />
          <button type="submit" disabled={status === 'loading'}>
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
        </div>

        {message && (
          <div className={`status-message ${status}`}>{message}</div>
        )}
      </form>

      <div className="rss-links">
        <p>Prefer RSS? Subscribe to feeds:</p>
        <div className="rss-options">
          <a href="/api/rss/all.xml" target="_blank" rel="noopener noreferrer">All Posts</a>
          <a href="/api/rss/blog.xml" target="_blank" rel="noopener noreferrer">Technology</a>
          <a href="/api/rss/theology.xml" target="_blank" rel="noopener noreferrer">Theology</a>
        </div>
      </div>

      <style jsx>{`
        .subscription-form {
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 2rem;
          margin: 3rem 0;
        }

        .subscription-form h3 {
          margin: 0 0 1rem 0;
          color: var(--card-text-primary);
          font-weight: 600;
        }

        .subscription-form > p {
          color: var(--card-text-secondary);
          margin: 0 0 2rem 0;
          line-height: 1.5;
        }

        .categories-section {
          margin-bottom: 2rem;
        }

        .category-option {
          display: flex;
          align-items: flex-start;
          gap: 0.75rem;
          margin-bottom: 1rem;
          cursor: pointer;
        }

        .category-option input[type="checkbox"] {
          margin-top: 0.125rem;
          width: 1rem;
          height: 1rem;
        }

        .category-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
        }

        .category-info strong {
          color: var(--card-text-primary);
          font-weight: 600;
        }

        .category-description {
          color: var(--card-text-secondary);
          font-size: 0.85rem;
          line-height: 1.4;
        }

        .email-section {
          display: flex;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }

        .email-section input {
          flex: 1;
          padding: 0.875rem;
          border: 1px solid var(--card-border);
          border-radius: 6px;
          background: var(--bg-color);
          color: var(--card-text-primary);
          font-size: 1rem;
        }

        .email-section input:focus {
          outline: none;
          border-color: var(--card-link-color);
          box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
        }

        .email-section button {
          padding: 0.875rem 2rem;
          background: var(--card-link-color);
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 1rem;
          font-weight: 500;
          transition: background-color 0.2s;
        }

        .email-section button:hover:not(:disabled) {
          background: var(--card-link-hover);
        }

        .email-section button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .status-message {
          padding: 1rem;
          border-radius: 6px;
          margin-bottom: 1.5rem;
          font-size: 0.9rem;
        }

        .status-message.success {
          background: #d4edda;
          color: #155724;
          border: 1px solid #c3e6cb;
        }

        .status-message.error {
          background: #f8d7da;
          color: #721c24;
          border: 1px solid #f1aeb5;
        }

        .rss-links {
          border-top: 1px solid var(--card-border);
          margin-top: 1.5rem;
          padding-top: 1.5rem;
        }

        .rss-links p {
          color: var(--card-text-secondary);
          margin: 0 0 0.75rem 0;
          font-size: 0.9rem;
        }

        .rss-options {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .rss-options a {
          color: var(--card-link-color);
          text-decoration: none;
          font-size: 0.85rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid var(--card-border);
          border-radius: 4px;
          transition: all 0.2s;
        }

        .rss-options a:hover {
          background: var(--card-link-color);
          color: white;
          text-decoration: none;
        }

        @media (max-width: 640px) {
          .subscription-form {
            padding: 1.5rem;
          }

          .email-section {
            flex-direction: column;
          }

          .email-section button {
            padding: 0.875rem;
          }
        }
      `}</style>
    </div>
  );
}