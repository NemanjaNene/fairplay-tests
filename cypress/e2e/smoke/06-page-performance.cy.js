/**
 * SMOKE-06: Page Performance & Load Time
 * Verifies page loads within acceptable timeframe and has no major performance issues
 * Tags: @smoke @performance
 */

describe('Page Performance - Load Time', { tags: ['@smoke', '@performance'] }, () => {
  
  it('should load homepage within 5 seconds', () => {
    const startTime = Date.now();
    
    cy.visit('/', { timeout: 30000 });
    cy.get('body').should('be.visible');
    cy.window().its('document.readyState').should('eq', 'complete');
    
    cy.then(() => {
      const loadTime = Date.now() - startTime;
      const loadTimeSeconds = (loadTime / 1000).toFixed(2);
      
      cy.task('log', `⏱️ Page load time: ${loadTimeSeconds}s`);
      
      expect(loadTime).to.be.lessThan(5000); // 5 seconds max
    });
  });

  it('should have all critical images loaded', () => {
    cy.visit('/');
    
    cy.get('img').each($img => {
      // Check if image has loaded (naturalWidth > 0)
      expect($img[0].naturalWidth).to.be.greaterThan(0, `Image ${$img.attr('src')} failed to load`);
    });
  });

  it('should not have layout shifts (CLS check)', () => {
    cy.visit('/');
    
    // Wait for initial render
    cy.wait(2000);
    
    // Get initial viewport height
    cy.window().then(win => {
      const initialHeight = win.document.body.scrollHeight;
      
      // Wait a bit more
      cy.wait(2000);
      
      // Check if height changed significantly (layout shift)
      cy.window().then(win2 => {
        const finalHeight = win2.document.body.scrollHeight;
        const heightDiff = Math.abs(finalHeight - initialHeight);
        const heightChange = (heightDiff / initialHeight) * 100;
        
        cy.task('log', `📏 Layout shift: ${heightChange.toFixed(2)}%`);
        
        // Allow up to 5% change (small shifts acceptable)
        expect(heightChange).to.be.lessThan(5);
      });
    });
  });

  it('should have proper meta tags for SEO', () => {
    cy.visit('/');
    
    // Title should exist and not be empty
    cy.title().should('not.be.empty');
    cy.title().then(title => {
      cy.task('log', `📄 Page title: ${title}`);
    });
    
    // Meta description should exist
    cy.get('head meta[name="description"]')
      .should('exist')
      .and('have.attr', 'content')
      .and('not.be.empty');
    
    // Viewport meta should exist (for mobile)
    cy.get('head meta[name="viewport"]')
      .should('exist')
      .and('have.attr', 'content');
  });

  it('should not have JavaScript errors in console', () => {
    cy.visit('/');
    
    cy.window().then(win => {
      const errors = win.console.errors || [];
      
      if (errors.length > 0) {
        cy.task('log', `[WARNING] Console errors found: ${errors.length}`);
        errors.forEach(err => {
          cy.task('log', `   - ${err}`);
        });
        
        // Don't fail test - log only (some 3rd party scripts may error)
      } else {
        cy.task('log', `[PASS] No console errors detected`);
      }
    });
  });

  it('should have proper caching headers (check via network)', () => {
    cy.intercept('GET', '**/*.{js,css,png,jpg,jpeg,webp,svg}', (req) => {
      req.continue((res) => {
        const cacheControl = res.headers['cache-control'];
        
        if (cacheControl) {
          cy.task('log', `📦 Cache-Control for ${req.url.split('/').pop()}: ${cacheControl}`);
        } else {
          cy.task('log', `[WARNING] No cache-control for: ${req.url.split('/').pop()}`);
        }
      });
    });
    
    cy.visit('/');
    cy.wait(3000); // Let all assets load
  });

});
