import React from 'react';
import PropTypes from 'prop-types';

export function Image({ src, alt, caption }) {
  return (
    <figure style={{
      margin: '2rem 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    }}>
      <img 
        src={src} 
        alt={alt} 
        style={{
          width: '100%',
          maxWidth: '32rem',
          borderRadius: '8px',
          border: '1px solid var(--color-border)',
          backgroundColor: 'var(--color-card-background)',
          padding: '0.25rem',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }} 
      />
      {caption && (
        <figcaption style={{
          marginTop: '0.5rem',
          textAlign: 'center',
          fontSize: '0.875rem',
          color: 'var(--color-text-secondary)'
        }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  caption: PropTypes.string,
};