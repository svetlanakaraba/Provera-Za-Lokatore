import faker from 'faker'
//import { it } from 'mocha'
import {authRegister} from "../page-object/registerObject.js"
const Locators = require("../fixtures/Locators.json")
const fakerEmail = faker.internet.email()

describe ("Testovi za register",()=> {
    let firstName = "Svetlana"
    let lastName = "Karaba"
    let correctEmail = "skaraba@mailinator.com"
    let correctPassword = "test1234"
    let correctPasswordConf = "test1234"
    let invalidEmailFirst = "skarabamailinator.com"
    let invalidEmailSecond = "skaraba@!mailinator.com"
    let invalidPasswordConf = "te1234"
    let invalidPasswordFirst = "1234"
    let invalidPasswordConfFirst = "1234"
    let invalidPasswordSecond = "qwertyui"
    let invalidPasswordConfSecond = "qwertyui"

    it("Register with POM", ()=> {
        cy.visit("/register")
        authRegister.register("Svetlana", "Karaba", "nekimail@gmail.com", "test123123", "test123123")
    })

    beforeEach("visit link", ()=>{
        cy.visit("/")
        cy.url().should("contains", "https://gallery-app")
    })

    it("Visit Gallery App",()=> {
        cy.url().should("contains", "/")
        cy.url().should("include", "https://gallery-app")
    })
    it("Click on Register", ()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("be.visible").and("have.text", "Register")
        cy.get(Locators.Register.firstName).should("be.visible")
        cy.get(Locators.Register.lastName).should("be.visible")
    })
    it("Register without First Name",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.firstName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register without Last Name",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.lastName).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register without email",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register whit invalid email, whitout @",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(invalidEmailFirst)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please include an '@' in the email address. 'skarabamailinator.com' is missing an '@'.")
    })
})
    it("Register whit invalid email, whit!",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(invalidEmailSecond)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Email).then(($input)=> {
            expect($input[0].validationMessage).to.eq("A part following '@' should not contain the symbol '!'.")
        })
    })    
    it("Register without password",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Password).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register without password-confirmation",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.PasswordConf).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
        })
    })
    it("Register without check Terms and Conditions",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Poruka).should("be.visible").and("have.text", "The terms and conditions must be accepted.")
    })
    it("Register with wrong passford confirmation", ()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Poruka).should("be.visible").and("have.text", "The password confirmation does not match.")
    })
    it("Register with invalid password, less than 8 characters", ()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(invalidPasswordFirst)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConfFirst)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Poruka).should("be.visible").and("have.text", "The password must be at least 8 characters.")
    })
    it("Register with invalid password, only letters",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(correctEmail)
        cy.get(Locators.Register.Password).type(invalidPasswordSecond)
        cy.get(Locators.Register.PasswordConf).type(invalidPasswordConfSecond)
        cy.get(Locators.Register.formCheck).click()
        cy.get(Locators.Register.Submit).click()
        cy.url().should("contains", "/register")
        cy.get(Locators.Register.Title).should("have.text", "Register")
        cy.get(Locators.Register.Poruka).should("be.visible").and("have.text", "The password format is invalid.")
    })
    it.only("Successfull registration",()=> {
        cy.get(Locators.Headers.Register).eq(2).click()
        cy.get(Locators.Register.firstName).type(firstName)
        cy.get(Locators.Register.lastName).type(lastName)
        cy.get(Locators.Register.Email).type(fakerEmail)
        cy.get(Locators.Register.Password).type(correctPassword)
        cy.get(Locators.Register.PasswordConf).type(correctPasswordConf)
        cy.get(Locators.Register.formCheck).click()
        //cy.get(Locators.Register.Submit).click()
        cy.get("#first-name").clear()
        //cy.url().should("contains", "/")
        //cy.get(Locators.Register.Title).should("have.text", "All Galleries")
        //cy.get(Locators.Headers.Logout).eq(3).should("be.visible")
    })

    afterEach("Clerovanje casha", ()=> {
        cy.clearLocalStorage()
    })  
})