class Sale {
  constructor(id, customerId, amount, date, items = [], notes = '') {
    this.id = id; // Unique sale ID
    this.customerId = customerId; // Reference to customer
    this.amount = amount; // Total sale amount
    this.date = date; // Date of sale
    this.items = items; // Array of items sold
    this.notes = notes; // Optional notes
  }
}

module.exports = Sale;