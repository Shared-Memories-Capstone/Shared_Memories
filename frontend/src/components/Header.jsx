import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

// Basic Navbar, lead to different part of site
function Header() {
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
            <Nav.Link as={NavLink} to='/login' end>Login</Nav.Link>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;