import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';

export function CodeBlock({ children, language, title }) {
  const [copied, setCopied] = useState(false);
  const codeString = String(children).trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      margin: '1.5rem 0',
      borderRadius: '8px',
      border: '1px solid var(--color-border)',
      backgroundColor: '#0d1117',
      color: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    }}>
      {title && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          backgroundColor: '#374151',
          padding: '0.5rem 1rem'
        }}>
          <p style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: '#9ca3af',
            margin: 0,
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            {title}
          </p>
          <button
            onClick={handleCopy}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px'
            }}
          >
            {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
          </button>
        </div>
      )}
      <div style={{ position: 'relative' }}>
        <SyntaxHighlighter
          language={language}
          style={a11yDark}
          customStyle={{
            margin: 0,
            padding: '1rem',
            backgroundColor: 'transparent',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}
          codeTagProps={{ style: { fontSize: '0.875rem' } }}
        >
          {codeString}
        </SyntaxHighlighter>
        {!title && (
          <button
            onClick={handleCopy}
            style={{
              position: 'absolute',
              top: '0.5rem',
              right: '0.5rem',
              background: 'transparent',
              border: 'none',
              color: '#9ca3af',
              cursor: 'pointer',
              padding: '0.25rem',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '24px',
              height: '24px'
            }}
          >
            {copied ? <Check size={14} style={{ color: '#10b981' }} /> : <Copy size={14} />}
          </button>
        )}
      </div>
    </div>
  );
}

CodeBlock.propTypes = {
  children: PropTypes.node.isRequired,
  language: PropTypes.string.isRequired,
  title: PropTypes.string,
};