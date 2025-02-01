import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          Shared Memories
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/' end>Home</Nav.Link>
            <Nav.Link as={NavLink} to='/about' end>About</Nav.Link>
            <Nav.Link as={NavLink} to='/api-doc' end>API</Nav.Link>
            <NavDropdown title="Features" id="basic-nav-dropdown">
              <NavDropdown.Item as={NavLink} to='/upload' end>
                Upload
              </NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to='/CarouselExample' end>
                View Gallery
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#create-event">
                Create Event
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            {user ? (
              <>
                <Nav.Link disabled>Welcome, {user.username}</Nav.Link>
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