
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
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
        setTimeout(() => {
          navigate('/home', { state: { user: email } });
        }, 1000);
      } else {
        setError(data.error || 'Login failed');
        setSuccess('');
      }
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    const auth = getAuth(firebaseApp);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Signup successful! Please login.');
      setError('');
      setIsLogin(true);
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form">
        <h2 className="login-title">{isLogin ? 'Login to CRM 1' : 'Sign Up for CRM 1'}</h2>
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
        <button type="submit" className="login-button">{isLogin ? 'Login' : 'Sign Up'}</button>
        {error && <div className="login-error">{error}</div>}
        <div className="login-toggle">
          {isLogin ? (
            <span>Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="login-link">Sign Up</button></span>
          ) : (
            <span>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="login-link">Login</button></span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;