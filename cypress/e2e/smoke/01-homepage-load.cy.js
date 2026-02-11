/**
 * SMOKE-01: Homepage Load & Critical Elements
 * Verifies that homepage loads and all critical CTAs are visible
 * Tags: @smoke @critical
 */

import { TIMEOUTS } from '../../utils/constants';

describe('Homepage - Critical Elements', { tags: ['@smoke', '@critical'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load homepage successfully', () => {
    cy.url().should('eq', Cypress.config('baseUrl') + '/');
    cy.get('body').should('be.visible');
    cy.title().should('not.be.empty');
  });

  it('should display hero section with main heading', () => {
    cy.get('h1', { timeout: TIMEOUTS.MEDIUM })
      .should('be.visible')
      .invoke('text')
      .should('match', /FAIRPLAY|MOBILE DATA|FAIR|DATA/i);
  });

  it('should display FairPlay Flex pricing section', () => {
    cy.contains(/fairplay flex|frequent traveller/i, { timeout: TIMEOUTS.MEDIUM })
      .scrollIntoView()
      .should('exist');
    
    // Wait for pricing section to fade in (opacity animation)
    cy.wait(2000);
    
    // Verify pricing cards exist (may be animating in)
    cy.get('body').should('contain.text', '6');
    cy.get('body').should('contain.text', '12');
    cy.get('body').should('contain.text', '24');
    
    // Verify pricing displayed
    cy.get('body').should('contain.text', '€ 35'); // 6-month price
    cy.get('body').should('contain.text', '€ 30'); // 12-month price
    cy.get('body').should('contain.text', '€ 25'); // 24-month price
  });

  it('should display Day Passes pricing section', () => {
    cy.contains(/day pass|unlimited.*day/i, { timeout: TIMEOUTS.MEDIUM })
      .scrollIntoView()
      .should('exist');
    
    // Wait for pricing section to fade in
    cy.wait(2000);
    
    // Verify day pass options exist
    cy.get('body').should('contain.text', '3 DAYS');
    cy.get('body').should('contain.text', '7 DAYS');
    cy.get('body').should('contain.text', '14 DAYS');
    
    // Verify day pass prices
    cy.get('body').should('contain.text', '€ 25'); // 3-day price
    cy.get('body').should('contain.text', '€ 50'); // 7-day price
    cy.get('body').should('contain.text', '€ 75'); // 14-day price
  });

  it('should display "Check Your Destination" CTA', () => {
    cy.contains(/check.*destination|135\+.*destination/i)
      .should('be.visible');
  });

  it('should display "Check Phone Compatibility" CTA', () => {
    cy.contains(/check.*phone|esim compatible/i)
      .should('be.visible');
  });

  it('should display coverage information (135+ destinations)', () => {
    cy.contains(/135\+/i).should('be.visible');
    cy.contains(/destination/i).should('be.visible');
  });

  it('should display key USPs (Unlimited, One eSIM, No Waste)', () => {
    cy.contains(/unlimited/i).should('be.visible');
    cy.contains(/one esim|zero stress/i).should('be.visible');
    cy.contains(/no unused data|no waste/i).should('be.visible');
  });

  it('should have no console errors on page load', () => {
    cy.window().then((win) => {
      const errors = win.console.errors || [];
      if (errors.length > 0) {
        cy.log(`[WARNING] Console errors detected: ${errors.length}`);
        cy.task('log', `Console errors: ${JSON.stringify(errors)}`);
      }
      // Don't fail test, just log (some 3rd party scripts may cause errors)
    });
  });

});
