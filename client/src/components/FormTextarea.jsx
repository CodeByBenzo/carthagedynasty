import React from 'react';
import './FormTextarea.css';

const FormTextarea = ({ 
  label, 
  value, 
  onChange, 
  placeholder, 
  required = false, 
  error,
  rows = 4,
  maxLength,
  ...props 
}) => {
  const charCount = value ? value.length : 0;
  const remainingChars = maxLength ? maxLength - charCount : null;

  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}
          {required && <span className="required">*</span>}
        </label>
      )}
      <textarea
        className={`form-textarea ${error ? 'error' : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        maxLength={maxLength}
        {...props}
      />
      {maxLength && (
        <div className="char-count">
          <span className={remainingChars < 50 ? 'char-count-warning' : ''}>
            {charCount}/{maxLength} characters
          </span>
        </div>
      )}
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default FormTextarea;
