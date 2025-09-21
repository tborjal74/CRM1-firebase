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
    <div className="crm-home-wrapper">
      <aside className="crm-sidebar">
        <div className="crm-logo">CRM 1</div>
        <nav>
          <ul>
            <li><a href="/home">Dashboard</a></li>
            <li><a href="#">Customers</a></li>
            <li><a href="#">Sales</a></li>
            <li><button onClick={handleLogout} className="logout-link">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="crm-main-content">
        <header className="crm-header">
          <h1>Welcome back!</h1>
          <span className="crm-user">{user}</span>
        </header>
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
      </main>
    </div>
  );
};

export default Home;
