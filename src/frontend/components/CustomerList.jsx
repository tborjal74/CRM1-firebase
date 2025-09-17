import React, { useEffect, useState } from 'react';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetch('/api/customers')
      .then((res) => res.json())
      .then((data) => setCustomers(data));
  }, []);

  return (
    <div>
      <h2>Customer List</h2>
      <ul>
        {customers.map((c) => (
          <li key={c.id}>{c.name} ({c.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;