import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'demo@demo.com' && password === 'demo') {
      console.log('Login Successful');
      navigate('/data-ingestion');
    } else {
      console.log('Invalid credentials');
    }
  };

  return (
    <div className="login-container">
      <div className="login-branding">
        <img
          src="https://atomicai.xyz/wp-content/uploads/2023/08/%EC%B6%94%EA%B0%80%EC%9A%94%EC%B2%AD_%EA%B0%80%EB%A1%9C%ED%98%95-1.png"
          alt="Atomic AI Logo"
          className="logo"
        />
        <h1>AI Sales Enablement Tool</h1>
        <p>Please Login</p>
      </div>
      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className="forgot-password">
          <a href="/forgot-password">Forgot Password</a>
        </p>
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
    </div>
  );
};

export { Login };
