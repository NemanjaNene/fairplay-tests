/**
 * Common Selectors
 * Centralized selectors for common UI elements
 * (Use this if data-testid attributes are not available)
 */

export const commonSelectors = {
  // Header
  header: 'header, [role="banner"], nav',
  logo: '[class*="logo"], img[alt*="logo" i]',
  mainNav: 'nav, [role="navigation"]',
  
  // Footer
  footer: 'footer, [role="contentinfo"]',
  footerLinks: 'footer a',
  
  // Cookie Banner
  cookieBanner: '[id*="cookie"], [class*="cookie"], [aria-label*="cookie" i]',
  cookieAcceptBtn: 'button:contains("Accept"), button:contains("Agree")',
  
  // Buttons
  primaryButton: 'button[type="submit"], [class*="btn-primary"]',
  secondaryButton: '[class*="btn-secondary"]',
  closeButton: '[aria-label*="close" i], button:contains("Close")',
  
  // Forms
  emailInput: 'input[type="email"], input[name*="email"]',
  passwordInput: 'input[type="password"], input[name*="password"]',
  submitButton: 'button[type="submit"]',
  
  // Loading
  spinner: '[class*="spinner"], [class*="loading"], [data-testid*="loading"]',
  loader: '.loader, [role="progressbar"]',
  
  // Modals
  modal: '[role="dialog"], [class*="modal"]',
  modalOverlay: '[class*="overlay"], [class*="backdrop"]',
  modalClose: '[aria-label*="close" i], [class*="modal-close"]',
  
  // Messages
  errorMessage: '[class*="error"], [role="alert"]',
  successMessage: '[class*="success"]',
  warningMessage: '[class*="warning"]',
  
  // Links
  externalLink: 'a[target="_blank"]',
  internalLink: 'a:not([target="_blank"])'
};

export default commonSelectors;
