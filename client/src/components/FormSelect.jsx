import React from 'react';
import './FormSelect.css';

const FormSelect = ({ 
  label, 
  value, 
  onChange, 
  options = [], 
  placeholder,
  required = false, 
  error,
  ...props 
}) => {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <select
        className={`form-select ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormSelect;
