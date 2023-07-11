describe('login page', () => {

  it('Should show validation errors when leaving all fields blank', () => {
    cy.visit(`http://localhost:3000/auth/signin`)
    
    cy.get('[data-cy="submit"]').click();
    cy.get('[datacy ="error-email').should('exist');
    cy.get('[datacy ="error-pswd').should('exist');
  })



  it('should redirect the user to a success page when filling the form and clicking submit button',()=>{
    cy.visit('http://localhost:3000/auth/signin')
    cy.get('[datacy ="error-email').type('devusertwo@mailinator.com');
    cy.get('[datacy ="error-pswd').type('click');
    cy.get('[data-cy="submit"]').click();
  }) 

})