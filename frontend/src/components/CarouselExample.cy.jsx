import React from 'react'
import { mount } from 'cypress/react';
import CarouselExample from './CarouselExample'

describe('<CarouselExample />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<CarouselExample />)
  })
})

describe('CarouselExample Component', () => {
  beforeEach(() => {
    mount(<CarouselExample />);
  });

  it('renders the correct title', () => {
    cy.get('h1').should('have.text', 'Local Image Gallery');
  });

  it('displays all four images', () => {
    cy.get('img').should('have.length', 4);
  });

  it('has correct alt text for each image', () => {
    cy.get('img').each(($img, index) => {
      cy.wrap($img).should('have.attr', 'alt', `Image ${index + 1}`);
    });
  });

  it('applies correct CSS classes to images', () => {
    cy.get('img').each(($img) => {
      cy.wrap($img).should('have.class', 'w-100')
        .and('have.class', 'shadow-1-strong')
        .and('have.class', 'rounded');
    });
  });

  it('uses correct responsive column classes', () => {
    cy.get('.col-lg-4.col-md-6.col-sm-12').should('have.length', 4);
  });

  it('does not display "No images found" message', () => {
    cy.contains('No images found').should('not.exist');
  });
});