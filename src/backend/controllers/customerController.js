const Customer = require('../models/customer');
// Simulate database with in-memory array (replace with Firebase calls later)
const customers = [];

exports.getAllCustomers = (req, res) => {
  res.json(customers);
};

exports.addCustomer = (req, res) => {
  const { name, email, phone } = req.body;
  const newCustomer = new Customer(Date.now(), name, email, phone);
  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};