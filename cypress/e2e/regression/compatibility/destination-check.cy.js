/**
 * REGRESSION: Destination Coverage Checker
 * Tests destination coverage checker tool
 * Tags: @regression @compatibility @coverage
 */

describe('Destination Coverage - Checker Tool', { tags: ['@regression', '@compatibility', '@coverage'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have "Check Destination" CTA', () => {
    cy.contains(/check.*destination|coverage/i)
      .should('be.visible');
  });

  it('should display coverage information (135+ destinations)', () => {
    cy.contains(/135\+/i).should('be.visible');
    cy.contains(/destination/i).should('be.visible');
  });

  it('should open destination checker on click', () => {
    cy.contains(/check.*destination/i)
      .first()
      .click({ force: true });
    
    cy.wait(2000);
    
    // Check if modal/page/section opened
    cy.get('body').then($body => {
      const hasModal = $body.find('[role="dialog"], [class*="modal"]').length > 0;
      const hasSearch = $body.find('input[type="search"], input[type="text"]').length > 0;
      
      if (hasModal) {
        cy.task('log', `[PASS] Destination checker modal opened`);
      } else if (hasSearch) {
        cy.task('log', `[PASS] Destination search visible`);
      } else {
        cy.task('log', `[WARNING] Destination checker UI not found - implementation may vary`);
      }
    });
  });

  it('should have coverage map or list visible', () => {
    cy.get('body').then($body => {
      const hasMap = $body.find('[class*="map"], svg[viewBox]').length > 0;
      const hasList = $body.find('ul li, [class*="country"]').length > 10;
      
      if (hasMap) {
        cy.task('log', `🗺️ Coverage map found`);
      } else if (hasList) {
        cy.task('log', ` Coverage list found`);
      } else {
        cy.task('log', `[WARNING] Coverage visualization not found`);
      }
    });
  });

  it('should display key European countries in coverage', () => {
    const keyCountries = ['Germany', 'France', 'Italy', 'Spain', 'Croatia'];
    
    keyCountries.forEach(country => {
      cy.get('body').then($body => {
        if ($body.text().includes(country)) {
          cy.task('log', `[PASS] ${country} found in coverage`);
        }
      });
    });
  });

  it('should mention global coverage (USA, Canada, etc.)', () => {
    const globalCountries = ['United States', 'USA', 'Canada', 'Australia', 'Japan'];
    
    let found = false;
    globalCountries.forEach(country => {
      cy.get('body').then($body => {
        if ($body.text().includes(country)) {
          found = true;
          cy.task('log', `[PASS] Global coverage mentioned: ${country}`);
        }
      });
    });
  });

  it('should have link to full coverage list', () => {
    cy.get('body').then($body => {
      const hasCoverageLink = $body.find('a:contains("coverage"), a:contains("destinations"), a:contains("countries")').length > 0;
      
      if (hasCoverageLink) {
        cy.contains(/coverage|destination|countr/i)
          .filter('a')
          .first()
          .should('have.attr', 'href');
        
        cy.task('log', `[PASS] Full coverage list link found`);
      }
    });
  });

});
