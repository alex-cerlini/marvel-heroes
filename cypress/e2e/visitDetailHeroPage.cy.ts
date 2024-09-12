describe("Visit Detail Hero Page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });

  it("should display results", () => {
    cy.get("#hero-card").should("have.length", 1);
  });

  it("should forward to details on see more click", () => {
    cy.get("#hero-card").contains("See more").click();
    cy.location().should((location) => {
      expect(location.href).to.match(
        /^http:\/\/localhost:3000\/[a-z]{2}\/character\/[0-9]+$/
      );
    });
  });
});
