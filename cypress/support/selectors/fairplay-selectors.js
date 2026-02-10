/**
 * FairPlay-specific Selectors
 * Selectors for FairPlay website elements
 * ADJUST THESE based on actual DOM structure
 */

export const fairplaySelectors = {
  // Homepage Hero
  heroSection: '[class*="hero"]',
  heroTitle: 'h1',
  heroCTA: '[class*="hero"] button, [class*="hero"] a',
  
  // Pricing Plans
  flexPlanSection: '[class*="flex"], section:contains("FairPlay Flex")',
  dayPassSection: '[class*="day-pass"], section:contains("Day Pass")',
  pricingCard: '[class*="pricing"], [class*="plan-card"]',
  planPrice: '[class*="price"]',
  
  // Plan Selection Buttons
  flex6MonthBtn: 'button:contains("6"), a:contains("6 MONTH")',
  flex12MonthBtn: 'button:contains("12"), a:contains("12 MONTH")',
  flex24MonthBtn: 'button:contains("24"), a:contains("24 MONTH")',
  dayPass3Btn: 'button:contains("3 DAYS"), a:contains("3 DAYS")',
  dayPass7Btn: 'button:contains("7 DAYS"), a:contains("7 DAYS")',
  dayPass14Btn: 'button:contains("14 DAYS"), a:contains("14 DAYS")',
  
  // CTAs
  checkDestinationCTA: 'a:contains("Check"), button:contains("Destination")',
  checkPhoneCTA: 'a:contains("Phone"), button:contains("Compatible")',
  
  // Coverage
  coverageList: '[class*="coverage"], [class*="destination"]',
  countrySearch: 'input[placeholder*="country" i], input[placeholder*="destination" i]',
  
  // Phone Compatibility
  phoneBrandSelect: 'select:contains("brand"), select:contains("manufacturer")',
  phoneModelSelect: 'select:contains("model")',
  
  // Help Center
  helpCenterLink: 'a:contains("Help"), a[href*="help"]',
  faqSection: '[class*="faq"]',
  searchInput: 'input[type="search"], input[placeholder*="search" i]',
  
  // Account (prepared for future)
  loginLink: 'a:contains("Login"), a:contains("Account")',
  loginForm: 'form[action*="login"]',
  emailField: 'input[name="email"], input[type="email"]',
  passwordField: 'input[name="password"], input[type="password"]',
  loginButton: 'button[type="submit"]:contains("Login")',
  
  // App Download Links
  appStoreLink: 'a[href*="apps.apple.com"], a:contains("App Store")',
  playStoreLink: 'a[href*="play.google.com"], a:contains("Google Play")',
  
  // Social Media
  socialLinks: 'a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]',
  
  // Footer Sections
  imprintLink: 'a:contains("Imprint")',
  privacyLink: 'a:contains("Privacy")',
  termsLink: 'a:contains("Terms")'
};

export default fairplaySelectors;
