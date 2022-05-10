import { BASE_URL } from '../constants';

describe('Payments App: API Down', () => {
  beforeEach(() => {
    cy.intercept(`${BASE_URL}/payments`, {
      statusCode: 404,
    });
    cy.intercept(`${BASE_URL}/payments/payment_i2NJhL`, {
      statusCode: 404,
    });
  });

  it('on Visit Home, should redirect to payments', () => {
    cy.visit('http://localhost:3000/');

    // Redirected to initial payments list
    cy.location().should((loc) => {
      expect(loc.href).to.eq('http://localhost:3000/payments');
    });

    // Has the option to change language
    cy.get('select').should('be.visible');
    cy.get('select').should('have.value', 'en');

    // Has the input to filter the list
    cy.get('input').should('be.visible');

    cy.contains('Failed to load');
  });

  it('on Visit Home, should redirect to payments', () => {
    cy.visit(`http://localhost:3000/payments/payment_12345`);

    // Has the option to change language
    cy.get('select').should('be.visible');
    cy.get('select').should('have.value', 'en');

    cy.contains('Failed to load payment payment_i2NJhL details');
  });
});
