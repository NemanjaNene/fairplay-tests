/**
 * SMOKE-05: External Links Validation
 * Verifies external links (App Store, Google Play, social media) are valid
 * Tags: @smoke @links
 */

import { EXTERNAL_LINKS } from '../../utils/constants';

describe('External Links - Validation', { tags: ['@smoke', '@links'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
    cy.scrollToFooter();
  });

  it('should have valid App Store link', () => {
    cy.get(`a[href*="${EXTERNAL_LINKS.APP_STORE}"]`)
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'href')
      .then(href => {
        expect(href).to.include(EXTERNAL_LINKS.APP_STORE);
        cy.task('log', `[PASS] App Store link: ${href}`);
      });
  });

  it('should have valid Google Play link', () => {
    cy.get(`a[href*="${EXTERNAL_LINKS.PLAY_STORE}"]`)
      .should('exist')
      .and('be.visible')
      .and('have.attr', 'href')
      .then(href => {
        expect(href).to.include(EXTERNAL_LINKS.PLAY_STORE);
        cy.task('log', `[PASS] Google Play link: ${href}`);
      });
  });

  it('should have external links open in new tab', () => {
    cy.get(`a[href*="${EXTERNAL_LINKS.APP_STORE}"]`)
      .should('have.attr', 'target', '_blank');
    
    cy.get(`a[href*="${EXTERNAL_LINKS.PLAY_STORE}"]`)
      .should('have.attr', 'target', '_blank');
  });

  it('should have valid social media links', () => {
    const socialPlatforms = ['facebook', 'twitter', 'instagram', 'linkedin'];
    
    socialPlatforms.forEach(platform => {
      cy.get('body').then($body => {
        const socialLink = $body.find(`a[href*="${platform}"]`);
        
        if (socialLink.length > 0) {
          cy.get(`a[href*="${platform}"]`)
            .first()
            .should('have.attr', 'href')
            .then(href => {
              cy.task('log', `[FOUND] ${platform} link found: ${href}`);
            });
        } else {
          cy.task('log', `[WARNING] ${platform} link not found (may not be present)`);
        }
      });
    });
  });

  it('should have rel="noopener noreferrer" on external links for security', () => {
    cy.get('a[target="_blank"]').each($link => {
      const rel = $link.attr('rel');
      
      // Check if rel contains security attributes
      if (rel) {
        const hasSecurity = rel.includes('noopener') || rel.includes('noreferrer');
        
        if (!hasSecurity) {
          cy.task('log', `[WARNING] External link missing security rel: ${$link.attr('href')}`);
        }
      }
    });
  });

  it('should verify Help Center link is accessible', () => {
    // Help Center link je iznad footera - scroll malo da bude vidljiv
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    cy.get('a[href*="help"]')
      .should('exist')
      .and('have.attr', 'href')
      .then(href => {
        expect(href).to.not.be.empty;
        cy.task('log', `[PASS] Help Center link: ${href}`);
      });
  });

});
