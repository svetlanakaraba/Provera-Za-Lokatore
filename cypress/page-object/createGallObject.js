export default class AuthCreateGall {

    get picTitle1() {
        return cy.get("#title")
    }
    get description1() {
        return cy.get("#description")
    }
    get picture1() {
    return cy.get(".form-control").eq(2)
    }
    get addImage() {
        return cy.get("button")
    }
    get submit() {
        return cy.get(".btn").eq(0)
    }
    get cencel() {
        return cy.get(".btn").eq(1)
    }

    createGall(imeGall, opisGall, slika) {
        this.picTitle1.type(imeGall)
        this.description1.type(opisGall)
        this.picture1.type(slika)
        this.submit.click()
    }
}

export const authCreateGall = new AuthCreateGall