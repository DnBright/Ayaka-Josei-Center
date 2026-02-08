import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const resp = await axios.post('http://127.0.0.1:5005/api/auth/login', { username, password });
      localStorage.setItem('token', resp.data.token);
      localStorage.setItem('role', resp.data.role);

      const prefix = (resp.data.role === 'Super Admin' || resp.data.role === 'Editor') ? '/admin' : '/penulis';
      navigate(prefix);
    } catch (err) {
      setError('Username atau password salah');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card glass-card fade-in">
        <div className="login-header">
          <div className="lock-icon"><Lock size={32} /></div>
          <h2>Login Panel</h2>
          <p>Akses Management Ayaka Josei Center</p>
        </div>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="btn-login">Login Sekarang</button>
        </form>
      </div>

      <style jsx="true">{`
        .login-page {
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8fafc;
        }
        .login-card {
          width: 100%;
          max-width: 400px;
          padding: 3rem;
          border-radius: 24px;
        }
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        .lock-icon {
          width: 64px;
          height: 64px;
          background: var(--accent);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
        }
        input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          font-size: 1rem;
          transition: var(--transition);
        }
        input:focus {
          border-color: var(--accent);
          box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }
        .btn-login {
          width: 100%;
          padding: 1rem;
          background: var(--primary);
          color: white;
          border-radius: 12px;
          font-weight: 600;
          margin-top: 1rem;
        }
        .error-msg {
          color: #ef4444;
          font-size: 0.875rem;
          margin-bottom: 1rem;
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default Login;
