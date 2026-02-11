/**
 * Logging Helper
 * Utilities for enhanced test logging and debugging
 */

export const logTestInfo = (message, type = 'info') => {
  const prefixes = {
    info: '[INFO]',
    success: '[SUCCESS]',
    warning: '[WARNING]',
    error: '[ERROR]',
    debug: '[DEBUG]',
    network: '[NETWORK]',
    data: '[DATA]'
  };
  
  const prefix = prefixes[type] || '[INFO]';
  cy.log(`${prefix} ${message}`);
  cy.task('log', `${prefix} ${message}`);
};

export const logNetworkRequest = (method, url, status) => {
  const prefix = status >= 200 && status < 300 ? '[SUCCESS]' : '[FAIL]';
  cy.task('log', `${prefix} ${method} ${url} - Status: ${status}`);
};

export const logTestStep = (step) => {
  cy.task('log', `[STEP] ${step}`);
};

export const logDebug = (data) => {
  cy.task('log', `[DEBUG] ${JSON.stringify(data)}`);
};
