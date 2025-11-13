import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  text = 'Carregando...',
  className = '',
}) => {
  const sizeClass = size === 'sm' ? 'spinner-border-sm' : size === 'lg' ? 'spinner-border-lg' : '';

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      <div className={`spinner-border ${sizeClass}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      {text && <span className="ms-2">{text}</span>}
    </div>
  );
};

export default LoadingSpinner;
