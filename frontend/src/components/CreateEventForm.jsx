import { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { API_URL, getAuthToken } from "../services/auth";
import { generateEventCode } from "../services/generateEventCode";
import EventCreatedWithCode from "./EventCreatedWithCode";

const CreateEventForm = () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const [eventData, setEventData] = useState({
        event_title: "",
        event_description: "",
        event_date: "",
        access_code: generateEventCode(),
        user_id: user.id
    });
    const [showEventCreated, setShowEventCreated] = useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/events/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${getAuthToken()}`
                },
                body: JSON.stringify(eventData)
            });

            if (response.ok) {
                setShowEventCreated(true);
            } else {
                const data = await response.json();
                alert(`Failed to create event: ${data.message || 'Unknown error'}`);
            }
        } catch (err) {
            console.error('Event creation error:', err);
            alert('Failed to create event. Please try again.');
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
                        <h2>Create New Event</h2>
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
                                Create Event
                            </Button>
                        </Form>
                    </Col>
                </Row>
            }
        </Container>
    );
};

export default CreateEventForm;
