export default class AuthRegister {

    get firstName () {
        return cy.get("#first-name")
    }
    get lastName () {
        return cy.get("#last-name")
    }
    get email () {
        return cy.get("#email")
    }
    get password () {
        return cy.get("#password")
    }
    get passwordConf () {
        return cy.get("#password-confirmation")
    }
    get terms () {
        return cy.get(".form-check-input")
    }
    get submit () {
        return cy.get(".btn")
    }

register(ime, prezime, mejl, lozinka, lozinkaOpet) {
    this.firstName.type(ime)
    this.lastName.type(prezime)
    this.email.type(mejl)
    this.password.type(lozinka)
    this.passwordConf.type(lozinkaOpet)
    this.terms.click()
    this.submit.click()
}
}

export const authRegister = new AuthRegister()