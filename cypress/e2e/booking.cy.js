describe("Booking", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("a").contains("Log in").click();
    cy.url().should("include", "/login");
    cy.get('input[name="email"]').type(Cypress.env("cypressEmail"));
    cy.get('input[name="password"]').type(Cypress.env("cypressPassword"));
    cy.get('button[type="submit"]').click();
    cy.get('button[aria-controls="main-menu"]').should("be.visible"); // Verify login
  });

  it("allows a registered customer to create a booking at a Venue", () => {
    const startDate = Math.floor(Math.random() * 26) + 1;
    const endDate = startDate + 2;

    cy.visit("/");
    cy.get('a[href^="/noroff-fed-pe2/venues/"]').first().click();

    // Select dates
    cy.get("#dates").click();
    for (let i = 0; i < 24; i++) {
      cy.get(
        "span.react-datepicker__navigation-icon.react-datepicker__navigation-icon--next"
      ).click();
    }
    cy.get('div[role="option"]').contains(startDate).click();
    cy.get('div[role="option"]').contains(endDate).click();

    // Fill booking form and submit
    cy.get("span").contains("2").click();
    cy.get('button[type="submit"]').click();

    // Verify booking
    cy.get("h2").contains("Confirm Booking").should("be.visible");
    cy.get("button").contains("Book now").click();

    // Verify booking success
    cy.get("h2").contains("Booking Successful!").should("be.visible");
    cy.get("p").contains("is confirmed.").should("be.visible");
  });

  it("allows a registered customer to view their upcoming bookings", () => {
    cy.get('button[aria-controls="main-menu"]').click();
    cy.get("nav").contains("Bookings").click(); // Click the bookings link
    cy.get("h1").contains("Bookings").should("be.visible"); // Check for bookings section
    cy.get("h2").should("have.length.at.least", 1); // Check for at least one booking
  });
});
