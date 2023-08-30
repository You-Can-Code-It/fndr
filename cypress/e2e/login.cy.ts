describe("template spec", () => {
  after(() => {
    cy.exec("npm run testdb:reseed");
  });

  it("should display the avatar image in the navbar after logging in", () => {
    cy.visit("localhost:3000");
    cy.get('img[alt="User avatar"]').should("not.exist");
    cy.login();
    cy.get('img[alt="User avatar"]').should("exist");
  });
});
