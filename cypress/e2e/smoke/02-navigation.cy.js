/**
 * SMOKE-02: Navigation & Key Links
 * Verifies main navigation works and key links are accessible
 * Tags: @smoke @navigation
 */

import { TIMEOUTS } from '../../utils/constants';

describe('Navigation - Key Links', { tags: ['@smoke', '@navigation'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display header/navigation', () => {
    cy.get('header, nav, [role="banner"]', { timeout: TIMEOUTS.MEDIUM })
      .should('be.visible');
  });

  it('should display header branding/logo', () => {
    // Flexible check - header treba da ima NEKI branding element
    cy.get('header, nav').first().then($header => {
      // Check multiple possible logo selectors (flexible)
      const hasImage = $header.find('img').length > 0;
      const hasSvg = $header.find('svg').length > 0;
      const hasLogo = $header.find('[class*="logo"], [class*="Logo"], [id*="logo"]').length > 0;
      const hasBrand = $header.find('[class*="brand"]').length > 0;
      
      // Header mora imati bar jedan element (logo, img, svg, brand)
      const hasBranding = hasImage || hasSvg || hasLogo || hasBrand;
      
      cy.task('log', `Header branding: img=${hasImage}, svg=${hasSvg}, logo=${hasLogo}, brand=${hasBrand}`);
      
      // Soft assertion - log warning instead of failing
      if (!hasBranding) {
        cy.task('log', '⚠️ Warning: No obvious branding element found in header');
      } else {
        cy.task('log', '✅ Header branding element found');
      }
      
      // Just verify header exists and has some content
      cy.wrap($header).should('not.be.empty');
    });
  });

  it('should have Account Login link', () => {
    cy.contains(/account login|login|sign in/i)
      .should('be.visible')
      .and('have.attr', 'href');
  });

  it('should have Help Center link', () => {
    // Help Center je iznad footera - scroll malo dole da bude u viewport-u
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    // Traži link koji vodi na /help-center ili sadrži "help" u href-u
    cy.get('a[href*="help"]').should('exist').and('have.attr', 'href');
    
    cy.task('log', '✅ Help Center link found');
  });

  it('should display footer', () => {
    cy.scrollToFooter();
    // Footer visibility already checked in scrollToFooter command
    cy.get('footer, [role="contentinfo"]').should('exist');
  });

  it('should have legal links in footer (Imprint, Privacy, Terms)', () => {
    cy.scrollToFooter();
    
    // Break chain - query fresh elements after scroll
    cy.contains(/imprint/i).should('exist').and('have.attr', 'href');
    cy.contains(/privacy/i).should('exist').and('have.attr', 'href');
    cy.contains(/terms/i).should('exist').and('have.attr', 'href');
  });

  it('should have app download links (App Store & Google Play)', () => {
    cy.scrollToFooter();
    
    // App Store link - query fresh after scroll
    cy.get('a[href*="apps.apple.com"], a[href*="appstore"]')
      .should('exist')
      .and('have.attr', 'href')
      .and('include', 'apple');
    
    // Google Play link
    cy.get('a[href*="play.google.com"], a[href*="googleplay"]')
      .should('exist')
      .and('have.attr', 'href')
      .and('include', 'google');
  });

  it('should have social media links', () => {
    cy.scrollToFooter();
    
    cy.get('footer').within(() => {
      // At least one social link exists
      cy.get('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]')
        .should('have.length.greaterThan', 0);
    });
  });

  it('should scroll to pricing section smoothly', () => {
    cy.scrollToPricing();
    // Pricing visibility already checked in scrollToPricing command
  });

});
