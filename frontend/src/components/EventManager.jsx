import { useState, useEffect } from 'react';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EventManager = () => {
  const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

  useEffect(() => {
    fetchUserEvents();
  }, []);

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/events/user_events/', {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`
        }
      });
      setEvents(response.data.events);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Error fetching events. Please try again.');
    }
  };

  const handleViewDetails = (eventId) => {
    navigate(`/event-page/?event=${eventId}`);
  };

  const handleEditEvent = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  return (
      <Container className="mt-4">
    {error && <Alert variant="danger">{error}</Alert>}
      <h2 className="mb-4">My Events</h2>
      <Row xs={1} md={2} lg={3} className="g-4">
        {events.map((event) => (
          <Col key={event.event_id}>
            <Card>
              <Card.Body>
                <Card.Title>{event.event_title}</Card.Title>
                <Card.Text>
                  {event.event_description}
                  <br />
                  <small className="text-muted">
                    Date: {new Date(event.event_date).toLocaleDateString()}
                  </small>
                  <br />
                  <small className="text-muted">
                    Access Code: {event.access_code}
                  </small>
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={() => handleViewDetails(event.event_id)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => handleEditEvent(event.event_id)}
                  >
                    Edit Event
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default EventManager;
