import { useNavigate, Link } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css'; // Reuse Login styles for consistency

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await register({ username, password, email, fullname });
      navigate('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Registration failed');
    }
  }

  return (
    <div className="container">
      <div className="content">
        <h1 className="header">Join WatchWhiz.x</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <input
              type="text"
              placeholder="Full Name"
              className="detail"
              value={fullname}
              onChange={e => setFullname(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="detail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Username"
              className="detail"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="detail"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn int">Create Account</button>
        </form>

        <Link className="upbtn" to="/login">Already have an account? Log in</Link>

        <footer>
          <p>
            By continuing, you agree to WatchWhiz.x&nbsp;
            <b>Terms of Service</b> and <b>Privacy Policy</b>.
          </p>
        </footer>
      </div>
    </div>
  );
}
