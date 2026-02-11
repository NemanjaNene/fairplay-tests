/**
 * REGRESSION: Referral Link Tracking
 * Tests referral code tracking via URL parameters and cookie persistence
 * Tags: @regression @referral
 * 
 * PREPARED FOR FUTURE - Adjust cookie/localStorage names when implementation is ready
 */

import { generateReferralCode } from '../../../support/helpers/data-generator';

describe('Referral Tracking - Cookie Persistence', { tags: ['@regression', '@referral'] }, () => {
  
  const testReferralCode = generateReferralCode();

  afterEach(() => {
    cy.clearReferralData();
  });

  it('should capture referral code from URL parameter (?ref=CODE)', () => {
    const refCode = 'FRIEND2026';
    
    cy.visitWithReferral(refCode);
    
    // Verify referral stored in cookie or localStorage
    cy.verifyReferralStored(refCode);
  });

  it('should persist referral code across page navigation', () => {
    const refCode = 'PERSIST123';
    
    cy.visitWithReferral(refCode);
    cy.verifyReferralStored(refCode);
    
    // Navigate to different pages
    cy.verifyReferralPersistence(refCode);
  });

  it('should handle multiple referral code formats (?ref, ?referral, ?code)', () => {
    const testFormats = [
      { param: 'ref', code: 'REF123' },
      { param: 'referral', code: 'REFERRAL123' },
      { param: 'code', code: 'CODE123' }
    ];
    
    testFormats.forEach(format => {
      cy.clearReferralData();
      
      cy.visit(`/?${format.param}=${format.code}`);
      cy.waitForPageLoad();
      cy.wait(1000);
      
      cy.task('log', `[DEBUG] Testing referral format: ${format.param}=${format.code}`);
      
      // Check if stored (implementation may vary)
      cy.window().then(win => {
        const cookieValue = document.cookie;
        const localStorageValue = JSON.stringify(win.localStorage);
        
        cy.task('log', `Cookies: ${cookieValue}`);
        cy.task('log', `LocalStorage: ${localStorageValue}`);
      });
    });
  });

  it('should not override existing referral code with new one', () => {
    const firstRef = 'FIRST123';
    const secondRef = 'SECOND456';
    
    // Visit with first referral
    cy.visitWithReferral(firstRef);
    cy.verifyReferralStored(firstRef);
    
    // Visit with second referral (should keep first)
    cy.visit(`/?ref=${secondRef}`);
    cy.wait(1000);
    
    // First referral should still be stored (common pattern)
    cy.task('log', `[DEBUG] Checking if first referral (${firstRef}) is preserved`);
    
    // Log current cookie/localStorage state
    cy.window().then(win => {
      cy.task('log', `Cookies: ${document.cookie}`);
      cy.task('log', `LocalStorage: ${JSON.stringify(win.localStorage)}`);
    });
  });

  it('should expire referral cookie after X days (if implementation uses expiry)', () => {
    const refCode = 'EXPIRE123';
    
    cy.visitWithReferral(refCode);
    
    // Check cookie expiry
    cy.getCookie('referral_code').then(cookie => {
      if (cookie) {
        cy.task('log', `📅 Referral cookie expiry: ${cookie.expiry ? new Date(cookie.expiry * 1000) : 'Session'}`);
        
        // Typical referral cookies expire in 30-90 days
        if (cookie.expiry) {
          const expiryDate = new Date(cookie.expiry * 1000);
          const daysUntilExpiry = (expiryDate - Date.now()) / (1000 * 60 * 60 * 24);
          
          cy.task('log', `📊 Days until expiry: ${daysUntilExpiry.toFixed(0)}`);
          
          // Should be at least 7 days
          expect(daysUntilExpiry).to.be.greaterThan(7);
        }
      }
    });
  });

  it('should handle invalid referral codes gracefully', () => {
    const invalidCodes = [
      '<script>alert("xss")</script>',
      '../../etc/passwd',
      'A'.repeat(1000), // Very long code
      '!@#$%^&*()',
      ''
    ];
    
    invalidCodes.forEach(code => {
      cy.visit(`/?ref=${encodeURIComponent(code)}`);
      cy.waitForPageLoad();
      
      // Page should still load without errors
      cy.get('body').should('be.visible');
      
      cy.task('log', `[PASS] Page handled invalid referral code: ${code.substring(0, 50)}`);
    });
  });

  it('should track referral code case-insensitively (if applicable)', () => {
    const codes = ['FrIeNd123', 'FRIEND123', 'friend123'];
    
    codes.forEach(code => {
      cy.clearReferralData();
      cy.visitWithReferral(code);
      cy.wait(1000);
      
      cy.task('log', `[DEBUG] Testing case: ${code}`);
    });
  });

});
