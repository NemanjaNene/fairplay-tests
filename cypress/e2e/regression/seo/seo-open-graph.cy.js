/**
 * REGRESSION: SEO Open Graph & Social Media Tags
 * Tests Open Graph and Twitter Card meta tags for social sharing
 * Tags: @regression @seo
 * 
 * NOTE: Tests will pass with warnings if tags don't exist (soft validation)
 */

describe('SEO - Open Graph & Social Media', { tags: ['@regression', '@seo'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have Open Graph title', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:title"]');
      
      if ($meta.length > 0) {
        const ogTitle = $meta.attr('content');
        expect(ogTitle).to.not.be.empty;
        cy.task('log', `[SEO] ✅ OG Title: "${ogTitle}"`);
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No og:title meta tag found (recommended for social sharing)');
      }
    });
  });

  it('should have Open Graph description', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:description"]');
      
      if ($meta.length > 0) {
        const ogDesc = $meta.attr('content');
        expect(ogDesc).to.not.be.empty;
        expect(ogDesc.length).to.be.greaterThan(50);
        cy.task('log', `[SEO] ✅ OG Description: "${ogDesc}"`);
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No og:description meta tag found (recommended for social sharing)');
      }
    });
  });

  it('should have Open Graph image', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:image"]');
      
      if ($meta.length > 0) {
        const ogImage = $meta.attr('content');
        expect(ogImage).to.include('http');
        cy.task('log', `[SEO] ✅ OG Image: ${ogImage}`);
        
        // Verify image is accessible
        cy.request(ogImage).then((response) => {
          expect(response.status).to.eq(200);
          cy.task('log', '[SEO] ✅ OG Image is accessible');
        });
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No og:image meta tag found (recommended for social sharing)');
      }
    });
  });

  it('should have Open Graph URL', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:url"]');
      
      if ($meta.length > 0) {
        const ogUrl = $meta.attr('content');
        expect(ogUrl).to.include('https://');
        cy.task('log', `[SEO] ✅ OG URL: ${ogUrl}`);
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No og:url meta tag found (recommended for social sharing)');
      }
    });
  });

  it('should have Open Graph type', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:type"]');
      
      if ($meta.length > 0) {
        const ogType = $meta.attr('content');
        cy.task('log', `[SEO] ✅ OG Type: ${ogType}`);
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No og:type meta tag found (recommended for social sharing)');
      }
    });
  });

  it('should have Open Graph site name', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[property="og:site_name"]');
      
      if ($meta.length > 0) {
        const siteName = $meta.attr('content');
        cy.task('log', `[SEO] ✅ OG Site Name: ${siteName}`);
      } else {
        cy.task('log', '[SEO] ⚠️ INFO: No og:site_name meta tag (optional but recommended)');
      }
    });
  });

  it('should have Twitter Card tags', () => {
    cy.get('body').then($body => {
      const $meta = $body.find('meta[name="twitter:card"]');
      
      if ($meta.length > 0) {
        const cardType = $meta.attr('content');
        cy.task('log', `[SEO] ✅ Twitter Card Type: ${cardType}`);
        
        // Should be one of the valid types
        const validTypes = ['summary', 'summary_large_image', 'app', 'player'];
        expect(validTypes).to.include(cardType);
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No twitter:card meta tag found (recommended for Twitter sharing)');
      }
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
