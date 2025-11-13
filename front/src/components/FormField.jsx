import React from 'react';
import { Form, Col } from 'react-bootstrap';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  required = false,
  placeholder = '',
  as = 'input',
  rows,
  options = [],
  col = 12,
  disabled = false,
  ...props
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  const inputProps = {
    type,
    name,
    value,
    onChange: handleChange,
    placeholder,
    disabled,
    isInvalid: !!error,
    required,
    ...props
  };

  if (as === 'textarea') {
    inputProps.as = 'textarea';
    inputProps.rows = rows || 3;
  }

  if (as === 'select') {
    inputProps.as = 'select';
  }

  return (
    <Form.Group as={Col} md={col} className="mb-3">
      <Form.Label>
        {label}
        {required && <span className="text-danger"> *</span>}
      </Form.Label>

      {as === 'select' ? (
        <Form.Select {...inputProps}>
          <option value="">{placeholder || `Selecione ${label.toLowerCase()}`}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Form.Select>
      ) : (
        <Form.Control {...inputProps} />
      )}

      <Form.Control.Feedback type="invalid">
        {error}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;
