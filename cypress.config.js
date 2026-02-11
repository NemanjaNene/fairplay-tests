const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    // Base URL
    baseUrl: 'https://www.yes-to-fairplay.com',
    
    // Viewport
    viewportWidth: 1920,
    viewportHeight: 1080,
    
    // Timeouts
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 15000,
    
    // Test isolation
    testIsolation: true,
    
    // Retry strategy
    retries: {
      runMode: 2,    // CI: retry failed tests 2x
      openMode: 0    // Local: no retry (fast debugging)
    },
    
    // Video & Screenshots
    video: true,
    videoCompression: 32,
    screenshotOnRunFailure: true,
    
    // Chrome flags for stability
    chromeWebSecurity: false,
    
    // Spec pattern
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    
    // Support file
    supportFile: 'cypress/support/e2e.js',
    
    // Environment variables
    env: {
      // API endpoints (for future use)
      apiUrl: 'https://api.yes-to-fairplay.com',
      
      // Test data
      testUserEmail: 'cypress-test@fairplay-qa.com',
      testUserPassword: 'TestPass123!',
      
      // Feature flags
      skipLogin: true,  // Currently no login available
      skipPayment: true, // Currently no payment testing
      
      // Referral & Affiliate (prepared for future)
      testReferralCode: 'CYPRESSTEST',
      testAffiliateId: 'aff-cypress-123'
    },
    
    setupNodeEvents(on, config) {
      // Task: Log to terminal
      on('task', {
        log(message) {
          console.log(`\n[CYPRESS LOG]: ${message}\n`);
          return null;
        },
        
        logFailure(details) {
          const { testName, error, url, timestamp } = details;
          console.error(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
[FAIL] TEST FAILURE REPORT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Test: ${testName}
Error: ${error}
URL: ${url}
Timestamp: ${timestamp}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          `);
          return null;
        }
      });
      
      // Disable animations for stability
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push('--disable-gpu');
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--no-sandbox');
        }
        return launchOptions;
      });
      
      return config;
    }
  }
});
