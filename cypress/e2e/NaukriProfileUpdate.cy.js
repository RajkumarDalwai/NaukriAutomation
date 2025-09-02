/// <reference types="cypress" />
import 'cypress-file-upload';

Cypress.on('uncaught:exception', (err, runnable) => {
  return false; // Prevent Cypress from failing the test on uncaught exceptions
});

// === Test Data Sets ===
const users = [
  {
    username: 'dalwairajkumar22@gmail.com',
    password: 'Rajkumar@25',
    resume: 'Rajkumar_Dalwai_Resume-1.pdf'
  },
  {
    username: 'dalwairajkumar24@gmail.com',
    password: 'Rajkumar@25',
    resume: 'Rajkumar_Dalwai_Resume-2.pdf'
  }
];

describe('Naukri Profile Updater', () => {

  users.forEach((user, index) => {
    it(`should update resume headline and upload new resume for dataset ${index + 1}`, () => {

      // === Visit Login Page ===
      cy.visit('https://www.naukri.com/nlogin/login');

      // === Login ===
      cy.get('#usernameField').type(user.username);
      cy.get('#passwordField').type(user.password);
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

      // === Upload Resume with base64 ===
      cy.fixture(user.resume, 'base64').then(fileContent => {
        cy.get('.uploadBtn input[type="file"]').attachFile({
          fileContent,
          fileName: user.resume,
          mimeType: 'application/pdf',
          encoding: 'base64'
        });
      });

      // Optional: Wait for upload processing
      cy.wait(5000);

      // === Validate Upload Date ===
      const today = new Date();
      const options = { year: 'numeric', month: 'short', day: '2-digit' };
      const formattedDate = today.toLocaleDateString('en-US', options); // e.g. "Sep 02, 2025"
      const expectedText = `Uploaded on ${formattedDate}`;

      cy.get('.updateOn').should('contain.text', expectedText);

    });
  });

});
