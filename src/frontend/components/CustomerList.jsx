import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '../firebase';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [form, setForm] = useState({ name: '', email: '', phone: '', id: null });
  const [editing, setEditing] = useState(false);
  const [userInfo, setUserInfo] = useState({ email: '', uid: '' });

  // Get Firebase ID token
  const getToken = async () => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user) {
      setUserInfo({ email: user.email, uid: user.uid });
      console.log('Current user email:', user.email);
      console.log('Current user UID:', user.uid);
      return await user.getIdToken();
    }
    setUserInfo({ email: '', uid: '' });
    console.log('No user logged in');
    return null;
  };

  // Fetch customers
  const fetchCustomers = async () => {
    const token = await getToken();
    if (!token) return setCustomers([]);
    console.log('Token being sent for fetchCustomers:', token);
    fetch('/api/customers', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => setCustomers(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    const auth = getAuth(firebaseApp);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchCustomers();
      } else {
        setCustomers([]);
      }
    });
    return () => unsubscribe();
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
    console.log('Token being sent for handleSubmit:', token);
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
    console.log('Token being sent for handleDelete:', token);
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
      <div className="mb-4 p-2 bg-blue-50 rounded">
        <strong>Current User:</strong> {userInfo.email || 'None'}<br />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Customer List</h2>
      <form onSubmit={handleSubmit} className="mb-12 flex gap-4 flex-wrap items-center bg-gray-50 p-4 rounded-lg shadow">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="crm-input crm-input-name"
        />
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
          className="crm-input crm-input-email"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="crm-input crm-input-phone"
        />
        <button type="submit" className="crm-btn-add">
          {editing ? 'Update' : 'Add'}
        </button>
        {editing && (
          <button
            type="button"
            onClick={() => { setEditing(false); setForm({ name: '', email: '', phone: '', id: null }); }}
            className="crm-btn-cancel"
          >
            Cancel
          </button>
        )}
      </form>
      <br></br>
  <div className="overflow-x-auto mt-8">
      <table className="crm-table">
      <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {customers.length === 0 ? (
        <tr>
          <td colSpan={4} className="text-center py-8 text-gray-400 text-lg">No customers found.</td>
        </tr>
      ) : (
        customers.map((c, idx) => (
          <tr key={c.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="font-medium text-gray-900">{c.name}</td>
            <td className="text-gray-700">{c.email}</td>
            <td className="text-gray-700">{c.phone || '-'}</td>
            <td>
              <button onClick={() => handleEdit(c)} className="crm-action-btn edit">Edit</button>
              <button onClick={() => handleDelete(c.id)} className="crm-action-btn delete">Delete</button>
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