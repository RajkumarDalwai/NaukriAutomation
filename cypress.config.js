const { defineConfig } = require("cypress");

module.exports = defineConfig({
  retries: {
    runMode: 2, // Retry twice in CI mode
    openMode: 2, // Retry twice in interactive mode
  },
  e2e: {
    chromeWebSecurity: false,
    watchForFileChanges: false,
    defaultCommandTimeout: 15000, // Increase to 15 seconds
    pageLoadTimeout: 90000, // Increase to 90 seconds
    requestTimeout: 30000, // Add for network requests
    responseTimeout: 30000, // Add for server responses
    screenshotOnRunFailure: true,
    video: false,
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
  },
});