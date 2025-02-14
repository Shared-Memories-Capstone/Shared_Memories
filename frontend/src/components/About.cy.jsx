import React from 'react';
import { mount } from 'cypress/react';
import About from './About'; 

describe('About Component', () => {
  beforeEach(() => {
    mount(<About />);
  });

  it('renders the main heading', () => {
    cy.get('h1').should('contain', 'About Us');
  });

  it('contains the company name', () => {
    cy.contains('Shared Memories').should('exist');
  });

  it('displays the mission section', () => {
    cy.get('h2').contains('Our Mission').should('exist');
    cy.get('h2').contains('Our Mission').next('p').should('exist');
  });

  it('lists what makes the service different', () => {
    cy.get('h2').contains('What Makes Us Different?').should('exist');
    cy.get('ul').within(() => {
      cy.get('li').should('have.length', 3);
      cy.contains('Event-Specific Sharing').should('exist');
      cy.contains('Privacy First').should('exist');
      cy.contains('Simplicity').should('exist');
    });
  });

  it('explains how the service works', () => {
    cy.get('h2').contains('How It Works').should('exist');
    cy.get('ol').within(() => {
      cy.get('li').should('have.length', 4);
      cy.contains('Create an Event').should('exist');
      cy.contains('Share the Link').should('exist');
      cy.contains('Upload Photos').should('exist');
      cy.contains('View and Relive').should('exist');
    });
  });

  it('includes information about the team', () => {
    cy.get('h2').contains('Who We Are').should('exist');
    cy.contains('UMGC students').should('exist');
  });
});
