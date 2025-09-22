
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import firebaseApp from '../firebase';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    const auth = getAuth(firebaseApp);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess('Signup successful! Please login.');
      setError('');
      setIsLogin(true);
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="login-container" style={{ fontFamily: 'Verdana, Geneva, Tahoma, sans-serif' }}>
      <form onSubmit={isLogin ? handleLogin : handleSignup} className="login-form" style={{ fontFamily: 'inherit' }}>
        <h2 className="login-title">{isLogin ? 'Login to CRM 1' : 'Sign Up for CRM 1'}</h2>
        {success && <div className="login-success">{success}</div>}
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="login-input"
          style={{ fontFamily: 'inherit' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="login-input"
          style={{ fontFamily: 'inherit' }}
        />
        {!isLogin && (
          <input
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            placeholder="Re-enter Password"
            required
            className="login-input"
            style={{ fontFamily: 'inherit' }}
          />
        )}
        <button
          type="submit"
          className="login-button login-btn-wide"
        >
          {isLogin ? 'Login' : 'Sign Up'}
        </button>
        {error && <div className="login-error">{error}</div>}
        <div className="login-toggle" style={{ fontFamily: 'inherit' }}>
          {isLogin ? (
            <span>Don't have an account? <button type="button" onClick={() => setIsLogin(false)} className="login-link" style={{ fontFamily: 'inherit', background: 'none', color: '#2563eb', textDecoration: 'underline', border: 'none', padding: 0, fontSize: '1em', cursor: 'pointer' }}>Sign Up</button></span>
          ) : (
            <span>Already have an account? <button type="button" onClick={() => setIsLogin(true)} className="login-link" style={{ fontFamily: 'inherit', background: 'none', color: '#2563eb', textDecoration: 'underline', border: 'none', padding: 0, fontSize: '1em', cursor: 'pointer' }}>Login</button></span>
          )}
        </div>
      </form>
    </div>
  );
};

export default AuthForm;