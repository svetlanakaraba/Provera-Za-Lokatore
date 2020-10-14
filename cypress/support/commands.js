// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
const Locators = require("../fixtures/Locators.json")
Cypress.Commands.add("uloguj",(email,password)=> {
    cy.visit("/login")
    cy.wait(2000)
    cy.get(Locators.Login.Email).type(email)
    cy.get(Locators.Login.Password).type(password)
    cy.get(Locators.Login.Submit).click()
})