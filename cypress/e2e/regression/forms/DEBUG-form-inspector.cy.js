/**
 * DEBUG TEST - Inspect form to see what's really there
 */

describe('DEBUG: Form Inspector', () => {
  
  it('should show all form inputs on the page', () => {
    // Navigate to homepage
    cy.visit('/');
    cy.scrollTo(0, 500);
    cy.wait(500);
    
    // Click Help Center link
    cy.get('a[href*="help"]').first().click({ force: true });
    cy.wait(2000);
    
    // Scroll to bottom
    cy.scrollTo('bottom', { duration: 2000 });
    cy.wait(1000);
    
    // Click CONTACT US button
    cy.contains('button', /contact us/i).scrollIntoView();
    cy.wait(500);
    cy.contains('button', /contact us/i).click({ force: true });
    cy.wait(3000); // Čekaj da se forma otvori
    
    // INSPECT ALL INPUTS
    cy.get('input').each(($input, index) => {
      const tagName = $input.prop('tagName');
      const type = $input.attr('type') || 'no-type';
      const name = $input.attr('name') || 'NO-NAME';
      const id = $input.attr('id') || 'NO-ID';
      const placeholder = $input.attr('placeholder') || 'no-placeholder';
      const dataSlot = $input.attr('data-slot') || 'no-data-slot';
      const classes = $input.attr('class') || 'no-class';
      
      cy.task('log', `INPUT ${index}: <${tagName} type="${type}" name="${name}" id="${id}" placeholder="${placeholder}" data-slot="${dataSlot}" class="${classes}" />`);
    });
    
    // INSPECT ALL TEXTAREAS
    cy.get('textarea').each(($textarea, index) => {
      const tagName = $textarea.prop('tagName');
      const name = $textarea.attr('name') || 'NO-NAME';
      const id = $textarea.attr('id') || 'NO-ID';
      const placeholder = $textarea.attr('placeholder') || 'no-placeholder';
      
      cy.task('log', `TEXTAREA ${index}: <${tagName} name="${name}" id="${id}" placeholder="${placeholder}" />`);
    });
    
    // INSPECT ALL FORMS
    cy.get('form').each(($form, index) => {
      cy.task('log', `FORM ${index}: Found`);
    });
  });
  
});
