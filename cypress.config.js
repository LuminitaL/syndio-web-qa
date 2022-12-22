const { defineConfig } = require("cypress");

module.exports = defineConfig({
  videoUploadOnPasses: false,
  reporter: 'junit',
  reporterOptions: {
    mochaFile: 'cypress/[hash]-junit.xml',
    toConsole: false,
  },
  viewportHeight: 1000,
  viewportWidth: 1900,
  defaultCommandTimeout: 15000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  numTestsKeptInMemory: 15,
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'http://localhost:3000',
    setupNodeEvents(on, config) {
    },
    specPattern: 'src/specs/**/*.cy.{js,jsx}',
  }
});
