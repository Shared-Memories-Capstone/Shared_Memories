import React from 'react';
import { mount } from 'cypress/react';
import { BrowserRouter as Router } from 'react-router-dom';
import CreateEventForm from './CreateEventForm'; // Adjust path as needed

describe('CreateEventForm Component', () => {
  beforeEach(() => {
    // Enable fetch interception
    Cypress.on('window:before:load', (win) => {
      delete win.fetch;
    });

    // Mock localStorage for user authentication
    localStorage.setItem('user', JSON.stringify({ id: 1, username: 'testuser' }));

    // Mock API URL and token
    cy.intercept('POST', 'http://localhost:8000/api/events/', {
      statusCode: 201,
      body: { success: true },
    }).as('createEvent');

    mount(
      <Router>
        <CreateEventForm />
      </Router>
    );
  });

  it('renders the create event form', () => {
    cy.get('h2').should('contain', 'Create New Event');
    cy.get('form').should('exist');
    cy.get('input[name="event_title"]').should('exist');
    cy.get('textarea[name="event_description"]').should('exist');
    cy.get('input[name="event_date"]').should('exist');
    cy.get('button[type="submit"]').should('contain', 'Create Event');
  });

  it('allows input into all fields', () => {
    cy.get('input[name="event_title"]').type('Test Event').should('have.value', 'Test Event');
    cy.get('textarea[name="event_description"]').type('This is a test event description.').should('have.value', 'This is a test event description.');
    cy.get('input[name="event_date"]').type('2025-02-10').should('have.value', '2025-02-10');
  });

  it("shows an error message for invalid input", () => {
    // Leave fields blank and submit
    cy.get("input[name='event_title']").clear();
    cy.get("textarea[name='event_description']").clear();
    cy.get("input[name='event_date']").clear();
    cy.get("button[type='submit']").click();

    // Check for alert message
    cy.on("window:alert", (str) => {
      expect(str).to.equal("Failed to create event. Please try again.");
    });
  });

  it("shows success message on successful event creation", () => { 
    // This one is failing in the cypress potal although the even was created
    // I think it's because the "please fillout" message is blocking cypress from seeing it?  
    // Fill out all fields with valid data
    cy.get("input[name='event_title']").type("Test Event");
    cy.get("textarea[name='event_description']").type("This is a test event description.");
    cy.get("input[name='event_date']").type("2025-02-10");

    // Submit form and wait for API response
    cy.get("button[type='submit']").click();
    cy.wait('@createEvent');

    // Verify that the success component is displayed
    cy.contains("Your event has been created!").should("be.visible");
  });
});
