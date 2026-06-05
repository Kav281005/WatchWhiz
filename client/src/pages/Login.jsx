import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await login({ username, password });
      navigate('/'); // Success: redirect to home
    } catch (err) {
      console.error('Login failed:', err);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="content">
        <h1 className="header">Welcome Back</h1>
        
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleLogin}>
          <div className="input-container">
            <input
              type="text"
              name="username"
              className="detail"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              name="password"
              className="detail"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn int">Sign In</button>
        </form>

        <Link className="upbtn" to="/register">Don't have an account? Sign up</Link>

        <footer>
          <p>By continuing, you agree to our <b>Terms of Service</b></p>
          <p>Forgot your password?</p>
        </footer>
      </div>
    </div>
  );
}

export default Login;
