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
      <Card className="text-center" style={{ width: '100%', maxWidth: '600px' }}>
        <Card.Body>
          <Card.Title as="h1" className="mb-4">Unlock the Memories</Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Enter Your Code</Form.Label>
              <Form.Control 
                type="text" 
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                placeholder="ABCDEF"
                maxLength={6}
                style={{ textAlign: 'center', textTransform: 'uppercase' }}
              />
            </Form.Group>
            {error && <div className="text-danger mb-3">{error}</div>}
            <Button variant="primary" type="submit">
              Enter
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
