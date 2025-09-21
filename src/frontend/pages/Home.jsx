import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

import { useLocation } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(location.state?.user || '');

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
          <p>N/A</p>
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
