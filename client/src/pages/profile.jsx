import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Watchlist.css'; // Reuse watchlist styles

export default function Profile() {
  const { user, logout, refreshUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    setLoading(false);
  }, [user, navigate]);

  const handleRemove = async (imdbID) => {
    try {
      const res = await fetch('/api/watchlist', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imdbID })
      });
      if (res.ok) {
        refreshUser(); // Update global user state immediately
      } else {
        alert("Failed to remove movie");
      }
    } catch (err) {
      console.error(err);
      alert("Error removing movie");
    }
  };

  if (!user) return null;

  return (
    <div className="watchlist-container">
      <div className="profile-header" style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', marginBottom: '1rem', overflowWrap: 'anywhere' }}>Welcome, {user.username}!</h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{user.email}</p>
        <button 
          onClick={logout}
          style={{ 
            marginTop: '1.5rem', 
            padding: '0.75rem 2rem', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '0.5rem',
            cursor: 'pointer',
            fontWeight: '600'
          }}
        >
          Sign Out
        </button>
      </div>

      <div className="watchlist-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h3 style={{ fontSize: '2rem', fontWeight: '700' }}>Your Watchlist Summary</h3>
          <Link to="/watchlist" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
            View All →
          </Link>
        </div>

        {loading ? (
          <p>Loading your movies...</p>
        ) : user.watchlist?.length === 0 ? (
          <div className="empty-watchlist">
            <p>Your watchlist is empty.</p>
            <Link to="/" className="explore-button" style={{ textDecoration: 'none' }}>
              Start Adding Movies
            </Link>
          </div>
        ) : (
          <div className="watchlist-grid">
            {user.watchlist.slice(0, 4).map(movie => (
              <div key={movie.imdbID} className="watchlist-card">
                <div className="image-container" style={{ height: '280px' }}>
                  <Link to={`/movie/${movie.imdbID}`}>
                    <img src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"} alt={movie.Title} />
                  </Link>
                  <button 
                    className="remove-btn" 
                    onClick={() => handleRemove(movie.imdbID)}
                    title="Remove from watchlist"
                    style={{ opacity: 1 }} /* Always visible on profile for clarity */
                  >
                    &times;
                  </button>
                </div>
                <div className="watchlist-card-body">
                  <Link to={`/movie/${movie.imdbID}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <h3>{movie.Title}</h3>
                    <p>{movie.Year}</p>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
