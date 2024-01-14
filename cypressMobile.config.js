const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  viewportWidth: 360,
  viewportHeight: 640,
  
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "http://localhost:3000"
  },
});