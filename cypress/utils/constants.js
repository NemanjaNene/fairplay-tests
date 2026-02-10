/**
 * Constants
 * Shared constants across tests
 */

// URLs
export const URLS = {
  BASE: 'https://www.yes-to-fairplay.com',
  HELP: '/help',
  LOGIN: '/login',
  ACCOUNT: '/account'
};

// Timeouts
export const TIMEOUTS = {
  SHORT: 3000,
  MEDIUM: 5000,
  LONG: 10000,
  VERY_LONG: 20000,
  PAGE_LOAD: 30000
};

// Plans
export const PLANS = {
  FLEX: {
    '6_MONTH': { duration: 6, startingPrice: 35, currency: '€' },
    '12_MONTH': { duration: 12, startingPrice: 30, currency: '€' },
    '24_MONTH': { duration: 24, startingPrice: 25, currency: '€' }
  },
  DAY_PASS: {
    '3_DAY': { duration: 3, price: 25, currency: '€' },
    '7_DAY': { duration: 7, price: 50, currency: '€' },
    '14_DAY': { duration: 14, price: 75, currency: '€' }
  }
};

// Test Data
export const TEST_DATA = {
  VALID_COUNTRIES: ['Croatia', 'Germany', 'France', 'Italy', 'Spain'],
  INVALID_COUNTRIES: ['North Korea', 'Antarctica'],
  
  COMPATIBLE_PHONES: [
    { brand: 'Apple', model: 'iPhone 14 Pro' },
    { brand: 'Apple', model: 'iPhone 13' },
    { brand: 'Samsung', model: 'Galaxy S23' }
  ],
  
  INCOMPATIBLE_PHONES: [
    { brand: 'Apple', model: 'iPhone 6' },
    { brand: 'Samsung', model: 'Galaxy S8' }
  ]
};

// Viewport Sizes
export const VIEWPORTS = {
  MOBILE: { width: 375, height: 667 }, // iPhone SE
  TABLET: { width: 768, height: 1024 }, // iPad
  DESKTOP: { width: 1920, height: 1080 } // Full HD
};

// External Links
export const EXTERNAL_LINKS = {
  APP_STORE: 'apps.apple.com',
  PLAY_STORE: 'play.google.com',
  FACEBOOK: 'facebook.com',
  TWITTER: 'twitter.com',
  INSTAGRAM: 'instagram.com'
};

// Regex Patterns
export const PATTERNS = {
  EMAIL: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  PHONE: /^\+?[1-9]\d{1,14}$/,
  PRICE: /€\s?\d+/,
  URL: /^https?:\/\/.+/
};

export default {
  URLS,
  TIMEOUTS,
  PLANS,
  TEST_DATA,
  VIEWPORTS,
  EXTERNAL_LINKS,
  PATTERNS
};
