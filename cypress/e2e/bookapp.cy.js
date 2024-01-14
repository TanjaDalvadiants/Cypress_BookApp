beforeEach(() => {
    cy.visit("/")
});

describe("Log in page", () => {
    it("page visible", () => {
        cy.contains("Books list").should('be.visible');
    });

    it("log in successful", () => {
        cy.login("test@test.com", "test");
        cy.contains("Добро пожаловать test@test.com").should("be.visible");
    });

    it("empty login", () => {
        cy.login(null, "test"); 
        cy.get("#mail")
            .then((element) => {
            return element[0].checkValidity();
        })
            .should("be.false");
        cy.get("#mail")
            .then((element) => {
            return element[0].validationMessage;
        })
            .should("contain", "Заполните это поле.");
    });
    it("empty pass", () => {
        cy.login("test@test.com", null); 
        cy.get("#pass")
            .then((element) => {
            return element[0].checkValidity();
        })
            .should("be.false");
        cy.get("#pass")
            .then((element) => {
            return element[0].validationMessage;
        })
            .should("contain", "Заполните это поле.");
    });

    describe.only("BookApp testing", () => {
        beforeEach(() => {
            cy.login("test@test.com", "test");
        });

        it("Add new book", () => {
            cy.addBook("Book1", "Author1");
            cy.contains("Book1").should("be.visible");
        });

        it("Add new book to Favorites", () => {
            cy.addBook("Book1", "Author1");
            cy.contains("Add to favorite").first().click();
            cy.contains("Favorites").click();
            cy.contains("Delete from favorite").first().should("be.visible");
        });

        it("Delete book from Favorites", () => {
            cy.addBook("Book1", "Author1");
            cy.contains("Add to favorite").first().click();
            cy.contains("Favorites").click();
            cy.contains("Delete from favorite").first().click();
            cy.contains("Please add some book to favorit on home page!").should("be.visible");
        })
    })
})