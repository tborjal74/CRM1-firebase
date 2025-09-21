import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

import { useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || '');
  const [customerCount, setCustomerCount] = useState(null);

  React.useEffect(() => {
    // Fetch customer list from backend API with auth token
    const fetchCustomers = async () => {
      try {
        const auth = getAuth(firebaseApp);
        const currentUser = auth.currentUser;
        if (!currentUser) {
          setCustomerCount(0);
          return;
        }
        const token = await currentUser.getIdToken();
        const res = await fetch('/api/customers', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        setCustomerCount(Array.isArray(data) ? data.length : 0);
      } catch {
        setCustomerCount(0);
      }
    };
    fetchCustomers();
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    navigate('/login');
  };

  return (
    <>
      <section className="crm-stats">
        <div className="crm-card">
          <h2>Total Customers</h2>
          <p>{customerCount !== null ? customerCount : 'Loading...'}</p>
        </div>
        <div className="crm-card">
          <h2>Total Sales</h2>
          <p>N/A</p>
        </div>
        <div className="crm-card">
          <h2>Open Tickets</h2>
          <p>N/A</p>
        </div>
      </section>
      <section className="crm-welcome">
        <h2>CRM 1 Dashboard</h2>
        <p>Manage your customers, sales, and support tickets all in one place.</p>
      </section>
    </>
  );
};

export default Home;
