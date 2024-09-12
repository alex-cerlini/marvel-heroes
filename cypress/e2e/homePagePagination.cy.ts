describe("Home Page Pagination", () => {
    beforeEach(() => {
        cy.visit("localhost:3000");
    });

    it("should forward to next page when click on the number", () => {
        cy.get('nav').contains('2').click();
        cy.location().should((location) => {
            expect(location.href).to.match(/^http:\/\/localhost:3000\/[a-z]{2}\?page=2$/);
        })
    })

    it("should forward to next page when click on the next button", () => {
        cy.get('nav').contains('Next').click();
        cy.location().should((location) => {
            expect(location.href).to.match(/^http:\/\/localhost:3000\/[a-z]{2}\?page=2$/);
        })
    })
});
