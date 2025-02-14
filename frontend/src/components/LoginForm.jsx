import { Container, Row, Col, Button, Form, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/auth';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Container>
      <Row className="justify-content-center mt-5">
        <Col xs={12} md={6} lg={4}>
          <h1>Login</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form className="mt-5" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="me-2">
              Submit
            </Button>
            <h5 className='mt-3'>Don{"'"}t have an account? <Link to='/newuser'>Create one here</Link></h5>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
