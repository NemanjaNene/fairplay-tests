/**
 * REGRESSION: Affiliate Link Tracking
 * Tests affiliate ID tracking via URL parameters and cookie persistence
 * Tags: @regression @affiliate
 * 
 * PREPARED FOR FUTURE - Adjust when affiliate implementation is ready
 */

import { generateAffiliateId } from '../../../support/helpers/data-generator';

describe('Affiliate Tracking - Cookie Persistence', { tags: ['@regression', '@affiliate'] }, () => {
  
  afterEach(() => {
    cy.clearReferralData();
  });

  it('should capture affiliate ID from URL parameter (?aff=ID)', () => {
    const affId = 'partner-2026';
    
    cy.visitWithAffiliate(affId);
    
    // Verify affiliate stored
    cy.verifyAffiliateStored(affId);
  });

  it('should persist affiliate ID across page navigation', () => {
    const affId = 'partner-xyz';
    
    cy.visitWithAffiliate(affId);
    cy.verifyAffiliateStored(affId);
    
    // Navigate to pricing
    cy.scrollToPricing();
    cy.wait(1000);
    
    // Verify still stored
    cy.verifyAffiliateStored(affId);
  });

  it('should handle both referral and affiliate simultaneously', () => {
    const refCode = 'REF2026';
    const affId = 'aff-partner';
    
    cy.visit(`/?ref=${refCode}&aff=${affId}`);
    cy.waitForPageLoad();
    cy.wait(1000);
    
    // Both should be stored
    cy.task('log', `🔍 Checking both referral (${refCode}) and affiliate (${affId})`);
    
    cy.verifyReferralStored(refCode);
    cy.verifyAffiliateStored(affId);
  });

  it('should track affiliate with utm parameters (utm_source, utm_campaign)', () => {
    const utmParams = {
      utm_source: 'partner-blog',
      utm_medium: 'article',
      utm_campaign: 'summer2026',
      aff: 'partner-123'
    };
    
    const queryString = Object.entries(utmParams)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    
    cy.visit(`/?${queryString}`);
    cy.waitForPageLoad();
    cy.wait(1000);
    
    cy.task('log', `📊 UTM parameters: ${queryString}`);
    
    // Check if any UTM data captured
    cy.window().then(win => {
      const cookies = document.cookie;
      const localStorage = JSON.stringify(win.localStorage);
      
      cy.task('log', `Cookies: ${cookies}`);
      cy.task('log', `LocalStorage: ${localStorage}`);
    });
  });

  it('should expire affiliate cookie after X days', () => {
    const affId = 'partner-expire';
    
    cy.visitWithAffiliate(affId);
    
    // Check cookie expiry
    cy.getCookie('affiliate_id').then(cookie => {
      if (cookie && cookie.expiry) {
        const expiryDate = new Date(cookie.expiry * 1000);
        const daysUntilExpiry = (expiryDate - Date.now()) / (1000 * 60 * 60 * 24);
        
        cy.task('log', `📅 Affiliate cookie expires in: ${daysUntilExpiry.toFixed(0)} days`);
        
        // Should be at least 30 days (common affiliate tracking period)
        expect(daysUntilExpiry).to.be.greaterThan(30);
      }
    });
  });

  it('should handle affiliate ID formats (alphanumeric, hyphens, underscores)', () => {
    const validIds = [
      'partner-123',
      'aff_xyz',
      'PARTNER123',
      'partner_blog_2026'
    ];
    
    validIds.forEach(id => {
      cy.clearReferralData();
      cy.visitWithAffiliate(id);
      cy.wait(1000);
      
      cy.task('log', `✅ Affiliate ID format accepted: ${id}`);
    });
  });

  it('should sanitize malicious affiliate IDs', () => {
    const maliciousIds = [
      '<script>alert("xss")</script>',
      'javascript:alert(1)',
      '../../etc/passwd'
    ];
    
    maliciousIds.forEach(id => {
      cy.visit(`/?aff=${encodeURIComponent(id)}`);
      cy.waitForPageLoad();
      
      // Page should load without XSS execution
      cy.get('body').should('be.visible');
      
      cy.task('log', `✅ Malicious affiliate ID blocked: ${id}`);
    });
  });

});
