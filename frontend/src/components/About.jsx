import Container from 'react-bootstrap/Container';
import { Row, Col } from 'react-bootstrap';

// Basic About page
function About() {
  return (
    <Container className='about-page py-5'>
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h1 className="display-4 text-center mb-5" style={{ color: 'var(--primary-color)' }}>
            About Us ✨
          </h1>
          
          <div className="welcome-section mb-5 p-4" style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px',
            boxShadow: 'var(--card-shadow)'
          }}>
            <h2 className="h3 mb-3" style={{ color: 'var(--secondary-color)' }}>Welcome to Shared Memories</h2>
            <p className="lead">
              We're the platform designed to make sharing and preserving event memories simple, secure, and collaborative. Whether it's a wedding, a family reunion, a birthday party, or any special gathering, we help you organize and share photos effortlessly.
            </p>
          </div>

          <div className="mission-section mb-5">
            <h2 className="h3 mb-4" style={{ color: 'var(--secondary-color)' }}>Our Mission</h2>
            <p>
              We believe in creating a space where moments can be captured, shared, and cherished without compromising privacy or control. With our user-friendly platform, you can easily create event-specific galleries, share them with your attendees, and crowdsource memories in one convenient location.
            </p>
          </div>

          <div className="features-section mb-5 p-4" style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px',
            boxShadow: 'var(--card-shadow)'
          }}>
            <h2 className="h3 mb-4" style={{ color: 'var(--secondary-color)' }}>What Makes Us Different?</h2>
            <Row className="g-4">
              <Col md={4}>
                <div className="feature-item text-center p-3">
                  <div className="feature-icon mb-3" style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>📸</div>
                  <h3 className="h5">Event-Specific Sharing</h3>
                  <p className="small">Create unique galleries for each event with personalized access</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-item text-center p-3">
                  <div className="feature-icon mb-3" style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>🔒</div>
                  <h3 className="h5">Privacy First</h3>
                  <p className="small">Your memories belong to you, secured and private</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature-item text-center p-3">
                  <div className="feature-icon mb-3" style={{ color: 'var(--accent-color)', fontSize: '2rem' }}>✨</div>
                  <h3 className="h5">Simplicity</h3>
                  <p className="small">Intuitive experience for sharing without hassle</p>
                </div>
              </Col>
            </Row>
          </div>

          <div className="team-section p-4" style={{ 
            backgroundColor: 'white', 
            borderRadius: '15px',
            boxShadow: 'var(--card-shadow)'
          }}>
            <h2 className="h3 mb-4" style={{ color: 'var(--secondary-color)' }}>Who We Are</h2>
            <p>
              We're a team of UMGC students passionate about creating tools that bring people closer together. Inspired by our own experiences at events, we set out to solve the challenge of collecting and sharing photos seamlessly. With <strong>Shared Memories</strong>, we aim to make memory-sharing more collaborative and meaningful.
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
