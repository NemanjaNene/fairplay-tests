/**
 * SMOKE-04: Responsive Design
 * Verifies critical elements display correctly on mobile, tablet, desktop
 * Tags: @smoke @responsive
 */

import { VIEWPORTS } from '../../utils/constants';

describe('Responsive Design - Multi-Device', { tags: ['@smoke', '@responsive'] }, () => {
  
  const devices = [
    { name: 'Mobile (iPhone SE)', viewport: VIEWPORTS.MOBILE },
    { name: 'Tablet (iPad)', viewport: VIEWPORTS.TABLET },
    { name: 'Desktop (1920x1080)', viewport: VIEWPORTS.DESKTOP }
  ];

  devices.forEach(device => {
    
    context(`${device.name}`, () => {
      
      beforeEach(() => {
        cy.viewport(device.viewport.width, device.viewport.height);
        cy.visit('/');
      });

      it('should display hero section', () => {
        cy.get('h1').should('be.visible');
        cy.contains(/fairplay/i).should('be.visible');
      });

      it('should display pricing cards', () => {
        cy.contains(/€\s*25|€\s*30|€\s*35/i).should('be.visible');
      });

      it('should have clickable CTAs', () => {
        // Check at least one CTA is clickable
        cy.get('a, button').contains(/check|start|get/i)
          .should('be.visible')
          .and('not.be.disabled');
      });

      it('should not have horizontal scrollbar', () => {
        cy.document().then((doc) => {
          const bodyWidth = doc.body.scrollWidth;
          const windowWidth = doc.documentElement.clientWidth;
          
          expect(bodyWidth).to.be.at.most(windowWidth + 1); // +1 for rounding
        });
      });

      it('should display footer', () => {
        cy.scrollToFooter();
        cy.get('footer').should('be.visible');
      });

    });

  });

  context('Mobile-Specific Tests', () => {
    
    beforeEach(() => {
      cy.viewport(VIEWPORTS.MOBILE.width, VIEWPORTS.MOBILE.height);
      cy.visit('/');
    });

    it('should have mobile navigation (hamburger menu if present)', () => {
      // Check if hamburger menu exists (common pattern)
      cy.get('body').then($body => {
        const hasHamburger = $body.find('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu" i]').length > 0;
        
        if (hasHamburger) {
          cy.get('[class*="hamburger"], [class*="menu-toggle"], button[aria-label*="menu" i]')
            .should('be.visible')
            .and('not.be.disabled');
        } else {
          // If no hamburger, regular nav should be visible
          cy.get('nav, header').should('be.visible');
        }
      });
    });

    it('should stack pricing cards vertically on mobile', () => {
      cy.contains(/6.*month/i).scrollIntoView();
      
      // Get positions of pricing cards
      cy.contains(/6.*month/i).then($first => {
        const firstTop = $first.offset().top;
        
        cy.contains(/12.*month/i).then($second => {
          const secondTop = $second.offset().top;
          
          // Second card should be below first (not side-by-side)
          expect(secondTop).to.be.greaterThan(firstTop);
        });
      });
    });

  });

});
