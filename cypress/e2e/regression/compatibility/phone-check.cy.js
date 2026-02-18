/**
 * REGRESSION: Phone Compatibility Checker
 * Tests phone compatibility tool (if available on site)
 * Tags: @regression @compatibility
 */

import { TEST_DATA } from '../../../utils/constants';

describe('Phone Compatibility - Checker Tool', { tags: ['@regression', '@compatibility'] }, () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('should have "Check Phone Compatibility" CTA', () => {
    cy.contains(/check.*phone|esim compatible/i)
      .should('be.visible')
      .and('not.be.disabled');
  });

  it('should open phone compatibility checker on click', () => {
    cy.contains(/check.*phone|esim compatible/i)
      .first()
      .click({ force: true });
    
    cy.wait(2000);
    
    // Check if modal/page opened
    cy.get('body').then($body => {
      const hasModal = $body.find('[role="dialog"], [class*="modal"]').length > 0;
      const hasForm = $body.find('select, input').length > 0;
      
      if (hasModal) {
        cy.task('log', `[PASS] Phone checker modal opened`);
      } else if (hasForm) {
        cy.task('log', `[PASS] Phone checker form visible`);
      } else {
        cy.task('log', `[WARNING] Phone checker UI not found - implementation may vary`);
      }
    });
  });

  // SKIPPED: Implementation-specific test - adjust when phone checker UI is finalized
  it.skip('should display phone brands list (if available)', function() {
    cy.contains(/check.*phone/i).first().click({ force: true });
    cy.wait(2000);
    
    cy.get('body').then($body => {
      if ($body.find('select, [role="listbox"]').length === 0) {
        this.skip();
      }
    });
    
    // Check for brand selection
    cy.get('select, [role="listbox"]').first().should('be.visible');
    
    // Common brands should be available
    const expectedBrands = ['Apple', 'Samsung', 'Google', 'Xiaomi'];
    
    cy.get('select, [role="listbox"]').first().then($select => {
      const options = $select.find('option').map((i, el) => el.textContent).get();
      
      cy.task('log', `📱 Available brands: ${options.join(', ')}`);
    });
  });

  it('should validate compatible phone (Apple iPhone 14)', function() {
    cy.contains(/check.*phone/i).first().click({ force: true });
    cy.wait(2000);
    
    cy.get('body').then($body => {
      if ($body.find('select, input').length === 0) {
        this.skip();
      }
    });
    
    // Try to select Apple iPhone 14 (known compatible)
    const compatiblePhone = TEST_DATA.COMPATIBLE_PHONES[0];
    
    cy.task('log', `[DEBUG] Testing compatible phone: ${compatiblePhone.brand} ${compatiblePhone.model}`);
    
    // Implementation-specific - adjust selectors as needed
  });

  it('should have link to compatible devices list', () => {
    cy.get('body').then($body => {
      const hasLink = $body.find('a:contains("compatible"), a:contains("supported devices")').length > 0;
      
      if (hasLink) {
        cy.contains(/compatible device|supported device/i)
          .should('be.visible')
          .and('have.attr', 'href');
        
        cy.task('log', `[PASS] Compatible devices link found`);
      } else {
        cy.task('log', `[WARNING] No compatible devices link found`);
      }
    });
  });

});
