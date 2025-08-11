import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = 'info' }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      // Toast will be removed by parent component
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`toast ${type}`}>
      <span className="toast-message">{message}</span>
    </div>
  );
};

export default Toast;
