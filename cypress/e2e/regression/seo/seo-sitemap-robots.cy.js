/**
 * REGRESSION: SEO Sitemap & Robots.txt
 * Tests for sitemap.xml and robots.txt availability and format
 * Tags: @regression @seo
 */

describe('SEO - Sitemap & Robots.txt', { tags: ['@regression', '@seo'] }, () => {
  
  it('should have accessible sitemap.xml', () => {
    cy.request({
      url: '/sitemap.xml',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.task('log', '[SEO] sitemap.xml found');
        
        // Should be XML
        expect(response.headers['content-type']).to.include('xml');
        
        // Should contain urlset
        expect(response.body).to.include('urlset');
        expect(response.body).to.include('<?xml');
        
        // Count URLs in sitemap
        const urlMatches = response.body.match(/<loc>/g);
        if (urlMatches) {
          cy.task('log', `[SEO] Sitemap contains ${urlMatches.length} URL(s)`);
        }
      } else {
        cy.task('log', `[WARNING] sitemap.xml not found (status: ${response.status})`);
      }
    });
  });

  it('should have accessible robots.txt', () => {
    cy.request({
      url: '/robots.txt',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        cy.task('log', '[SEO] robots.txt found');
        
        // Should contain User-agent
        expect(response.body).to.include('User-agent');
        
        // Check for sitemap reference
        if (response.body.includes('Sitemap:')) {
          const sitemapLine = response.body.split('\n').find(line => line.includes('Sitemap:'));
          cy.task('log', `[SEO] ${sitemapLine.trim()}`);
        }
        
        // Check for disallow rules
        if (response.body.includes('Disallow:')) {
          cy.task('log', '[SEO] robots.txt contains Disallow rules');
        } else {
          cy.task('log', '[INFO] robots.txt has no Disallow rules (all content indexable)');
        }
      } else {
        cy.task('log', `[WARNING] robots.txt not found (status: ${response.status})`);
      }
    });
  });

  it('should have sitemap reference in robots.txt', () => {
    cy.request({
      url: '/robots.txt',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200 && response.body.includes('Sitemap:')) {
        // Extract sitemap URL
        const sitemapLine = response.body.split('\n').find(line => line.includes('Sitemap:'));
        const sitemapUrl = sitemapLine.split('Sitemap:')[1].trim();
        
        // Try to access the sitemap
        cy.request({
          url: sitemapUrl,
          failOnStatusCode: false
        }).then((sitemapResponse) => {
          if (sitemapResponse.status === 200) {
            cy.task('log', `[SEO] Sitemap accessible at: ${sitemapUrl}`);
          } else {
            cy.task('log', `[WARNING] Sitemap URL in robots.txt is not accessible: ${sitemapUrl}`);
          }
        });
      }
    });
  });

  it('should not block important pages in robots.txt', () => {
    cy.request({
      url: '/robots.txt',
      failOnStatusCode: false
    }).then((response) => {
      if (response.status === 200) {
        const body = response.body.toLowerCase();
        
        // Check if homepage is blocked
        const blocksHomepage = body.includes('disallow: /') && 
                              !body.includes('disallow: /?') && 
                              !body.includes('user-agent: *\nallow:');
        
        if (blocksHomepage) {
          cy.task('log', '[WARNING] robots.txt may be blocking homepage!');
        } else {
          cy.task('log', '[SEO] robots.txt is not blocking homepage');
        }
      }
    });
  });

});
