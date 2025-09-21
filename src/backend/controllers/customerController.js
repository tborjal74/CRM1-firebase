const Customer = require('../models/customer');
// Simulate database with in-memory array
const customers = [];

const admin = require('firebase-admin');
const db = admin.database();
const customersRef = db.ref('customers');

exports.getAllCustomers = (req, res) => {
  // Get UID from authenticated user (set by auth middleware)
  const uid = req.user && req.user.uid;
  customersRef.once('value', (snapshot) => {
    const data = snapshot.val() || {};
    // Convert object to array and filter by uid, ignore records without uid
    const customerList = Object.keys(data)
      .map(id => ({ id, ...data[id] }))
      .filter(customer => customer.uid && customer.uid === uid);
    res.json(customerList);
  }, (error) => {
    res.status(500).json({ error: error.message });
  });
};

exports.addCustomer = (req, res) => {
  const { name, email, phone } = req.body;
  const uid = req.user && req.user.uid;
  const newCustomerRef = customersRef.push();
  const newCustomer = { name, email, phone, uid };
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