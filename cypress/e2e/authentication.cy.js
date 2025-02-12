describe("Authentication", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("shows validation errors with invalid credentials", () => {
    cy.get("a").contains("Log in").click();
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type("invalid@email");
    cy.get('input[name="password"]').type("short");
    cy.get("p").contains("Please enter a valid email address").should("exist");
    cy.get('input[name="email"]').clear().type("invalid@email.com");
    cy.get("p")
      .contains(
        "Please use a valid Noroff student email address (@stud.noroff.no)"
      )
      .should("exist");
    cy.get("p")
      .contains("Password must be at least 8 characters long")
      .should("exist");
  });

  it("allows a user to login and out", () => {
    cy.get("a").contains("Log in").click();
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type(Cypress.env("cypressEmail"));
    cy.get('input[name="password"]').type(Cypress.env("cypressPassword"));
    cy.get('button[type="submit"]').click();
    cy.get('button[aria-controls="main-menu"]').should("be.visible");
    // Check the user in local storage after successful login
    cy.window().then((win) => {
      const user = win.localStorage.getItem("user");
      expect(user).not.to.be.null;
    });
    cy.get('button[aria-controls="main-menu"]').click();
    cy.get("button").contains("Log Out").click();
    cy.get('button[aria-controls="main-menu"]').should("not.exist");
    // Check the user in local storage after successful logout
    cy.window().then((win) => {
      const user = win.localStorage.getItem("user");
      expect(user).to.be.null;
    });
  });
});
