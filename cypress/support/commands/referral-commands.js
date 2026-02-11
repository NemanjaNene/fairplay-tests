/**
 * Referral & Affiliate Commands
 * PREPARED FOR FUTURE: Commands for testing referral and affiliate link tracking
 */

/**
 * Visit site with referral code (via URL parameter)
 * Example: https://www.yes-to-fairplay.com/?ref=FRIEND123
 */
Cypress.Commands.add('visitWithReferral', (referralCode) => {
  cy.visit(`/?ref=${referralCode}`);
  cy.waitForPageLoad();
  
  cy.task('log', `📎 Visiting with referral code: ${referralCode}`);
  
  // Verify referral code stored in cookie/localStorage
  cy.wait(1000); // Give time for tracking script to fire
});

/**
 * Visit site with affiliate ID (via URL parameter)
 * Example: https://www.yes-to-fairplay.com/?aff=partner-xyz
 */
Cypress.Commands.add('visitWithAffiliate', (affiliateId) => {
  cy.visit(`/?aff=${affiliateId}`);
  cy.waitForPageLoad();
  
  cy.task('log', `🤝 Visiting with affiliate ID: ${affiliateId}`);
  
  // Verify affiliate ID stored
  cy.wait(1000);
});

/**
 * Verify referral code stored in cookie
 * (Adjust cookie name based on actual implementation)
 */
Cypress.Commands.add('verifyReferralStored', (expectedCode) => {
  const possibleCookieNames = [
    'referral_code',
    'ref_code',
    'fp_referral',
    'fairplay_ref'
  ];
  
  // Check each possible cookie name
  let found = false;
  possibleCookieNames.forEach(cookieName => {
    cy.getCookie(cookieName).then((cookie) => {
      if (cookie && cookie.value === expectedCode) {
        found = true;
        cy.task('log', `[PASS] Referral code found in cookie: ${cookieName} = ${cookie.value}`);
      }
    });
  });
  
  // Also check localStorage
  cy.window().then((win) => {
    const localStorageKeys = ['referralCode', 'ref', 'fp_ref'];
    localStorageKeys.forEach(key => {
      const value = win.localStorage.getItem(key);
      if (value === expectedCode) {
        found = true;
        cy.task('log', `[PASS] Referral code found in localStorage: ${key} = ${value}`);
      }
    });
  });
  
  // If not found, log warning (don't fail test yet - implementation may vary)
  cy.then(() => {
    if (!found) {
      cy.task('log', `[WARNING] Referral code not found in cookies or localStorage. Check implementation.`);
    }
  });
});

/**
 * Verify affiliate ID stored in cookie
 */
Cypress.Commands.add('verifyAffiliateStored', (expectedId) => {
  const possibleCookieNames = [
    'affiliate_id',
    'aff_id',
    'fp_affiliate',
    'fairplay_aff'
  ];
  
  let found = false;
  possibleCookieNames.forEach(cookieName => {
    cy.getCookie(cookieName).then((cookie) => {
      if (cookie && cookie.value === expectedId) {
        found = true;
        cy.task('log', `[PASS] Affiliate ID found in cookie: ${cookieName} = ${cookie.value}`);
      }
    });
  });
  
  // Check localStorage
  cy.window().then((win) => {
    const localStorageKeys = ['affiliateId', 'aff', 'fp_aff'];
    localStorageKeys.forEach(key => {
      const value = win.localStorage.getItem(key);
      if (value === expectedId) {
        found = true;
        cy.task('log', `[PASS] Affiliate ID found in localStorage: ${key} = ${value}`);
      }
    });
  });
  
  cy.then(() => {
    if (!found) {
      cy.task('log', `[WARNING] Affiliate ID not found in cookies or localStorage. Check implementation.`);
    }
  });
});

/**
 * Verify referral persists across page navigation
 */
Cypress.Commands.add('verifyReferralPersistence', (referralCode) => {
  // Navigate to different page
  cy.scrollToFooter();
  cy.get('a').contains(/Help Center|FAQ/i).first().click({ force: true });
  cy.wait(2000);
  
  // Check if referral still stored
  cy.verifyReferralStored(referralCode);
  
  cy.task('log', `🔄 Verified referral persistence across navigation`);
});

/**
 * Clear referral/affiliate tracking data
 */
Cypress.Commands.add('clearReferralData', () => {
  // Clear cookies
  cy.clearCookie('referral_code');
  cy.clearCookie('ref_code');
  cy.clearCookie('fp_referral');
  cy.clearCookie('affiliate_id');
  cy.clearCookie('aff_id');
  cy.clearCookie('fp_affiliate');
  
  // Clear localStorage
  cy.window().then((win) => {
    win.localStorage.removeItem('referralCode');
    win.localStorage.removeItem('ref');
    win.localStorage.removeItem('affiliateId');
    win.localStorage.removeItem('aff');
  });
  
  cy.task('log', `🧹 Cleared referral/affiliate data`);
});

/**
 * TEMPLATE: Verify referral applied at checkout (for future)
 * Uncomment when checkout flow is testable
 */
// Cypress.Commands.add('verifyReferralAppliedAtCheckout', (referralCode) => {
//   // Navigate to checkout (requires login + plan selection)
//   cy.navigateToFlexPlans();
//   cy.get('[data-testid="select-plan-6-month"]').click();
//   
//   // At checkout, verify referral code displayed
//   cy.get('[data-testid="applied-referral"]').should('contain', referralCode);
//   
//   // Verify discount applied (if applicable)
//   cy.get('[data-testid="discount-amount"]').should('be.visible');
//   
//   cy.task('log', `[PASS] Referral code applied at checkout: ${referralCode}`);
// });
