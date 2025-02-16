import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { mount } from 'cypress/react';
import Header from './Header';

describe('Header Component', () => {
  beforeEach(() => {
    mount(
      <Router>
        <Header />
      </Router>
    );
  });

  it('renders the navbar', () => {
    cy.get('nav').should('exist');
    cy.get('nav').should('have.class', 'bg-body-tertiary');
  });

  it('displays the correct brand name', () => {
    cy.get('.navbar-brand').should('contain', 'Shared Memories');
  });

  it('shows all main navigation links', () => {
    cy.get('nav').contains('Home');
    cy.get('nav').contains('About');
    cy.get('nav').contains('Event Page');
    cy.get('nav').contains('API');
  });

  it('has a functioning Features dropdown', () => {
    cy.get('#basic-nav-dropdown').click();
    cy.get('.dropdown-menu').should('be.visible');
    cy.get('.dropdown-menu').contains('Upload');
    cy.get('.dropdown-menu').contains('View Test Gallery');
    cy.get('.dropdown-menu').contains('Create Event');
  });

  it('shows login link when user is not logged in', () => {
    cy.get('nav').contains('Login');
  });

  it('shows welcome message and logout link when user is logged in', () => {
    // Mock a logged-in user
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    cy.mount(
      <Router>
        <Header />
      </Router>
    );
    cy.get('nav').contains('Welcome, testuser');
    cy.get('nav').contains('Logout');
  });

  it('handles logout correctly', () => {
    localStorage.setItem('user', JSON.stringify({ username: 'testuser' }));
    cy.mount(
      <Router>
        <Header />
      </Router>
    );
    cy.get('nav').contains('Logout').click();
    cy.should(() => {
      expect(localStorage.getItem('user')).to.be.null;
    });
  });

  it('collapses on small screens', () => {
    // weirdly this is failing but I can't check on my phone. If someone can check it that will be great
    cy.viewport('iphone-6');
    cy.get('.navbar-toggler').should('be.visible');
    cy.get('.navbar-collapse').should('not.be.visible');
    cy.get('.navbar-toggler').click();
    cy.get('.navbar-collapse').should('be.visible');
  });
});
