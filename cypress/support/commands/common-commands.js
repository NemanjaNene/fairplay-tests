/**
 * Common Commands
 * Reusable Cypress commands for general actions
 */

/**
 * Dismiss cookie banner if present
 */
Cypress.Commands.add('dismissCookieBanner', () => {
  cy.get('body', { timeout: 3000 }).then(($body) => {
    // Try to find and dismiss cookie banner (multiple patterns)
    const bodyText = $body.text().toLowerCase();
    
    // Check if cookie-related element exists
    if ($body.find('[id*="cookie"], [class*="cookie"], [data-testid*="cookie"]').length > 0) {
      // Try common "Accept" buttons
      if ($body.find('button').filter(':contains("Accept"), :contains("Agree"), :contains("OK")').length > 0) {
        cy.get('button').contains(/Accept|Agree|OK/i).first().click({ force: true });
        cy.wait(500);
      }
    }
    
    // Common cookie consent selectors
    const commonSelectors = [
      '#usercentrics-root button',
      '[class*="cookie"] button',
      '[id*="cookie"] button',
      '[data-testid="cookie-accept"]'
    ];
    
    commonSelectors.forEach(selector => {
      if ($body.find(selector).length > 0) {
        cy.get(selector).first().click({ force: true });
        cy.wait(500);
      }
    });
  });
});

/**
 * Wait for page to be fully loaded
 */
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('be.visible');
  
  // Wait for common loading indicators to disappear
  cy.get('[data-testid="spinner"]', { timeout: 1000 }).should('not.exist');
  cy.get('[class*="loading"]', { timeout: 1000 }).should('not.exist');
  cy.get('[class*="spinner"]', { timeout: 1000 }).should('not.exist');
  
  // Check document ready state
  cy.window().its('document.readyState').should('eq', 'complete');
});

/**
 * Verify no console errors (warning only, doesn't fail test)
 */
Cypress.Commands.add('checkConsoleErrors', () => {
  cy.window().then((win) => {
    const errors = win.console.errors || [];
    if (errors.length > 0) {
      cy.log(`⚠️ Console errors detected: ${errors.length}`);
      errors.forEach(err => cy.log(`   - ${err}`));
    }
  });
});

/**
 * Scroll element into view with retry
 */
Cypress.Commands.add('scrollToElement', { prevSubject: true }, (subject) => {
  cy.wrap(subject).scrollIntoView({ duration: 500 });
  cy.wrap(subject).should('be.visible');
  return cy.wrap(subject);
});

/**
 * Click with retry logic for flaky elements
 */
Cypress.Commands.add('clickWithRetry', { prevSubject: 'optional' }, (subject, selector, options = {}) => {
  const element = subject ? cy.wrap(subject) : cy.get(selector);
  const maxRetries = options.retries || 3;
  
  const attemptClick = (attempt = 1) => {
    element.then(($el) => {
      if ($el.is(':visible') && !$el.is(':disabled')) {
        cy.wrap($el).click(options);
      } else if (attempt < maxRetries) {
        cy.wait(1000);
        attemptClick(attempt + 1);
      } else {
        throw new Error(`Failed to click element after ${maxRetries} attempts`);
      }
    });
  };
  
  attemptClick();
});

/**
 * Type with clear (ensures input is empty first)
 */
Cypress.Commands.add('typeWithClear', { prevSubject: true }, (subject, text, options = {}) => {
  cy.wrap(subject).clear().type(text, options);
  return cy.wrap(subject);
});

/**
 * Verify element visible and contains text
 */
Cypress.Commands.add('shouldBeVisibleAndContain', { prevSubject: true }, (subject, text) => {
  cy.wrap(subject).should('be.visible').and('contain', text);
  return cy.wrap(subject);
});

/**
 * Check if element exists (doesn't fail if not found)
 */
Cypress.Commands.add('ifExists', { prevSubject: true }, (subject, callback) => {
  cy.wrap(subject).then(($el) => {
    if ($el.length > 0) {
      callback($el);
    }
  });
  return cy.wrap(subject);
});

/**
 * Wait for network idle (no pending XHR/fetch requests)
 */
Cypress.Commands.add('waitForNetworkIdle', (timeout = 5000) => {
  let requestCount = 0;
  
  cy.intercept('**/*', (req) => {
    requestCount++;
    req.continue((res) => {
      requestCount--;
    });
  });
  
  cy.waitUntil(() => requestCount === 0, { timeout });
});

/**
 * Take screenshot with custom name
 */
Cypress.Commands.add('screenshotWithName', (name) => {
  const testName = Cypress.currentTest.titlePath.join(' - ');
  cy.screenshot(`${testName} - ${name}`);
});
