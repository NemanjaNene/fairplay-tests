/**
 * Cookie Commands
 * Commands for handling cookies (general + referral/affiliate specific)
 * 
 * Note: Cypress already has built-in cookie commands:
 * - cy.setCookie(name, value, options)
 * - cy.getCookie(name)
 * - cy.getCookies()
 * - cy.clearCookie(name)
 * - cy.clearCookies()
 * 
 * We only add custom commands that extend functionality
 */

/**
 * Verify cookie exists
 */
Cypress.Commands.add('verifyCookieExists', (name) => {
  cy.getCookie(name).should('exist');
});

/**
 * Verify cookie value
 */
Cypress.Commands.add('verifyCookieValue', (name, expectedValue) => {
  cy.getCookie(name).should('have.property', 'value', expectedValue);
});
