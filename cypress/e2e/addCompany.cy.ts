describe("adding a company", () => {
  after(() => {
    cy.exec("npm run testdb:reseed");
  });

  it("should be able to add a company when logged in", () => {
    cy.visit("localhost:3000/companies/newCompany");
    cy.login();
    cy.get("#name").type("Booking.com");
    cy.get("#indReferentNumber").type("9001420");
    cy.get("#website").type("https://www.booking.com/careers");
    cy.get("#category").type("Software Company");
    cy.get("#city").type("Amsterdam");
    cy.get("#street").type("Rokin");
    cy.get("#houseNumber").type("90");
    cy.get("#postCode").type("1012AA");
    cy.get("button").contains("Add Company").click();

    cy.get(".error").should("not.exist");
    // Form should be cleared
    cy.get("#name").should("have.value", "");
  });
});
