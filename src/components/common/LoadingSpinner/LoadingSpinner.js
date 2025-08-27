import React from 'react';
import { Container } from 'react-bootstrap';
import { Radio } from 'lucide-react';
import './LoadingSpinner.css';

const LoadingSpinner = ({ message = 'Loading...' }) => {
  return (
    <Container className="loading-container">
      <div className="loading-content">
        <div className="spinning-icon">
          <Radio size={48} />
        </div>
        <div className="loading-text">{message}</div>
      </div>
    </Container>
  );
};

export default LoadingSpinner;