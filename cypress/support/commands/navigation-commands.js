/**
 * Navigation Commands
 * Commands for navigating the FairPlay website
 */

/**
 * Visit homepage and verify it loaded
 */
Cypress.Commands.add('visitHomepage', () => {
  cy.visit('/');
  cy.waitForPageLoad();
  cy.url().should('eq', Cypress.config('baseUrl') + '/');
});

/**
 * Navigate to FairPlay Flex plans section
 */
Cypress.Commands.add('navigateToFlexPlans', () => {
  cy.get('a, button').contains(/FairPlay Flex|Frequent Travellers/i).click();
  cy.url().should('include', 'flex').or('include', 'subscription');
});

/**
 * Navigate to Day Passes section
 */
Cypress.Commands.add('navigateToDayPasses', () => {
  cy.get('a, button').contains(/Day Pass|Short Trip/i).click();
  cy.url().should('include', 'pass').or('include', 'holiday');
});

/**
 * Open Help Center
 */
Cypress.Commands.add('openHelpCenter', () => {
  cy.get('a[href*="help"]').first().click();
  cy.url().should('include', 'help');
});

/**
 * Navigate to Account Login (prepared for future)
 */
Cypress.Commands.add('navigateToLogin', () => {
  cy.get('a').contains(/Account Login|Login|Sign In/i).click();
  cy.url().should('match', /login|signin|account/i);
});

/**
 * Scroll to pricing section
 * Note: Break chain to prevent "element detached from DOM" error
 */
Cypress.Commands.add('scrollToPricing', () => {
  // Scroll WITHOUT chaining assertion
  cy.contains(/starting at|€ 25|month subscription/i)
    .scrollIntoView({ duration: 500 });
  
  // Wait for scroll animation
  cy.wait(600);
  
  // Re-query element after scroll
  cy.contains(/€\s*25|€\s*30|€\s*35/i).should('be.visible');
});

/**
 * Scroll to footer
 * Note: Break chain to prevent "element detached from DOM" error
 */
Cypress.Commands.add('scrollToFooter', () => {
  // Scroll to footer WITHOUT chaining assertion
  cy.get('footer').scrollIntoView({ duration: 500 });
  
  // Wait for scroll animation to complete
  cy.wait(600);
  
  // Then re-query footer (fresh element reference)
  cy.get('footer').should('be.visible');
});

/**
 * Check destination coverage (if form exists)
 */
Cypress.Commands.add('checkDestination', (country) => {
  cy.contains(/check.*destination|coverage/i).click({ force: true });
  
  // Try to find search input
  cy.get('input[type="text"], input[type="search"]', { timeout: 5000 })
    .first()
    .typeWithClear(country);
  
  // Wait for results
  cy.wait(2000);
  
  // Verify result (flexible - depends on UI)
  cy.get('body').should('contain', country);
});

/**
 * Check phone compatibility (if form exists)
 */
Cypress.Commands.add('checkPhoneCompatibility', (brand, model) => {
  cy.contains(/check.*phone|esim compatible/i).click({ force: true });
  
  // Try to select brand (dropdown or input)
  cy.get('select, input').first().then(($el) => {
    if ($el.is('select')) {
      cy.wrap($el).select(brand);
    } else {
      cy.wrap($el).typeWithClear(brand);
    }
  });
  
  // Try to select model
  cy.get('select, input').eq(1).then(($el) => {
    if ($el.is('select')) {
      cy.wrap($el).select(model);
    } else {
      cy.wrap($el).typeWithClear(model);
    }
  });
  
  // Wait for result
  cy.wait(2000);
});
