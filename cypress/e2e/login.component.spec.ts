import '@testing-library/cypress'

describe('LoginComponent', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should render ContainerComponent and LoginFormComponent', () => {
    cy.get('h1').contains('Login').should('exist');
    cy.get('form').should('exist');
  });

  it('should call onLogin when form is submitted', () => {
    cy.findByRole('textbox').as('userInput')
    cy.findByLabelText('Contraseña *').as('passwordInput')
    cy.findByRole('button').as('submitButton')

    cy.get('@userInput').type('admin');
    cy.get('@passwordInput').type('test');

    cy.get('@userInput').should('have.value', 'admin');
    cy.get('@passwordInput').should('have.value', 'test');
    cy.get('@submitButton').click();

    cy.url().should('include', '/submodule-list');

  });

  it('should call onLogin with error when form is submitted', () => {
    cy.findByRole('textbox').as('userInput')
    cy.findByLabelText('Contraseña *').as('passwordInput')
    cy.findByRole('button').as('submitButton')

    cy.get('@userInput').type('paco');
    cy.get('@passwordInput').type('pass');

    cy.get('@userInput').should('have.value', 'paco');
    cy.get('@passwordInput').should('have.value', 'pass');
    cy.get('@submitButton').click();

    cy.findByRole('alert').should('contain', 'Usuario y/o password no válidos');
  });
});
