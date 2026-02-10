/**
 * Data Generator
 * Generate unique test data (emails, names, etc.)
 */

import { faker } from '@faker-js/faker';

/**
 * Generate unique email for test user
 */
export const generateUniqueEmail = (prefix = 'cypress-test') => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 5);
  return `${prefix}-${timestamp}-${random}@fairplay-qa.com`;
};

/**
 * Generate test user data
 */
export const generateUserData = (overrides = {}) => {
  return {
    email: generateUniqueEmail(),
    password: 'TestPass123!',
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    phone: faker.phone.number('+385 ## ### ####'),
    country: 'HR',
    ...overrides
  };
};

/**
 * Generate referral code
 */
export const generateReferralCode = () => {
  return `REF${Date.now().toString().slice(-8)}`;
};

/**
 * Generate affiliate ID
 */
export const generateAffiliateId = () => {
  return `aff-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
};

/**
 * Generate test credit card (for future payment testing)
 * Using standard test card numbers
 */
export const getTestCreditCard = (type = 'visa') => {
  const cards = {
    visa: {
      number: '4242424242424242',
      cvc: '123',
      expiry: '12/25',
      name: 'Test User'
    },
    mastercard: {
      number: '5555555555554444',
      cvc: '123',
      expiry: '12/25',
      name: 'Test User'
    },
    amex: {
      number: '378282246310005',
      cvc: '1234',
      expiry: '12/25',
      name: 'Test User'
    }
  };
  
  return cards[type] || cards.visa;
};
