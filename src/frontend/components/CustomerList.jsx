import React, { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../firebase';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', id: null });
  const [editing, setEditing] = useState(false);

  // Get Firebase ID token
  const getToken = async () => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  // Fetch customers
  const fetchCustomers = async () => {
    const token = await getToken();
    if (!token) return setCustomers([]);
    fetch('/api/customers', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Handle form input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update customer
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getToken();
    if (!token) return;
    if (editing) {
      fetch(`/api/customers/${form.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone }),
      })
        .then(() => {
          setEditing(false);
          setForm({ name: '', email: '', phone: '', id: null });
          fetchCustomers();
        });
    } else {
      fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ name: form.name, email: form.email, phone: form.phone }),
      })
        .then(() => {
          setForm({ name: '', email: '', phone: '', id: null });
          fetchCustomers();
        });
    }
  };

  // Edit customer
  const handleEdit = (customer) => {
    setForm({ name: customer.name, email: customer.email, phone: customer.phone || '', id: customer.id });
    setEditing(true);
  };

  // Delete customer
  const handleDelete = async (id) => {
    const token = await getToken();
    if (!token) return;
    if (window.confirm('Delete this customer?')) {
      fetch(`/api/customers/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(() => fetchCustomers());
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customers</h2>
      <form onSubmit={handleSubmit} className="mb-8 flex gap-4 flex-wrap items-center bg-gray-50 p-4 rounded-lg shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-40 focus:outline-blue-400"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="border px-3 py-2 rounded w-56 focus:outline-blue-400"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="border px-3 py-2 rounded w-32 focus:outline-blue-400"
        />
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded font-semibold shadow">
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => { setEditing(false); setForm({ name: '', email: '', phone: '', id: null }); }}
            className="bg-gray-400 hover:bg-gray-500 text-white px-5 py-2 rounded font-semibold shadow"
          >
            Cancel
          </button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-blue-50 text-gray-700">
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Email</th>
              <th className="px-4 py-3 text-left">Phone</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-gray-400">No customers found.</td>
              </tr>
            ) : (
              customers.map((c) => (
                <tr key={c.id} className="hover:bg-blue-50 transition">
                  <td className="px-4 py-2">
                    <div className="w-10 h-10 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
                      {c.name ? c.name.charAt(0).toUpperCase() : '?'}
                    </div>
                  </td>
                  <td className="px-4 py-2 font-semibold text-gray-800">{c.name}</td>
                  <td className="px-4 py-2 text-gray-700">{c.email}</td>
                  <td className="px-4 py-2 text-gray-700">{c.phone || '-'}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleEdit(c)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded mr-2 font-semibold shadow"
                    >Edit</button>
                    <button
                      onClick={() => handleDelete(c.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded font-semibold shadow"
                    >Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;