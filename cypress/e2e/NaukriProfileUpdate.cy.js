/// <reference types="cypress" />

import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Prevent Cypress from failing the test on uncaught exceptions
});

describe('Naukri Profile Updater', () => {

  it('should update resume headline and upload new resume', () => {

    // === Visit Login Page ===
    cy.visit('https://www.naukri.com/nlogin/login');

    // === Login ===
    cy.get('#usernameField').type('dalwairajkumar22@gmail.com');
    cy.get('#passwordField').type('Rajkumar@25');
    cy.get('.blue-btn').click();

    cy.wait(3000); // Allow time for login redirect

    // === Navigate to Profile Page ===
    cy.get('.view-profile-wrapper > a').click();
    cy.wait(3000); // Allow profile page to load

    // === Update Resume Headline ===
    cy.get('#lazyResumeHead > .card > :nth-child(1) > .widgetHead > .edit').click();

    cy.get('#resumeHeadlineTxt')
      .clear()
      .type(
        'Senior QA Engineer | Manual & Automation Testing: Selenium, Cypress, Appium, Rest Assured | ' +
        'TestNG, BDD, Cucumber | API, DB, Performance Testing | JIRA, Postman, JMeter, GitHub | ' +
        'CI/CD: Jenkins | SQL.'
      );

    cy.get('.form-actions > .action > .btn-dark-ot').click();

    cy.wait(2000); // Allow headline save to complete

    // === Upload Resume ===
    cy.get('.uploadBtn input[type="file"]').attachFile('Rajkumar_Dalwai_Resume-1.pdf');

    // === Validate Upload Date ===
    const today = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    const formattedDate = today.toLocaleDateString('en-US', options); // e.g. "Aug 02, 2025"
    const expectedText = `Uploaded on ${formattedDate}`;

    cy.get('.updateOn').should('contain.text', expectedText);

  });

});
