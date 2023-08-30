describe("template spec", () => {
  beforeEach(() => {
    cy.exec("npm run testdb:reseed");
  });
  it("passes", () => {
    cy.visit("localhost:3000");
  });
});
