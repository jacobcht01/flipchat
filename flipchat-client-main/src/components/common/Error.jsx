
import React from 'react'
import { useNavigate } from 'react-router-dom';
import ErrorIcon from "../../assets/icon_error.svg"

const Error = ({ text, linkText, link }) => {
    const navigate = useNavigate();
  
    const handleNavigate = () => {
      navigate(link);
    };
  
    return (
      <div className="error">
        <img src={ErrorIcon} alt="error icon" className="error-icon" />
        <div className="error-content">
          <p className="error-text">{text}</p>
          {link && (
            <p className="error-link" onClick={handleNavigate}>
              {linkText}
            </p>
          )}
        </div>
      </div>
    );
  };

export default Error