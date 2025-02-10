import React from 'react';
import { mount } from 'cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginForm from './LoginForm'; // Adjust path as needed

describe('LoginForm Component', () => {
  beforeEach(() => {
    // Mock the login service
    cy.intercept('POST', '/api/auth/login', {
      statusCode: 200,
      body: { success: true },
    });

    mount(
      <Router>
        <LoginForm />
      </Router>
    );
  });

  it('renders the login form', () => {
    cy.get('h1').should('contain', 'Login');
    cy.get('form').should('exist');
    cy.get('input[placeholder="username"]').should('exist');
    cy.get('input[placeholder="Password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Submit');
  });

  it('redirects to home page on successful login', () => {
    // Simulate user input
    cy.get('input[placeholder="username"]').type('testuser');
    cy.get('input[placeholder="Password"]').type('password123');
    cy.get('button[type="submit"]').click();

    // Assert redirection to home page
    cy.location('pathname').should('eq', '/');
  });
});
