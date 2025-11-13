import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({
  size = 'md',
  variant = 'primary',
  text = 'Carregando...',
  className = '',
  inline = false
}) => {
  const sizeClasses = {
    sm: 'spinner-border-sm',
    md: '',
    lg: 'spinner-border-lg'
  };

  const spinner = (
    <Spinner
      animation="border"
      variant={variant}
      className={sizeClasses[size]}
      role="status"
    >
      <span className="visually-hidden">{text}</span>
    </Spinner>
  );

  if (inline) {
    return (
      <span className={`d-inline-flex align-items-center ${className}`}>
        {spinner}
        <span className="ms-2">{text}</span>
      </span>
    );
  }

  return (
    <div className={`d-flex justify-content-center align-items-center ${className}`}>
      {spinner}
      <span className="ms-2">{text}</span>
    </div>
  );
};

export default LoadingSpinner;
