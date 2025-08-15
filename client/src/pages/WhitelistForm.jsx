import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';
import FormInput from '../components/FormInput';
import FormTextarea from '../components/FormTextarea';
import FormSelect from '../components/FormSelect';
import FormCheckbox from '../components/FormCheckbox';
import FormFileUpload from '../components/FormFileUpload';
import { whitelistQuestions, getDefaultValues, validateQuestion } from '../config/questions';
import './WhitelistForm.css';

const WhitelistForm = () => {
  const [formData, setFormData] = useState(getDefaultValues());
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [existingApp, setExistingApp] = useState(null);
  
  const { user, showToast } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    checkExistingApplication();
  }, []);

  const checkExistingApplication = async () => {
    try {
      const token = localStorage.getItem('token');
  const response = await fetch('https://api.carthagedynasty.com:8443/api/applications/my', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        if (data.application) {
          setExistingApp(data.application);
        }
      }
    } catch (error) {
      console.error('Error checking existing application:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Validate each question using the configuration
    whitelistQuestions.forEach(question => {
      const error = validateQuestion(question, formData[question.id]);
      if (error) {
        newErrors[question.id] = error;
      }
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    
    try {
      const token = localStorage.getItem('token');
  const response = await fetch('https://api.carthagedynasty.com:8443/api/applications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        showToast('Application submitted successfully!', 'success');
        navigate('/dashboard');
      } else {
        showToast(data.error || 'Failed to submit application', 'error');
      }
    } catch (error) {
      console.error('Submit error:', error);
      showToast('Network error. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  if (existingApp) {
    return (
      <div className="whitelist-page">
        <div className="page-container">
          <div className="existing-app-card torn-paper">
            <h2>Application Already Submitted</h2>
            <p>You have already submitted a whitelist application.</p>
            <div className="app-status">
              <span className={`status-badge status-${existingApp.status}`}>
                {existingApp.status}
              </span>
            </div>
            <div className="app-details">
              <p><strong>In-Game Name:</strong> {existingApp.inGameName}</p>
              <p><strong>Submitted:</strong> {new Date(existingApp.submittedAt).toLocaleDateString()}</p>
              {existingApp.reviewedAt && (
                <p><strong>Reviewed:</strong> {new Date(existingApp.reviewedAt).toLocaleDateString()}</p>
              )}
              {existingApp.adminNotes && (
                <div className="admin-notes">
                  <strong>Admin Notes:</strong>
                  <p>{existingApp.adminNotes}</p>
                </div>
              )}
            </div>
            <button 
              onClick={() => navigate('/dashboard')} 
              className="btn btn-primary"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="whitelist-page">
      {/* Phoenician Alphabet Background */}
      <div className="phoenician-background">
        <div className="phoenician-letter">𐤀</div>
        <div className="phoenician-letter">𐤁</div>
        <div className="phoenician-letter">𐤂</div>
        <div className="phoenician-letter">𐤃</div>
        <div className="phoenician-letter">𐤄</div>
        <div className="phoenician-letter">𐤅</div>
        <div className="phoenician-letter">𐤆</div>
        <div className="phoenician-letter">𐤇</div>
        <div className="phoenician-letter">𐤈</div>
        <div className="phoenician-letter">𐤉</div>
        <div className="phoenician-letter">𐤊</div>
        <div className="phoenician-letter">𐤋</div>
        <div className="phoenician-letter">𐤌</div>
        <div className="phoenician-letter">𐤍</div>
        <div className="phoenician-letter">𐤎</div>
        <div className="phoenician-letter">𐤏</div>
        <div className="phoenician-letter">𐤐</div>
        <div className="phoenician-letter">𐤑</div>
        <div className="phoenician-letter">𐤒</div>
        <div className="phoenician-letter">𐤓</div>
        <div className="phoenician-letter">𐤔</div>
        <div className="phoenician-letter">𐤕</div>
      </div>

      <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">Whitelist Application</h1>
          <p className="page-subtitle">
            Tell us about yourself and your roleplay experience
          </p>
        </div>

        <div className="form-card torn-paper">
          <form onSubmit={handleSubmit} className="whitelist-form">
            {whitelistQuestions.map((question, index) => {
              const commonProps = {
                label: question.label,
                required: question.required,
                error: errors[question.id]
              };

              // Handle different question types
              switch (question.type) {
                case 'text':
                  return (
                    <FormInput
                      key={question.id}
                      {...commonProps}
                      type="text"
                      name={question.id}
                      value={formData[question.id]}
                      onChange={handleChange}
                      placeholder={question.placeholder}
                    />
                  );

                case 'number':
                  return (
                    <FormInput
                      key={question.id}
                      {...commonProps}
                      type="number"
                      name={question.id}
                      value={formData[question.id]}
                      onChange={handleChange}
                      placeholder={question.placeholder}
                      min={question.validation?.min}
                      max={question.validation?.max}
                    />
                  );

                case 'textarea':
                  return (
                    <FormTextarea
                      key={question.id}
                      {...commonProps}
                      name={question.id}
                      value={formData[question.id]}
                      onChange={handleChange}
                      placeholder={question.placeholder}
                      rows={question.rows}
                      maxLength={question.maxLength}
                    />
                  );

                case 'select':
                  return (
                    <FormSelect
                      key={question.id}
                      {...commonProps}
                      name={question.id}
                      value={formData[question.id]}
                      onChange={handleChange}
                      options={question.options}
                      placeholder={question.placeholder}
                    />
                  );

                case 'checkbox':
                  return (
                    <FormCheckbox
                      key={question.id}
                      {...commonProps}
                      checked={formData[question.id]}
                      onChange={(e) => handleChange({
                        target: {
                          name: question.id,
                          type: 'checkbox',
                          checked: e.target.checked
                        }
                      })}
                    />
                  );

                case 'file':
                  return (
                    <FormFileUpload
                      key={question.id}
                      {...commonProps}
                      value={formData[question.id]}
                      onChange={(value) => setFormData(prev => ({
                        ...prev,
                        [question.id]: value
                      }))}
                      accept={question.accept}
                      multiple={question.multiple}
                      maxFiles={question.maxFiles}
                      maxFileSize={question.maxFileSize}
                      placeholder={question.placeholder}
                      helpText={question.helpText}
                    />
                  );

                default:
                  return null;
              }
            })}

            <div className="form-actions">
              <button 
                type="submit" 
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner-small"></div>
                    Submitting Application...
                  </>
                ) : (
                  'Submit Application'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WhitelistForm;
