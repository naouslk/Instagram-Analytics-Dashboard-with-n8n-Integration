import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  action?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', title, action }) => {
  return (
    <div className={`bg-white dark:bg-brand-card border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm dark:shadow-xl backdrop-blur-sm transition-all duration-300 ${className}`}>
      {(title || action) && (
        <div className="flex items-center justify-between mb-6">
          {title && <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>}
          {action && <div>{action}</div>}
        </div>
      )}
      {children}
    </div>
  );
};