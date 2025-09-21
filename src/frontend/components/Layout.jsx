import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userEmail, setUserEmail] = React.useState('');

  React.useEffect(() => {
    const { getAuth } = require('firebase/auth');
    const auth = getAuth(firebaseApp);
    setUserEmail(auth.currentUser?.email || '');
  }, []);

  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      // Call backend logout route
      await fetch('/api/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      });
    }
    await signOut(auth);
    // Wait for signOut to complete and verify
    setTimeout(() => {
      const afterLogoutUser = getAuth(firebaseApp).currentUser;
      console.log('After logout, currentUser:', afterLogoutUser);
      if (!afterLogoutUser) {
        console.log('Logout successful, no user logged in.');
      } else {
        console.warn('Logout failed, user still logged in:', afterLogoutUser.email);
      }
      navigate('/login');
    }, 500);
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
          <span className="crm-user">{userEmail}</span>
        </header>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
