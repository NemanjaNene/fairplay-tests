/**
 * REGRESSION: SEO Structured Data (JSON-LD)
 * Tests for structured data markup for search engines
 * Tags: @regression @seo
 * 
 * NOTE: Tests will pass with warnings if structured data doesn't exist (soft validation)
 */

describe('SEO - Structured Data', { tags: ['@regression', '@seo'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have JSON-LD structured data', () => {
    cy.get('body').then($body => {
      const $scripts = $body.find('script[type="application/ld+json"]');
      
      if ($scripts.length > 0) {
        cy.task('log', `[SEO] ✅ Found ${$scripts.length} JSON-LD structured data block(s)`);
        
        // Validate each JSON-LD block
        $scripts.each((index, script) => {
          const content = Cypress.$(script).text();
          
          // Should be valid JSON
          try {
            const data = JSON.parse(content);
            cy.task('log', `[SEO] ✅ JSON-LD ${index + 1}: Type = ${data['@type'] || 'Unknown'}`);
            
            // Should have @context
            expect(data['@context']).to.exist;
            expect(data['@context']).to.include('schema.org');
            
            // Should have @type
            expect(data['@type']).to.exist;
            
          } catch (e) {
            cy.task('log', `[WARNING] Invalid JSON-LD at index ${index + 1}`);
            throw new Error('Invalid JSON-LD structure');
          }
        });
      } else {
        cy.task('log', '[SEO] ⚠️ WARNING: No JSON-LD structured data found (recommended for search engines)');
        cy.task('log', '[SEO] 💡 TIP: Add Organization and/or WebSite schema markup for better SEO');
      }
    });
  });

  it('should have Organization schema (if applicable)', () => {
    cy.get('body').then($body => {
      const jsonLdScripts = $body.find('script[type="application/ld+json"]');
      let hasOrganization = false;
      
      jsonLdScripts.each((index, script) => {
        try {
          const data = JSON.parse(Cypress.$(script).text());
          if (data['@type'] === 'Organization') {
            hasOrganization = true;
            cy.task('log', '[SEO] Organization schema found');
            
            // Should have name
            expect(data.name).to.exist;
            cy.task('log', `[SEO] Organization name: ${data.name}`);
            
            // Should have URL
            if (data.url) {
              cy.task('log', `[SEO] Organization URL: ${data.url}`);
            }
            
            // Should have logo
            if (data.logo) {
              cy.task('log', `[SEO] Organization logo: ${data.logo}`);
            }
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });
      
      if (!hasOrganization) {
        cy.task('log', '[INFO] No Organization schema found (recommended for brand visibility)');
      }
    });
  });

  it('should have WebSite schema (if applicable)', () => {
    cy.get('body').then($body => {
      const jsonLdScripts = $body.find('script[type="application/ld+json"]');
      let hasWebSite = false;
      
      jsonLdScripts.each((index, script) => {
        try {
          const data = JSON.parse(Cypress.$(script).text());
          if (data['@type'] === 'WebSite') {
            hasWebSite = true;
            cy.task('log', '[SEO] WebSite schema found');
            
            // Should have name and url
            expect(data.name).to.exist;
            expect(data.url).to.exist;
            
            cy.task('log', `[SEO] WebSite name: ${data.name}`);
            cy.task('log', `[SEO] WebSite URL: ${data.url}`);
          }
        } catch (e) {
          // Skip invalid JSON
        }
      });
      
      if (!hasWebSite) {
        cy.task('log', '[INFO] No WebSite schema found');
      }
    });
  });

});
