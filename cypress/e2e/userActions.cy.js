describe("Venue user actions", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("allows a user to view a list of Venues", () => {
    cy.get('a[href^="/noroff-fed-pe2/venues/"]').should(
      "have.length.at.least",
      3
    );
  });

  it("allows a user to search for a specific Venue", () => {
    const searchTerm = "Munkholmen";
    cy.get('input[type="search"]').type(searchTerm);
    cy.get('button[type="submit"]').click();
    cy.get("h2").contains(searchTerm).should("be.visible");
  });

  it("allows a user to view a specific Venue page by id", () => {
    cy.get('a[href^="/noroff-fed-pe2/venues/"]').first().click(); // Click the first venue link
    cy.url().should(
      "match",
      /\/venues\/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/
    ); // Check if the URL matches the expected pattern
    cy.get("h1").should("be.visible"); // Check if the venue title is visible
  });

  it("allows a user to view a calendar with available dates for a Venue", () => {
    cy.get('a[href^="/noroff-fed-pe2/venues/"]').first().click(); // Click the first venue link
    cy.get("aside").should("exist"); // Check if the calendar is visible
    cy.get("#dates").should("exist"); // Check if the calendar has dates
  });
});
