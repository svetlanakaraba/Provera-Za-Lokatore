const Locators = require("../fixtures/Locators.json")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { it } = require("mocha")
//const { describe } = require("mocha")
import AuthCreateGall, {authCreateGall} from "../page-object/createGallObject.js"
//import { it } from "mocha"

describe("Testing Create Gallery", ()=> {
    let correctEmail = "karabatest@gmail.com"
    let correctPassword = "test123456"
    let picTitle1 = "MojaSlika"
    let picDescription1 = "PrvaSlika"
    let picture1 = "https://eskipaper.com/images/walle-1.jpg"
    let pictureWrong = "https://lh3.googleusercontent.com/proxy/xcNqTRPtk3jf6CzMTsxiSxs8ixNubsKfdcAoO5oTfVxLkBf5Cvv40RGL4kzZKr9ztav-dCgoVAr3jbDOAWS4isEUMnARGS5yhQyL7G9QZ-g"
    let picTitle2 = "MojeSlike"
    let picDescription2 = "ViseSlika"
    let picture2 = "https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Venus_globe.jpg/480px-Venus_globe.jpg"
    let picture3 = "https://www.personal.psu.edu/bvt5083/picFormats/earth.jpg"
    let picture4 = "https://cdn.wallpapersafari.com/47/89/u14i8A.jpg"

    beforeEach("Logine User", ()=> {
        cy.uloguj(correctEmail, correctPassword)
        cy.server()
        cy.route("GET", "https://gallery-api.vivifyideas.com/api/galleries?page=1&term=").as("sacekaj")
        cy.wait("@sacekaj")
    })
    it("Create Gallery whit POM", ()=> {
        cy.visit("/create")
        authCreateGall.createGall(picTitle1, picDescription1, picture1)
    })
    it("Click on Create Gallery", ()=> {
        cy.get(Locators.Headers.CreateGallery).eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get(Locators.CreateGall.Title).should("be.visible").and("have.text", "Create Gallery")
    })
    it.only("Create Gallery", ()=> {
        cy.get(Locators.Headers.CreateGallery).eq(2).click()
        cy.get(Locators.CreateGall.PicTitle).type(picTitle1)
        cy.get(Locators.CreateGall.PicDescription).type(picDescription1)
        cy.get(Locators.CreateGall.Picture).eq(2).type(picture1)
        cy.get(Locators.CreateGall.Submit).eq(0).click()
        cy.wait(2000)
        cy.url().should("contains", "https://gallery-app")
        cy.expect("/").to.equal("/")
        cy.get(Locators.Headers.MyGalleries).eq(1).click()
        cy.url().should("contains", "/my-galleries")
        cy.contains(picTitle1).should("be.visible")
    })
    it("Create Gallery, no title", ()=> {
        cy.get(".nav-link").eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get("#description").type(picDescription1)
        cy.get(".form-control").eq(2).type(picture1)
        cy.get(".btn").eq(0).click()
        cy.get("#title").then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })
})
    it("Create Gallery, no description", ()=> {
        cy.get(".nav-link").eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get("#title").type(picTitle1)
        cy.get(".form-control").eq(2).type(picture1)
        cy.get(".btn").eq(0).click()
        cy.url().should("contains", "https://gallery-app")
        cy.expect("/").to.equal("/")
    })
    it("Create Gallery, no image", ()=> {
        cy.get(".nav-link").eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get("#title").type(picTitle1)
        cy.get("#description").type(picDescription1)
        cy.get(".btn").eq(0).click()
        cy.get(".form-control").eq(2).then(($input)=> {
            expect($input[0].validationMessage).to.eq("Please fill out this field.")
    })
})
    it("Create Gallery, wrong image format", ()=> {
        cy.get(".nav-link").eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get("#title").type(picTitle1)
        cy.get("#description").type(picDescription1)
        cy.get(".form-control").eq(2).type(pictureWrong)
        cy.get(".btn").eq(0).click()
        cy.get(".alert").should("be.visible").and("have.text", "Wrong format of image")
    })
    it("Create Gallery whit more images", ()=> {
        cy.get(".nav-link").eq(2).click()
        cy.expect("/create").to.equal("/create")
        cy.get("#title").type(picTitle2)
        cy.get("#description").type(picDescription2)
        cy.get(".form-control").eq(2).type(picture2)
        cy.contains("Add").click()
        cy.get(".form-control").eq(3).type(picture3)
        cy.contains("Add").click()
        cy.get(".form-control").eq(4).type(picture4)
        cy.get(".btn").eq(0).click()
        cy.expect("/").to.equal("/")
        cy.wait(2000)
        cy.get(".nav-link").eq(1).click()
        cy.url().should("contains", "/my-galleries")
        cy.contains(picTitle2).should("be.visible")
    })
    it("Brisanje slike i menjanje pozicije", ()=> {
        cy.get(".nav-link").eq(1).click()
        cy.url().should("contains", "/my-galleries")
        cy.contains(picTitle2).click()
        cy.wait(2000)
        cy.get(".btn").eq(1).click()
        cy.wait(2000)
        cy.get(".input-buttons").eq(3).click()
        cy.wait(2000)
        cy.get(".input-buttons").eq(4).click()
        cy.get(".btn").eq(0).click()

    })











})