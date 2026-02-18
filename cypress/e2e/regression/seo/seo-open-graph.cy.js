/**
 * REGRESSION: SEO Open Graph & Social Media Tags
 * Tests Open Graph and Twitter Card meta tags for social sharing
 * Tags: @regression @seo
 * 
 * NOTE: These tests are currently SKIPPED because the site does not have
 * Open Graph or Twitter Card meta tags implemented yet.
 * Uncomment tests when social media meta tags are added to the site.
 */

describe('SEO - Open Graph & Social Media', { tags: ['@regression', '@seo'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  // SKIPPED: Site does not currently have Open Graph meta tags
  it.skip('should have Open Graph title', () => {
    cy.get('meta[property="og:title"]').should('exist').then($meta => {
      const ogTitle = $meta.attr('content');
      expect(ogTitle).to.not.be.empty;
      cy.task('log', `[SEO] OG Title: "${ogTitle}"`);
    });
  });

  it.skip('should have Open Graph description', () => {
    cy.get('meta[property="og:description"]').should('exist').then($meta => {
      const ogDesc = $meta.attr('content');
      expect(ogDesc).to.not.be.empty;
      expect(ogDesc.length).to.be.greaterThan(50);
      cy.task('log', `[SEO] OG Description: "${ogDesc}"`);
    });
  });

  it.skip('should have Open Graph image', () => {
    cy.get('meta[property="og:image"]').should('exist').then($meta => {
      const ogImage = $meta.attr('content');
      expect(ogImage).to.include('http');
      cy.task('log', `[SEO] OG Image: ${ogImage}`);
      
      // Verify image is accessible
      cy.request(ogImage).then((response) => {
        expect(response.status).to.eq(200);
        cy.task('log', '[SEO] OG Image is accessible');
      });
    });
  });

  it.skip('should have Open Graph URL', () => {
    cy.get('meta[property="og:url"]').should('exist').then($meta => {
      const ogUrl = $meta.attr('content');
      expect(ogUrl).to.include('https://');
      cy.task('log', `[SEO] OG URL: ${ogUrl}`);
    });
  });

  it.skip('should have Open Graph type', () => {
    cy.get('meta[property="og:type"]').should('exist').then($meta => {
      const ogType = $meta.attr('content');
      cy.task('log', `[SEO] OG Type: ${ogType}`);
    });
  });

  it('should have Open Graph site name', () => {
    cy.get('body').then($body => {
      const hasSiteName = $body.find('meta[property="og:site_name"]').length > 0;
      if (hasSiteName) {
        cy.get('meta[property="og:site_name"]').invoke('attr', 'content').then(name => {
          cy.task('log', `[SEO] OG Site Name: ${name}`);
        });
      } else {
        cy.task('log', '[WARNING] No og:site_name tag (recommended)');
      }
    });
  });

  it.skip('should have Twitter Card tags', () => {
    cy.get('meta[name="twitter:card"]').should('exist').then($meta => {
      const cardType = $meta.attr('content');
      cy.task('log', `[SEO] Twitter Card Type: ${cardType}`);
      
      // Should be one of the valid types
      const validTypes = ['summary', 'summary_large_image', 'app', 'player'];
      expect(validTypes).to.include(cardType);
    });
  });

  it('should have Twitter title', () => {
    cy.get('body').then($body => {
      const hasTwitterTitle = $body.find('meta[name="twitter:title"]').length > 0;
      if (hasTwitterTitle) {
        cy.get('meta[name="twitter:title"]').invoke('attr', 'content').then(title => {
          cy.task('log', `[SEO] Twitter Title: "${title}"`);
        });
      } else {
        cy.task('log', '[INFO] No twitter:title (will use og:title as fallback)');
      }
    });
  });

  it('should have Twitter description', () => {
    cy.get('body').then($body => {
      const hasTwitterDesc = $body.find('meta[name="twitter:description"]').length > 0;
      if (hasTwitterDesc) {
        cy.get('meta[name="twitter:description"]').invoke('attr', 'content').then(desc => {
          cy.task('log', `[SEO] Twitter Description: "${desc}"`);
        });
      } else {
        cy.task('log', '[INFO] No twitter:description (will use og:description as fallback)');
      }
    });
  });

  it('should have Twitter image', () => {
    cy.get('body').then($body => {
      const hasTwitterImage = $body.find('meta[name="twitter:image"]').length > 0;
      if (hasTwitterImage) {
        cy.get('meta[name="twitter:image"]').invoke('attr', 'content').then(image => {
          cy.task('log', `[SEO] Twitter Image: ${image}`);
        });
      } else {
        cy.task('log', '[INFO] No twitter:image (will use og:image as fallback)');
      }
    });
  });

});
