// Simple customer model (for Firebase, just use JS object)
class Customer {
  constructor(id, name, email, phone, interactions = [], sales = []) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.interactions = interactions; // Array of notes or interactions
    this.sales = sales; // Array of sale IDs or objects
  }
}
module.exports = Customer;