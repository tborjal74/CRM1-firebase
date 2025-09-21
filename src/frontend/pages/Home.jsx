import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';
import firebaseApp from '../firebase';

const Home = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const auth = getAuth(firebaseApp);
    await signOut(auth);
    navigate('/login');
  };

  return (
    <div className="home-container">
      <h1>Welcome to CRM 1 Home Page!</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
    </div>
  );
};

export default Home;
