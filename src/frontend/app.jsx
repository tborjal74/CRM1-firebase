
import './styles/styles.css';
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Layout from './components/Layout';
import Home from './pages/Home';
import Customers from './pages/Customers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="customers" element={<Customers />} />
          {/* Add more nested routes like <Route path="sales" element={<Sales />} /> */}
        </Route>
        <Route path="/home" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;