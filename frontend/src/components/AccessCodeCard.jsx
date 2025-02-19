import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AccessCodeCard() {
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://localhost:8000/api/events/by-access-code/${accessCode}`);
      if (response.data.status === 'success') {
        // Navigate to event page with event ID
        navigate(`/event-page?event=${response.data.event.event_id}`);
      }
    } catch (error) {
      setError('Invalid access code. Please try again.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <Card className="text-center p-4" style={{ width: '100%', maxWidth: '650px' }}>
        <Card.Body>
          <Card.Title as="h1" className="mb-4" style={{ color: 'var(--primary-color)' }}>
            ✨ Unlock the Memories
          </Card.Title>
          <p className="text-muted mb-4">Enter your special code to access shared photos and memories</p>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Control
                type="text"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="Enter your 6-digit code"
                maxLength={6}
                style={{ 
                  textAlign: 'center', 
                  textTransform: 'uppercase',
                  fontSize: '1.5rem',
                  letterSpacing: '0.5rem'
                }}
              />
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button variant="primary" type="submit" size="lg">
              Join Event
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}

AccessCodeCard.propTypes = {
  name: PropTypes.string,
  event: PropTypes.string
};

export default AccessCodeCard;
