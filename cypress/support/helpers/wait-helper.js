/**
 * Wait Helper
 * Smart waiting strategies (NO hard sleeps!)
 */

/**
 * Wait for element to be stable (not moving/changing)
 */
export const waitForStableElement = (selector, timeout = 5000) => {
  cy.get(selector, { timeout }).then($el => {
    const initialPosition = $el.offset();
    const initialText = $el.text();
    
    cy.wait(200); // Small buffer
    
    cy.get(selector).then($el2 => {
      const newPosition = $el2.offset();
      const newText = $el2.text();
      
      expect(newPosition.top).to.equal(initialPosition.top);
      expect(newPosition.left).to.equal(initialPosition.left);
      expect(newText).to.equal(initialText);
    });
  });
};

/**
 * Wait for loading spinner to disappear
 */
export const waitForLoadingComplete = () => {
  const spinnerSelectors = [
    '[data-testid="spinner"]',
    '[data-testid="loading"]',
    '[class*="spinner"]',
    '[class*="loading"]',
    '.loader'
  ];
  
  spinnerSelectors.forEach(selector => {
    cy.get('body').then($body => {
      if ($body.find(selector).length > 0) {
        cy.get(selector, { timeout: 10000 }).should('not.exist');
      }
    });
  });
};

/**
 * Wait for modal to fully appear (opacity = 1, no transitions)
 */
export const waitForModalVisible = (modalSelector) => {
  cy.get(modalSelector, { timeout: 5000 })
    .should('be.visible')
    .and('have.css', 'opacity', '1');
};

/**
 * Wait for page navigation to complete
 */
export const waitForNavigation = (expectedUrlPattern) => {
  cy.url({ timeout: 10000 }).should('match', expectedUrlPattern);
  cy.window().its('document.readyState').should('eq', 'complete');
};
