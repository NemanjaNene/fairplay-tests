/**
 * Logging Helper
 * Utilities for enhanced test logging and debugging
 */

export const logTestInfo = (message, type = 'info') => {
  const icons = {
    info: 'ℹ️',
    success: '✅',
    warning: '⚠️',
    error: '❌',
    debug: '🐛',
    network: '🌐',
    data: '📊'
  };
  
  const icon = icons[type] || 'ℹ️';
  cy.log(`${icon} ${message}`);
  cy.task('log', `${icon} ${message}`);
};

export const logNetworkRequest = (method, url, status) => {
  const emoji = status >= 200 && status < 300 ? '✅' : '❌';
  cy.task('log', `${emoji} ${method} ${url} - Status: ${status}`);
};

export const logTestStep = (step) => {
  cy.task('log', `📍 Step: ${step}`);
};

export const logDebug = (data) => {
  cy.task('log', `🐛 Debug: ${JSON.stringify(data)}`);
};
