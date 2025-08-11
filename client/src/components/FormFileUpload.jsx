import React, { useRef } from 'react';
import './FormFileUpload.css';

const FormFileUpload = ({ 
  label, 
  onChange, 
  error, 
  required = false,
  accept = '*/*',
  multiple = false,
  maxFiles = 5,
  maxFileSize = 5 * 1024 * 1024, // 5MB default
  placeholder = 'Choose files...',
  helpText = '',
  disabled = false,
  value = []
}) => {
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files || []);
    
    if (files.length === 0) return;

    // Validate number of files
    if (multiple && files.length > maxFiles) {
      alert(`You can only upload up to ${maxFiles} files`);
      return;
    }

    // Validate file sizes
    const oversizedFiles = files.filter(file => file.size > maxFileSize);
    if (oversizedFiles.length > 0) {
      alert(`Some files are too large. Maximum size is ${(maxFileSize / 1024 / 1024).toFixed(1)}MB`);
      return;
    }

    try {
      const fileData = await Promise.all(
        files.map(async (file) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              resolve({
                name: file.name,
                size: file.size,
                type: file.type,
                data: reader.result // base64 data
              });
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
          });
        })
      );

      // If multiple files, append to existing; otherwise replace
      const newValue = multiple ? [...value, ...fileData] : fileData;
      onChange(newValue);
    } catch (error) {
      console.error('Error reading files:', error);
      alert('Error reading files. Please try again.');
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    const newValue = value.filter((_, i) => i !== index);
    onChange(newValue);
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="form-group">
      <label className="form-label">
        {label}
        {required && <span className="required">*</span>}
      </label>
      
      <div className="file-upload-container">
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
          disabled={disabled}
          className="file-input"
          placeholder={placeholder}
        />
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
          className="file-upload-button"
        >
          <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7,10 12,15 17,10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          {placeholder}
        </button>
      </div>

      {helpText && (
        <div className="file-help-text">{helpText}</div>
      )}

      {value.length > 0 && (
        <div className="file-list">
          {value.map((file, index) => (
            <div key={index} className="file-item">
              <div className="file-info">
                <span className="file-name">{file.name}</span>
                <span className="file-size">({formatFileSize(file.size)})</span>
              </div>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="file-remove"
                title="Remove file"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormFileUpload;
