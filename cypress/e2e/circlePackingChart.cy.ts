describe("Circle Packing Chart", () => {
    beforeEach(() => {
        cy.visit("localhost:3000");
    });

    it("should render the chart", () => {
        cy.get('#open-chart-drawer').click();
        cy.get('circle').should('exist');
    })
});
