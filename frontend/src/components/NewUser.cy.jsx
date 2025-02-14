import React from 'react';
import { mount } from 'cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NewUser from './NewUser'; // Adjust the path to your NewUser component

describe('NewUser Component', () => {
  beforeEach(() => {
    // Mock the register service
    cy.intercept('POST', '/api/auth/register', (req) => {
      const { email, username, firstName, lastName, password } = req.body;
      if (email && username && firstName && lastName && password) {
        req.reply({ success: true });
      } else {
        req.reply({ statusCode: 400, body: { error: 'Invalid input' } });
      }
    });

    // Mount the component
    mount(
      <Router>
        <NewUser />
      </Router>
    );
  });

  it('renders the registration form', () => {
    cy.get('h1').should('contain', 'Create Account');
    cy.get('form').should('exist');
    cy.get('input[name="email"]').should('exist');
    cy.get('input[name="username"]').should('exist');
    cy.get('input[name="firstName"]').should('exist');
    cy.get('input[name="lastName"]').should('exist');
    cy.get('input[name="password"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Submit');
  });

  it('allows input into all fields', () => {
    cy.get('input[name="email"]').type('testuser@example.com').should('have.value', 'testuser@example.com');
    cy.get('input[name="username"]').type('testuser').should('have.value', 'testuser');
    cy.get('input[name="firstName"]').type('Test').should('have.value', 'Test');
    cy.get('input[name="lastName"]').type('User').should('have.value', 'User');
    cy.get('input[name="password"]').type('password123').should('have.value', 'password123');
  });

  it("shows an error message for invalid input", () => {
    // Leave fields blank and submit
    cy.get("button[type='submit']").click();

    // Check for error message
    cy.contains("Registration failed. Please try again.").should("be.visible");
  });

  it("redirects to home page on successful registration", () => {
    // Fill out all fields with valid data
    cy.get("input[name='email']").type("testuser@example.com");
    cy.get("input[name='username']").type("testuser");
    cy.get("input[name='firstName']").type("Test");
    cy.get("input[name='lastName']").type("User");
    cy.get("input[name='password']").type("password123");

    // Submit form
    cy.get("button[type='submit']").click();

    // Assert redirection to home page
    cy.location("pathname").should("eq", "/");
  });

  it("has a link to the login page", () => {
    cy.contains("Already have an account?").should("exist");
    cy.contains("Login here").should("have.attr", "href", "/login");
  });
});
