import React from 'react';
import './FormCheckbox.css';

const FormCheckbox = ({ 
  label, 
  checked, 
  onChange, 
  error, 
  required = false,
  disabled = false 
}) => {
  return (
    <div className="form-group">
      <label className="checkbox-label">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
        />
        <span className="checkbox-custom"></span>
        <span className="checkbox-text">
          {label}
          {required && <span className="required">*</span>}
        </span>
      </label>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormCheckbox;
