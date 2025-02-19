import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { logout } from '../services/auth';


// Basic Navbar, lead to different part of site
function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Navbar expand="lg" className="py-3">
      <Container data-cy="header-container">
        <Navbar.Brand as={NavLink} to='/'>
          ✨ Shared Memories
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/about' end>About</Nav.Link>
            <Nav.Link as={NavLink} to='/find-event' end>Find Event</Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link as={NavLink} to='/event-manager' end>Event Manager</Nav.Link>
                <Nav.Link as={NavLink} to='/api-doc' end>API</Nav.Link>
                <Nav.Link as={NavLink} to="/create-event">
                  Create Event
                </Nav.Link>
                <Nav.Link disabled>👋 {user.username}</Nav.Link>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to='/login' end>Login</Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
