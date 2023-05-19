describe('When: Use the search feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should be able to search books by title', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

  it('Then: I should be able to search books by title and clear the search', () => {
    cy.get('input[type="search"]').type('javascript');

    cy.get('form').submit();

    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);

    cy.get('[data-cy="clear-search"]').click()
    cy.get('.empty').should('be.visible');
  });

  it('Then: I should see search results as I am typing', () => {
    cy.get('input[type="search"]').type('java');
    cy.get('[data-testing="book-item"]').should('have.length.greaterThan', 1);
  });

});
