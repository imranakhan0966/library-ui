// const { get } = require("cypress/types/lodash");

describe('register page', () => {

  it('Should show validation errors when leaving all fields blank', () => {
    cy.visit('http://localhost:3000/auth/signup')
    
    cy.get('[data-cy="submit"]').click();
    cy.get('#name').should('exist');
    cy.get('#email').should('exist');
    cy.get('#pswd').should('exist');
  })

  it('should redirect the user to a success page when filling the form and clicking submit button',()=>{
    cy.visit('http://localhost:3000/auth/signup')
    cy.get('[datacy ="error-name"]').type('zain');
    cy.get('[datacy ="error-email"]').type('zainraza110@gmail.com');
    cy.get('[datacy ="error-pswd"]').type('123qwe');
    cy.get('[data-cy="submit"]').click();
  })

})