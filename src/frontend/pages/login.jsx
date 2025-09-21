import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase'; // Create and export your firebaseApp instance

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth(firebaseApp);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCredential.user.getIdToken();
      // Send ID token to backend
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });
      const data = await response.json();
      if (response.ok) {
        setSuccess('Login successful!');
        setError('');
        // Handle successful login (e.g., save user info, redirect)
        console.log('User info:', data);
        setTimeout(() => {
          navigate('/home', { state: { user: email } });
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      if (err.code === 'auth/invalid-credential' || err.message.includes('auth/invalid-credential')) {
        setError('Login failed. Incorrect email or password.');
      } else {
        setError(err.message);
      }
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin} className="login-form">
        <h2 className="login-title">Welcome to CRM 1</h2>
        {success && <div className="login-success">{success}</div>}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
        {error && <div className="login-error">{error}</div>}
      </form>
    </div>
  );
};

export default Login;