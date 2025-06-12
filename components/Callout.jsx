import React from 'react';
import PropTypes from 'prop-types';
import { Info, AlertTriangle } from 'lucide-react';

const calloutConfig = {
  info: {
    icon: <Info size={20} style={{ color: 'var(--color-accent)' }} />,
    backgroundColor: 'rgba(0, 188, 212, 0.1)',
    borderColor: 'var(--color-accent)',
    textColor: 'var(--color-text-primary)'
  },
  warning: {
    icon: <AlertTriangle size={20} style={{ color: '#f97316' }} />,
    backgroundColor: 'rgba(249, 115, 22, 0.1)',
    borderColor: '#f97316',
    textColor: '#ea580c'
  },
};

export function Callout({ children, type = 'info' }) {
  const config = calloutConfig[type];

  return (
    <div style={{
      backgroundColor: config.backgroundColor,
      borderLeft: `4px solid ${config.borderColor}`,
      color: config.textColor,
      margin: '1.5rem 0',
      padding: '1rem',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'flex-start',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ 
        flexShrink: 0,
        marginRight: '0.75rem'
      }}>
        {config.icon}
      </div>
      <div style={{ 
        flex: 1,
        maxWidth: 'none'
      }}>
        {children}
      </div>
    </div>
  );
}

Callout.propTypes = {
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['info', 'warning']),
};