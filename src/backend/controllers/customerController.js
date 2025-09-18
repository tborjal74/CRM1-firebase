const Customer = require('../models/customer');
// Simulate database with in-memory array (replace with Firebase calls later)
const customers = [];

const admin = require('firebase-admin');
const db = admin.database();
const customersRef = db.ref('customers');

exports.getAllCustomers = (req, res) => {
  customersRef.once('value', (snapshot) => {
    const data = snapshot.val() || {};
    // Convert object to array
    const customerList = Object.keys(data).map(id => ({ id, ...data[id] }));
    res.json(customerList);
  }, (error) => {
    res.status(500).json({ error: error.message });
  });
};

exports.addCustomer = (req, res) => {
  const { name, email, phone } = req.body;
  const newCustomerRef = customersRef.push();
  const newCustomer = { name, email, phone };
  newCustomerRef.set(newCustomer, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(201).json({ id: newCustomerRef.key, ...newCustomer });
    }
  });
};

exports.editCustomer = (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedCustomer = { name, email, phone };
  customersRef.child(id).update(updatedCustomer, (error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ id, ...updatedCustomer });
    }
  });
};

exports.deleteCustomer = (req, res) => {
  const { id } = req.params;
  customersRef.child(id).remove((error) => {
    if (error) {
      res.status(500).json({ error: error.message });
    } else {
      res.json({ message: 'Customer deleted', id });
    }
  });
};