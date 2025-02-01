import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function LoginForm() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>username</Form.Label>
        <Form.Control type="username" placeholder="username" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
      <Button href='/newuser' variant="secondary" type="submit">
        Create Login
      </Button>
    </Form>
  );
}

export default LoginForm;