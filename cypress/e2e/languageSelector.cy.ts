describe("Language Selector", () => {
    it("should change locale to pt on url on change then change back to en", () => {
        cy.visit("localhost:3000");
        cy.contains('English').click().get('#pt').click();

        cy.location().should((location) => {
            expect(location.href).to.match(
                /^http:\/\/localhost:3000\/pt(?:\?page=\d+)?$/

            );
        });

        cy.contains('Português').click().get('#en').click();

        cy.location().should((location) => {
            expect(location.href).to.match(
                /^http:\/\/localhost:3000\/en(?:\?page=\d+)?$/

            );
        });
    })
});
