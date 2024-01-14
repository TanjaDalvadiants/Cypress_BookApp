beforeEach(() => {
    cy.visit("/");
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
        cy.login(" ", "test"); 
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
    it("false pass", () => {
        cy.login("test@test.com", "1"); 
        cy.get("#pass")
        cy.contains("Неправильая почта или пароль").should("be.visible");
    });

  describe("Test favourite books list app", () => {
    it("Add new book and then add to favourite", () => {
      cy.login("bropet@mail.ru", "123");
  
      cy.addBook("testName1", "testDescription1");
  
      cy.addToFavorite();
      cy.contains("Delete from favorite").should("be.visible");
  
      cy.logout();
    });
  
    it("Delete book from favourites", () => {
      cy.login("bropet@mail.ru", "123");
  
      cy.contains("Delete from favorite").should("be.visible");
      cy.contains("Delete from favorite").click();
      cy.contains("Add to favorite").should("be.visible");
  
      cy.logout();
    });
  
    it("Add new book and then add to favourite", () => {
      cy.login("bropet@mail.ru", "123");
  
      cy.addToFavorite();
      cy.contains("Delete from favorite").should("be.visible");
  
      cy.contains("Favorites").click();
      cy.contains("Delete from favorite").should("be.visible");
      cy.contains("Delete from favorite").click();
      cy.contains("Please add some book to favorit on home page!").should("be.visible");
  
      cy.logout();
    });
  });
})