import { BASE_URL } from '../constants';
import paymentsJSON from '../fixtures/payments.json';
import paymentJSON from '../fixtures/payment.json';

describe('Payments App: Happy Path', () => {
  beforeEach(() => {
    cy.intercept('GET', `${BASE_URL}/payments/*`, paymentJSON);
    cy.intercept('GET', `${BASE_URL}/payments`, paymentsJSON);
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

    // Has the table with the list
    cy.get('table').should('be.visible');

    // Has the the number of rows in the table for the list of payments & table header
    cy.get('table tr').should('have.length', paymentsJSON.length + 1);
    cy.contains('Amount');
    cy.contains('Status');
  });

  it('should show french text when changing language to FR', () => {
    cy.get('select').select('fr');

    // Table header for Amount in French
    cy.contains('Montant');
    // Table header for Status in French
    cy.contains('Statut');

    // Return back to english
    cy.get('select').select('en');
    cy.contains('Amount');
    cy.contains('Status');
  });

  it('should filter list on typing `victor` in input', () => {
    cy.get('input').type('victor');

    cy.get('table tr').should('have.length', 2);
  });

  it('should show full list on clearing filter input', () => {
    cy.get('input').clear();

    cy.get('table tr').should('have.length', paymentsJSON.length + 1);
  });

  it('should take user to payment details on clicking the payment row', () => {
    cy.contains(paymentJSON.customer_name).click();

    // Redirected to initial payments list
    cy.location().should((loc) => {
      expect(loc.href).to.eq(
        `http://localhost:3000/payments/${paymentJSON.id}`
      );
    });

    // Customer Name and Amount are visible
    cy.contains(paymentJSON.customer_name);
    cy.contains(paymentJSON.amount.toLocaleString('en'));

    // Check for table for installments
    cy.get('table').should('be.visible');
    cy.get('table tr').should(
      'have.length',
      paymentJSON.paymentPlan.length + 1
    );
  });

  it('should take user to payments list on clicking back', () => {
    cy.get('header a[href="/payments"]').click();

    // Redirected to initial payments list
    cy.location().should((loc) => {
      expect(loc.href).to.eq(`http://localhost:3000/payments`);
    });

    cy.get('table').should('be.visible');
    cy.get('table tr').should('have.length', paymentsJSON.length + 1);
  });
});
