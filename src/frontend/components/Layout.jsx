import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = location.state?.user || '';

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
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/customers">Customers</Link></li>
            <li><Link to="/sales">Sales</Link></li>
            <li><button onClick={handleLogout} className="logout-link">Logout</button></li>
          </ul>
        </nav>
      </aside>
      <main className="crm-main-content">
        <header className="crm-header">
          <h1>Welcome back!</h1>
          <span className="crm-user">{user}</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
