/**
 * REGRESSION: SEO Meta Tags Validation
 * Tests all critical SEO meta tags for proper configuration
 * Tags: @regression @seo
 */

describe('SEO - Meta Tags Validation', { tags: ['@regression', '@seo'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have a proper page title', () => {
    cy.title().then(title => {
      // Title should exist
      expect(title).to.not.be.empty;
      cy.task('log', `[SEO] Page Title: "${title}"`);
      
      // Title length should be optimal for search results (50-60 chars)
      expect(title.length).to.be.greaterThan(10);
      expect(title.length).to.be.lessThan(65);
      cy.task('log', `[SEO] Title length: ${title.length} characters (optimal: 50-60)`);
      
      // Should contain brand/relevant keywords
      const hasBrand = title.toLowerCase().includes('fairplay') || 
                       title.toLowerCase().includes('esim');
      expect(hasBrand).to.be.true;
    });
  });

  it('should have a proper meta description', () => {
    cy.get('body').then($body => {
      const metaDesc = $body.find('meta[name="description"]');
      
      if (metaDesc.length > 0) {
        const description = metaDesc.attr('content');
        
        if (description && description.trim().length > 0) {
          cy.task('log', `[SEO] Meta Description: "${description}"`);
          
          // Description length should be optimal (120-160 chars)
          if (description.length < 50) {
            cy.task('log', `[WARNING] Description too short: ${description.length} chars (recommended: 120-160)`);
          } else if (description.length > 165) {
            cy.task('log', `[WARNING] Description too long: ${description.length} chars (recommended: 120-160)`);
          } else {
            cy.task('log', `[SEO] Description length: ${description.length} characters (optimal)`);
          }
          
          // Soft assertion - at least 30 chars
          expect(description.length).to.be.greaterThan(30);
        } else {
          cy.task('log', '[WARNING] Meta description tag exists but content is empty');
          expect(true).to.be.false; // Fail test
        }
      } else {
        cy.task('log', '[FAIL] No meta description tag found');
        expect(false).to.be.true; // Fail test
      }
    });
  });

  it('should have viewport meta tag for mobile', () => {
    cy.get('meta[name="viewport"]')
      .should('exist')
      .and('have.attr', 'content')
      .and('include', 'width=device-width');
    
    cy.task('log', '[SEO] Mobile viewport meta tag found');
  });

  it('should have charset meta tag', () => {
    cy.get('meta[charset]')
      .should('exist')
      .invoke('attr', 'charset')
      .then(charset => {
        expect(charset.toLowerCase()).to.equal('utf-8');
        cy.task('log', `[SEO] Charset: ${charset}`);
      });
  });

  it('should have canonical URL', () => {
    cy.get('link[rel="canonical"]').should('exist').then($link => {
      const canonical = $link.attr('href');
      expect(canonical).to.include('https://');
      cy.task('log', `[SEO] Canonical URL: ${canonical}`);
    });
  });

  it('should have language meta tag', () => {
    cy.get('html').should('have.attr', 'lang').then(lang => {
      expect(lang).to.not.be.empty;
      cy.task('log', `[SEO] Language: ${lang}`);
    });
  });

  it('should have favicon', () => {
    cy.get('link[rel*="icon"]').should('exist').then($links => {
      cy.task('log', `[SEO] Found ${$links.length} favicon link(s)`);
    });
  });

  it('should have theme color for mobile', () => {
    cy.get('body').then($body => {
      const hasThemeColor = $body.find('meta[name="theme-color"]').length > 0;
      if (hasThemeColor) {
        cy.get('meta[name="theme-color"]').invoke('attr', 'content').then(color => {
          cy.task('log', `[SEO] Theme color: ${color}`);
        });
      } else {
        cy.task('log', '[WARNING] No theme-color meta tag (recommended for mobile)');
      }
    });
  });

  it('should have proper heading structure (H1)', () => {
    cy.get('h1').then($h1s => {
      // Should have at least one H1
      expect($h1s.length).to.be.greaterThan(0);
      cy.task('log', `[SEO] Found ${$h1s.length} H1 tag(s)`);
      
      // Ideally should have only one H1
      if ($h1s.length > 1) {
        cy.task('log', '[WARNING] Multiple H1 tags found (best practice: use only 1)');
      }
      
      // H1 should not be empty
      $h1s.each((index, h1) => {
        const text = Cypress.$(h1).text().trim();
        expect(text).to.not.be.empty;
        cy.task('log', `[SEO] H1 text: "${text}"`);
      });
    });
  });

  it('should have alt attributes on images', () => {
    cy.get('img').then($images => {
      const totalImages = $images.length;
      cy.task('log', `[SEO] Checking ${totalImages} images for alt attributes`);
      
      if (totalImages === 0) {
        cy.task('log', '[INFO] No images found on page');
        return; // Skip test if no images
      }
      
      let missingAlt = 0;
      $images.each((index, img) => {
        const alt = Cypress.$(img).attr('alt');
        if (!alt || alt.trim() === '') {
          missingAlt++;
        }
      });
      
      const imagesWithAlt = totalImages - missingAlt;
      const percentageWithAlt = ((imagesWithAlt / totalImages) * 100).toFixed(1);
      
      cy.task('log', `[SEO] Images with alt text: ${imagesWithAlt}/${totalImages} (${percentageWithAlt}%)`);
      
      // At least 70% of images should have alt text
      const percentage = parseFloat(percentageWithAlt);
      if (percentage < 70) {
        cy.task('log', `[WARNING] Only ${percentageWithAlt}% of images have alt text (recommended: 80%+)`);
      }
      
      expect(percentage).to.be.greaterThan(50);
    });
  });

});
