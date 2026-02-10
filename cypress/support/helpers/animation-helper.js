/**
 * Animation Helper
 * Disables CSS animations and transitions for test stability
 */

export const disableAnimations = () => {
  cy.visit(Cypress.config('baseUrl'), {
    onBeforeLoad(win) {
      // Inject CSS to disable all animations
      const style = win.document.createElement('style');
      style.innerHTML = `
        *, *::before, *::after {
          transition: none !important;
          animation: none !important;
          animation-duration: 0s !important;
          animation-delay: 0s !important;
          transition-duration: 0s !important;
          transition-delay: 0s !important;
        }
      `;
      win.document.head.appendChild(style);
    }
  });
};

export const enableAnimations = () => {
  cy.window().then((win) => {
    // Remove injected style if needed (for specific visual tests)
    const styles = win.document.querySelectorAll('style');
    styles.forEach(style => {
      if (style.innerHTML.includes('transition: none !important')) {
        style.remove();
      }
    });
  });
};
