//??? const { it } = require("mocha")
const Locators = require("../fixtures/Locators.json")
//import { it } from "mocha"
import {authLogin} from "../page-object/loginObject.js"

describe("Testovi za logovanje",()=> {
    let correctEmail = "svetlana@mailinator.com"
    let correctPassword = "test1234"
    let invalidEmailFirst = "svetlana@gmail.com"
    let invalidEmailSecond = "svetlanamailinator.com"
    let invalidEmailThirt = "svetlana@?mailinator.com"
    let invalidPasswordFirst = "1a"
    let invalidPasswordSecond = "testtest"

    beforeEach("visit link", ()=>{
        cy.visit("/")
        cy.url().should("contains", "https://gallery-app")
    })
    it.only("Login with POM", ()=> {
        cy.visit("/login")
        authLogin.login("test@test.com", "test123123")
    })

    it("Visit Gallery App",()=> {
        cy.url().should("contains", "/")
        cy.url().should("include", "https://gallery-app")
    })
    it("Click on login",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(".title-style").should("have.text", "Please login")
        cy.get(Locators.Login.Submit).should("be.visible")
        cy.get(Locators.Login.Email).should("be.visible")
        cy.get(".title-style").should("be.visible").and("have.text", "Please login")
    })
    it("Succsessfull login",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.wait(2000)
        cy.get(Locators.Headers.Logout).eq(3).should("be.visible")
    })
    it("Logout",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.wait(1000)
        cy.get(Locators.Headers.Logout).eq(3).should("be.visible")
        cy.get(Locators.Headers.Logout).eq(3).click()
        cy.url().should("contains", "/login")
        cy.get(Locators.Headers.Login).eq(1).should("be.visible")
    })
    it("Login without password",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Password).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login without email",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Login with incorrect email",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(invalidEmailFirst)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Poruka).should("be.visible").and("have.text", "Bad Credentials")
    })
    it("Login with email without @",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(invalidEmailSecond)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'svetlanamailinator.com' is missing an '@'.")
        })
    })
    it("Login whit incorresct email, whit ?", ()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(invalidEmailThirt)
        cy.get(Locators.Login.Password).type(correctPassword)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("A part following '@' should not contain the symbol '?'.")
        })
    })
    it("Login with password, less than 8 character",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(invalidPasswordFirst)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Poruka).should("be.visible").and("have.text", "Bad Credentials")
    })
    it("Login with password, no number",()=> {
        cy.get(Locators.Headers.Login).eq(1).click()
        cy.get(Locators.Login.Email).type(correctEmail)
        cy.get(Locators.Login.Password).type(invalidPasswordSecond)
        cy.get(Locators.Login.Submit).click()
        cy.get(Locators.Login.Poruka).should("be.visible").and("have.text", "Bad Credentials")
    })
    
    it("Uloguj usera", ()=> {
        cy.visit("https://gallery-app.vivifyideas.com/")
        cy.uloguj(correctEmail, correctPassword)
    })

    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    })
})