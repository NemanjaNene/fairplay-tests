// Import commands
import './commands/common-commands';
import './commands/navigation-commands';
import './commands/cookie-commands';
// import './commands/auth-commands'; // Prepared for future login testing
// import './commands/payment-commands'; // Prepared for future payment testing
import './commands/referral-commands'; // Referral & Affiliate prepared

// Import helpers
import { disableAnimations } from './helpers/animation-helper';
import { logTestInfo } from './helpers/logging-helper';

// Global configuration
Cypress.on('uncaught:exception', (err, runnable) => {
  // Don't fail tests on uncaught exceptions from the app
  // (analytics scripts, 3rd party widgets, etc.)
  console.warn('Uncaught exception:', err.message);
  return false;
});

// Before each test
beforeEach(() => {
  // Disable animations for stability
  disableAnimations();
  
  // Log test start
  const testName = Cypress.currentTest.title;
  cy.task('log', `🚀 Starting test: ${testName}`);
  
  // Dismiss cookie banner automatically
  cy.dismissCookieBanner();
});

// After each test
afterEach(function() {
  const testState = this.currentTest.state;
  const testName = this.currentTest.title;
  
  if (testState === 'failed') {
    // Log failure details
    cy.url().then(url => {
      cy.task('logFailure', {
        testName,
        error: this.currentTest.err.message,
        url,
        timestamp: new Date().toISOString()
      });
    });
    
    // Capture console errors
    cy.window().then((win) => {
      const errors = win.console.errors || [];
      if (errors.length > 0) {
        cy.task('log', `⚠️ Console errors: ${JSON.stringify(errors)}`);
      }
    });
  } else {
    cy.task('log', `✅ Test passed: ${testName}`);
  }
});

// Track console errors
Cypress.on('window:before:load', (win) => {
  win.console.errors = [];
  const originalError = win.console.error;
  win.console.error = function(...args) {
    win.console.errors.push(args.join(' '));
    return originalError.apply(this, args);
  };
});
