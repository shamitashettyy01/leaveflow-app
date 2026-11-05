import { useState } from 'react';
import axios from 'axios';
import './Login.css';

function Login({onLogin}) {
  const [role, setRole] = useState('employee');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
     const response = await axios.post(
  `${import.meta.env.VITE_API_URL || 'http://127.0.0.1:5000'}/api/auth/login`,
  {
    email: email.trim().toLowerCase(),
    password: password,
    role: role.toLowerCase()
  }
);

      localStorage.setItem('token', response.data.token);
      localStorage.setItem(
        'user',
        JSON.stringify(response.data.user)
      );

      setMessage('Login successful!');
      if (onLogin) {
  onLogin(response.data.user);
}

      // Dashboard navigation will be connected next.
    } catch (error) {
      setMessage(
        error.response?.data?.message || 'Unable to connect to server'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">LF</div>

        <h1>Welcome to LeaveFlow</h1>
        <p className="login-subtitle">
          Sign in to manage your leaves
        </p>

        <div className="role-buttons">
          <button
            type="button"
            className={role === 'employee' ? 'active' : ''}
            onClick={() => setRole('employee')}
          >
            Employee
          </button>

          <button
            type="button"
            className={role === 'admin' ? 'active' : ''}
            onClick={() => setRole('admin')}
          >
            Admin
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="login-submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {message && (
          <p className="login-message">{message}</p>
        )}

        <p className="login-footer">
          LeaveFlow – Leave Management System
        </p>
      </div>
    </div>
  );
}

export default Login;