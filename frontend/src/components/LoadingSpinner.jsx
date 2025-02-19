import { Spinner } from 'react-bootstrap';

const LoadingSpinner = ({ message = "Loading..." }) => {
  return (
    <div className="loading-container" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '200px',
      gap: '1rem'
    }}>
      <Spinner 
        animation="border" 
        role="status"
        style={{ 
          color: 'var(--primary-color)',
          width: '3rem',
          height: '3rem'
        }}
      />
      <span className="text-muted">{message}</span>
    </div>
  );
};

export default LoadingSpinner; 