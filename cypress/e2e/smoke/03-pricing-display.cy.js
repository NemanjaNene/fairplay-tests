/**
 * SMOKE-03: Pricing Display & Accuracy
 * Verifies all pricing information is correctly displayed
 * Tags: @smoke @pricing
 */

describe('Pricing - Display & Accuracy', { tags: ['@smoke', '@pricing'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  context('FairPlay Flex Pricing', () => {
    
    it('should display 6-month Flex plan with correct price (€35/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['6_month'];
        
        cy.contains(/6.*month/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.contains(new RegExp(`€\\s*${plan.startingPrice}`, 'i'))
          .should('be.visible');
      });
    });

    it('should display 12-month Flex plan with correct price (€30/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['12_month'];
        
        cy.contains(/12.*month/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.contains(new RegExp(`€\\s*${plan.startingPrice}`, 'i'))
          .should('be.visible');
      });
    });

    it('should display 24-month Flex plan with correct price (€25/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['24_month'];
        
        cy.contains(/24.*month/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.contains(new RegExp(`€\\s*${plan.startingPrice}`, 'i'))
          .should('be.visible');
      });
    });

    it('should display Flex plan starting data (5 GB)', () => {
      cy.contains(/5\s*gb/i)
        .scrollIntoView()
        .should('be.visible');
    });

  });

  context('Day Passes Pricing', () => {
    
    it('should display 3-day pass with correct price (€25)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.dayPass['3_day'];
        
        cy.contains(/3.*day/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.get('body').should('contain', `€ ${plan.price}`);
      });
    });

    it('should display 7-day pass with correct price (€50)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.dayPass['7_day'];
        
        cy.contains(/7.*day/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.get('body').should('contain', `€ ${plan.price}`);
      });
    });

    it('should display 14-day pass with correct price (€75)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.dayPass['14_day'];
        
        cy.contains(/14.*day/i)
          .scrollIntoView()
          .should('be.visible');
        
        cy.get('body').should('contain', `€ ${plan.price}`);
      });
    });

    it('should display "unlimited" for day passes', () => {
      cy.contains(/unlimited/i)
        .should('be.visible');
    });

  });

  context('Pricing Details', () => {
    
    it('should mention 135+ destinations', () => {
      cy.contains(/135\+/i).should('be.visible');
    });

    it('should mention 5G premium connectivity', () => {
      cy.contains(/5g/i).should('be.visible');
    });

    it('should mention free global eSIM', () => {
      cy.contains(/free.*esim|esim.*free/i).should('be.visible');
    });

  });

});
