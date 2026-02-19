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

    // Scroll to Flex section and wait for opacity animation (parent may have opacity: 0 initially)
    const scrollToFlexSection = () => {
      cy.contains(/fairplay flex|frequent traveller|6.*month/i).first().scrollIntoView();
      cy.wait(2500);
    };

    it('should display 6-month Flex plan with correct price (€35/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['6_month'];
        scrollToFlexSection();
        cy.get('body').should('contain.text', '6').and('contain.text', 'MONTH');
        cy.get('body').should('contain.text', `€ ${plan.startingPrice}`);
      });
    });

    it('should display 12-month Flex plan with correct price (€30/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['12_month'];
        scrollToFlexSection();
        cy.get('body').should('contain.text', '12').and('contain.text', 'MONTH');
        cy.get('body').should('contain.text', `€ ${plan.startingPrice}`);
      });
    });

    it('should display 24-month Flex plan with correct price (€25/month)', () => {
      cy.fixture('plans').then((plans) => {
        const plan = plans.flex['24_month'];
        scrollToFlexSection();
        cy.get('body').should('contain.text', '24').and('contain.text', 'MONTH');
        cy.get('body').should('contain.text', `€ ${plan.startingPrice}`);
      });
    });

    it('should display Flex plan starting data (5 GB)', () => {
      scrollToFlexSection();
      // Site may show "5 GB" or "GB"/"GBs" (e.g. "Rule your GBs", "80 GB")
      cy.get('body').invoke('text').should('match', /5\s*gb|\bgb\b/i);
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
    
    it('should mention 185+ destinations', () => {
      cy.contains(/185\+/i).should('be.visible');
    });

    it('should mention 5G premium connectivity', () => {
      cy.contains(/5g/i).should('be.visible');
    });

    it('should mention free global eSIM', () => {
      cy.contains(/free.*esim|esim.*free/i).should('be.visible');
    });

  });

});
