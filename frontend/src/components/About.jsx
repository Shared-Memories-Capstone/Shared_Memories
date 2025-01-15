import React from 'react';
import Container from 'react-bootstrap/Container';

// Basic About page
function About() {
  return (
    <Container className='about-page'>
      <h1>About Us</h1>
      <p>
        Welcome to <strong>Shared Memories</strong>, the platform designed to make sharing and preserving event memories simple, secure, and collaborative. Whether it’s a wedding, a family reunion, a birthday party, or any special gathering, we help you organize and share photos effortlessly.
      </p>

      <h2>Our Mission</h2>
      <p>
        We believe in creating a space where moments can be captured, shared, and cherished without compromising privacy or control. With our user-friendly platform, you can easily create event-specific galleries, share them with your attendees, and crowdsource memories in one convenient location.
      </p>

      <h2>What Makes Us Different?</h2>
      <ul>
        <li>
          <strong>Event-Specific Sharing:</strong> Create unique galleries for each event with a personalized link or QR code for easy access.
        </li>
        <li>
          <strong>Privacy First:</strong> Your memories belong to you. Our platform prioritizes privacy, ensuring your photos are securely stored and accessible only to those you invite.
        </li>
        <li>
          <strong>Simplicity:</strong> We’ve designed an intuitive experience that lets you upload, view, and share photos without hassle.
        </li>
      </ul>

      <h2>How It Works</h2>
      <ol>
        <li><strong>Create an Event:</strong> Start by creating a unique gallery for your event.</li>
        <li><strong>Share the Link:</strong> Use a custom link to invite attendees.</li>
        <li><strong>Upload Photos:</strong> Guests can easily upload their photos directly to the event gallery.</li>
        <li><strong>View and Relive:</strong> Explore the shared memories from your event in a beautifully organized gallery.</li>
      </ol>

      <h2>Who We Are</h2>
      <p>
        We’re a team of UMGC students passionate about creating tools that bring people closer together. Inspired by our own experiences at events, we set out to solve the challenge of collecting and sharing photos seamlessly. With <strong>Shared Memories</strong>, we aim to make memory-sharing more collaborative and meaningful.
      </p>
    </Container>
  );
}

export default About;
