
// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Watchlist = () => {
//   const [watchlist, setWatchlist] = useState([]);
// const navigate = useNavigate();
//   useEffect(() => {
//   fetch('/api/watchlist', { credentials: 'include' })
//     .then(res => res.json())
//     .then(data => {
//       // fetch details: details = data.watchlist.map(id => fetch(`/api/movies/${id}`)...)
//       setWatchlist(data.watchlist || []);
//     });
// }, []);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem('watchlist')) || [];
//     setWatchlist(stored);
//   }, []);


// export default Watchlist;
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Watchlist.css';

export default function Watchlist() {
  const { user, refreshUser, loading: authLoading } = useAuth();
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Update local state when user context changes
  useEffect(() => {
    if (!authLoading) {
      if (user && user.watchlist) {
        setWatchlist(user.watchlist);
        setLoading(false);
      } else if (!user) {
        // If not logged in, we shouldn't be here, but let's handle it
        setWatchlist([]);
        setLoading(false);
      }
    }
  }, [user, authLoading]);

  // Fallback: Fetch if for some reason context is empty but we expect data
  useEffect(() => {
    if (!authLoading && user && (!user.watchlist || user.watchlist.length === 0)) {
      fetch('/api/watchlist', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
          if (data.watchlist && data.watchlist.length > 0) {
            setWatchlist(data.watchlist);
          }
        })
        .catch(err => console.error("Sync error:", err));
    }
  }, [authLoading, user]);

  const handleRemove = async (imdbID) => {
    try {
      const res = await fetch('/api/watchlist', {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imdbID })
      });
      if (res.ok) {
        setWatchlist(prev => prev.filter(m => m.imdbID !== imdbID));
        refreshUser(); // Update global user state
      } else {
        alert("Failed to remove movie");
      }
    } catch (err) {
      console.error(err);
      alert("Error removing movie");
    }
  };

  if (loading) {
    return <div className="watchlist-container"><h2>Loading...</h2></div>;
  }

  return (
    <div className="watchlist-container">
      <div className="watchlist-header">
        <button 
          onClick={() => navigate('/')} 
          className="back-button"
        >
          ← Back to Home
        </button>
        <h2>Your Watchlist</h2>
      </div>

      {watchlist.length === 0 ? (
        <div className="empty-watchlist">
          <p>No movies in your watchlist yet.</p>
          <button onClick={() => navigate('/')} className="explore-button">
            Explore Movies
          </button>
        </div>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map(movie => (
            <div key={movie.imdbID} className="watchlist-card">
              <div className="image-container">
                <img src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"} alt={movie.Title} />
                <button 
                  className="remove-btn" 
                  onClick={() => handleRemove(movie.imdbID)}
                  title="Remove from watchlist"
                >
                  &times;
                </button>
              </div>
              <div className="watchlist-card-body">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
