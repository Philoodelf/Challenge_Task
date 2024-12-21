describe("Exchange Data Table", () => {
  it("should fetch and display exchange data in a table", () => {
    // Visit the frontend application
    cy.visit("http://localhost:3000/exchange");

    // Verify the table is present
    cy.get("table").should("exist");

    // Wait for the data to load
    cy.intercept("GET", "http://localhost:5000/api/exchange").as("getExchangeData");
    cy.wait("@getExchangeData");

    // Verify that table headers are displayed correctly
    cy.get("thead tr th").should(($headers) => {
      const headerTexts = $headers.map((i, el) => Cypress.$(el).text().trim()).get();
      expect(headerTexts).to.include.members(["ID", "Symbol", "Name", "Type", "Currency", "Country"]);
    });

    // Verify that at least one row of data is displayed
    cy.get("tbody tr").should("have.length.greaterThan", 0);

    // Verify specific cell content (adjust as per your JSON data)
    cy.get("tbody tr:first-child td").eq(1).should("not.be.empty"); // Check symbol
  });
});
