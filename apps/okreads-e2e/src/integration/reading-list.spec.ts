describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: it should add book to reading list and open Reading list and remove it and undo on snack bar', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

    cy.get('.book--title-0--want-btn').click();
    cy.get('.book--title-0--want-btn').should('be.disabled');
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-item').should('have.length.at.least', 1);
    cy.get('.reading-list-0-remove-btn').click();
    cy.get('.mat-simple-snackbar-action > button').focused();
    cy.get('.mat-simple-snackbar-action > button').click();
    cy.get('.reading-list-item').should('have.length.at.least', 1);
  });

  it('Then: it should clear the selected book',()=>{
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('.reading-list-0-remove-btn').click();
  })
});
