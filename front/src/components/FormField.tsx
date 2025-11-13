import React from 'react';
import { FormFieldProps } from '../types';

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  value,
  onChange,
  error,
  required = false,
  type = 'text',
  placeholder,
  as = 'input',
  rows = 3,
  options = [],
  min,
  col = 12,
}) => {
  const inputClasses = `form-control ${error ? 'is-invalid' : ''}`;

  const renderInput = () => {
    switch (as) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            placeholder={placeholder}
            rows={rows}
            required={required}
          />
        );
      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={onChange}
            className={inputClasses}
            required={required}
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      default:
        return (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={inputClasses}
            placeholder={placeholder}
            min={min}
            required={required}
          />
        );
    }
  };

  return (
    <div className={`col-sm-${col} mb-3`}>
      <label htmlFor={name} className="form-label">
        {label}
        {required && <span className="text-danger">*</span>}
      </label>
      {renderInput()}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default FormField;
