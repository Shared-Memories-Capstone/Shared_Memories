import { useState, useEffect } from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { API_URL, getAuthToken } from "../services/auth";
import { generateEventCode } from "../services/generateEventCode";
import EventCreatedWithCode from "./EventCreatedWithCode";
import { useParams, useNavigate } from "react-router-dom";

const CreateEventForm = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [showEventCreated, setShowEventCreated] = useState(false);
    const [alert, setAlert] = useState({ show: false, message: '', variant: 'success' });
    
    const [eventData, setEventData] = useState({
        event_title: "",
        event_description: "",
        event_date: "",
        access_code: generateEventCode(),
        user_id: user.id
    });

    useEffect(() => {
        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    const fetchEventDetails = async () => {
        try {
            const response = await fetch(`${API_URL}/events/${eventId}/`, {
                headers: {
                    'Authorization': `Token ${getAuthToken()}`
                }
            });
            if (response.ok) {
                const data = await response.json();
                // Format the date to YYYY-MM-DD for the input field
                const formattedDate = data.event_date.split('T')[0];
                setEventData({
                    ...data,
                    event_date: formattedDate
                });
            } else {
                setAlert({
                    show: true,
                    message: 'Failed to fetch event details',
                    variant: 'danger'
                });
            }
        } catch (err) {
            console.error('Error fetching event:', err);
            setAlert({
                show: true,
                message: 'Failed to fetch event details',
                variant: 'danger'
            });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setAlert({ show: false, message: '', variant: 'success' });
        
        try {
            const url = eventId 
                ? `${API_URL}/events/${eventId}/`
                : `${API_URL}/events/`;
                
            const method = eventId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getAuthToken()}`
                },
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                if (eventId) {
                    setAlert({
                        show: true,
                        message: 'Event updated successfully',
                        variant: 'success'
                    });
                    setTimeout(() => navigate('/event-manager'), 2000);
                } else {
                    setShowEventCreated(true);
                }
            } else {
                const data = await response.json();
                setAlert({
                    show: true,
                    message: `Failed to ${eventId ? 'update' : 'create'} event: ${data.message || 'Unknown error'}`,
                    variant: 'danger'
                });
            }
        } catch (err) {
            console.error('Event operation error:', err);
            setAlert({
                show: true,
                message: `Failed to ${eventId ? 'update' : 'create'} event. Please try again.`,
                variant: 'danger'
            });
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEventData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <Container className="mt-4">
            {showEventCreated ? <EventCreatedWithCode event={eventData} /> :
                <Row className="justify-content-center mt-5">
                    <Col xs={12} md={6} lg={4}>
                        <h2>{eventId ? `Edit ${eventData.event_title}` : 'Create New Event'}</h2>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="event_title">Event Title</Form.Label>
                                <Form.Control
                                    id="event_title"
                                    type="text"
                                    name="event_title"
                                    value={eventData.event_title}
                                    onChange={handleChange}
                                    required
                                    maxLength={50}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="event_description">Description</Form.Label>
                                <Form.Control
                                    id="event_description"
                                    as="textarea"
                                    name="event_description"
                                    value={eventData.event_description}
                                    onChange={handleChange}
                                    required
                                    maxLength={255}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label htmlFor="event_date">Event Date</Form.Label>
                                <Form.Control
                                    id="event_date"
                                    type="date"
                                    name="event_date"
                                    value={eventData.event_date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>

                            <Button variant="primary" type="submit">
                                {eventId ? 'Update Event' : 'Create Event'}
                            </Button>
                            {eventId && (
                                <Button 
                                    variant="secondary" 
                                    className="ms-2"
                                    onClick={() => navigate('/event-manager')}
                                >
                                    Cancel
                                </Button>
                            )}
                            
                            {alert.show && (
                                <Alert 
                                    variant={alert.variant} 
                                    className="mt-3"
                                >
                                    {alert.message}
                                </Alert>
                            )}
                        </Form>
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default CreateEventForm;
