/**
 * Authentication Commands
 * TEMPLATE FOR FUTURE: Login, registration, logout commands
 * 
 * Uncomment and adjust when test environment is ready
 */

/**
 * Login via UI
 * Standard login flow through the UI
 */
// Cypress.Commands.add('login', (email, password) => {
//   cy.visit('/login');
//   
//   cy.get('[data-testid="email"]').typeWithClear(email);
//   cy.get('[data-testid="password"]').typeWithClear(password);
//   cy.get('[data-testid="login-button"]').click();
//   
//   // Wait for redirect to dashboard
//   cy.url().should('include', '/dashboard');
//   cy.get('[data-testid="user-menu"]').should('be.visible');
//   
//   cy.task('log', `[PASS] Logged in as: ${email}`);
// });

/**
 * Login via API (faster, bypasses UI)
 * Use this in beforeEach() to speed up tests
 */
// Cypress.Commands.add('loginViaAPI', (email, password) => {
//   cy.request({
//     method: 'POST',
//     url: '/api/auth/login',
//     body: { email, password }
//   }).then((response) => {
//     expect(response.status).to.eq(200);
//     
//     const token = response.body.token;
//     
//     // Store token in cookie or localStorage
//     cy.setCookie('auth_token', token);
//     // OR: cy.window().then(win => win.localStorage.setItem('authToken', token));
//     
//     cy.task('log', `[PASS] API login successful: ${email}`);
//   });
// });

/**
 * Register new user
 */
// Cypress.Commands.add('register', (userData) => {
//   const { email, password, firstName, lastName } = userData;
//   
//   cy.visit('/register');
//   
//   cy.get('[data-testid="first-name"]').typeWithClear(firstName);
//   cy.get('[data-testid="last-name"]').typeWithClear(lastName);
//   cy.get('[data-testid="email"]').typeWithClear(email);
//   cy.get('[data-testid="password"]').typeWithClear(password);
//   cy.get('[data-testid="confirm-password"]').typeWithClear(password);
//   cy.get('[data-testid="terms-checkbox"]').check();
//   cy.get('[data-testid="register-button"]').click();
//   
//   // Wait for confirmation
//   cy.contains(/success|welcome|confirm/i, { timeout: 10000 }).should('be.visible');
//   
//   cy.task('log', `[PASS] Registered new user: ${email}`);
// });

/**
 * Logout
 */
// Cypress.Commands.add('logout', () => {
//   cy.get('[data-testid="user-menu"]').click();
//   cy.get('[data-testid="logout-button"]').click();
//   
//   // Verify redirect to homepage
//   cy.url().should('eq', Cypress.config('baseUrl') + '/');
//   
//   // Verify session cleared
//   cy.getCookie('auth_token').should('not.exist');
//   
//   cy.task('log', `[PASS] Logged out successfully`);
// });

/**
 * Check if user is logged in
 */
// Cypress.Commands.add('isLoggedIn', () => {
//   return cy.getCookie('auth_token').then(cookie => {
//     return cookie !== null;
//   });
// });

/**
 * Force login state (for quick test setup)
 * Creates a valid session without going through login flow
 */
// Cypress.Commands.add('setLoggedInState', (userEmail = 'test@fairplay-qa.com') => {
//   // Request a test token from backend
//   cy.request('POST', '/api/test/generate-token', { email: userEmail })
//     .then(response => {
//       cy.setCookie('auth_token', response.body.token);
//       cy.task('log', `[PASS] Forced login state for: ${userEmail}`);
//     });
// });

module.exports = {};
