// import 'cypress-file-upload'

describe('create book', () => {
  it('Should show validation errors when leaving all fields blank', () => {
    cy.visit('http://localhost:3000/add-book')
    
    cy.get('[data-cy="submit"]').click();
    cy.get('#title').should('exist');
    cy.get('#auth').should('exist');
    cy.get('#rating').should('exist');
    cy.get('#date').should('exist');
    cy.get('#collection').should('exist');
    cy.get('#file').should('exist');
   
  })


  it('should redirect the user to a success page when filling the create book form and clicking submit button',()=>{
    cy.visit('http://localhost:3000/add-book')
  
    cy.get('#title').type('Physics');
    cy.get('#auth').type('Zain Raza');
    cy.get('#rating').type('1');
    cy.get('#date').type('2023-04-07');
    cy.get('#collection').type('10');

    const filepath = 'images/Issues.PNG'
    cy.get('#file').attachFile(filepath)
  
    cy.get('[data-cy="submit"]').click();
  
  })
  

})