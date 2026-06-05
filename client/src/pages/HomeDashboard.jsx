// src/pages/HomeDashboard.jsx
import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../api/fetchMovies';
import { Link } from 'react-router-dom';
import './HomeDashboard.css';
import { FaPlus, FaCheck } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const HomeDashboard = () => {
const [movies, setMovies] = useState([]);
const { user, refreshUser } = useAuth();

async function handleAddToWatchlist(movie) {
    try {
      const res = await fetch('/api/watchlist', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ movie })
      });
      if (!res.ok) throw new Error('Failed to add');
      refreshUser(); // Update user state to reflect changes
      alert(`"${movie.Title}" added to your watchlist!`);
    } catch (err) {
      console.error(err);
      alert('Error adding to watchlist');
    }
  }

const isInWatchlist = (imdbID) => {
  return user?.watchlist?.some(m => m.imdbID === imdbID);
};

useEffect(() => {
  fetchMovies().then((data) => {
    setMovies(data);
  });
}, []);


  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="dashboard-overlay" />
        <div className="dashboard-hero-content">
          <h1 className="dashboard-title">Welcome back to WatchWhiz.x</h1>
          <p className="dashboard-subtitle">Here’s your movie universe, personalized.</p>
        </div>
      </div>

      {/* Dashboard-only Sections */}
      <div className="dashboard-main">
        {user && (
          <div className='counts'>
            <section className="dashboard-section">
              <Link to="/watchlist" className="watchlist-link">Your Watchlist</Link>
              <p>{user.watchlist?.length || 0} movies saved</p>
            </section>
          </div>
        )}

        {/* Movie Cards */}
        <section className="dashboard-section full-width">
          <h2 className="section-title">🎬 Must Watches</h2>
          {movies.length === 0 ? (
            <p className="no-movies-text">No movies found</p>
          ) : (
            <div className="movie-grid">
              {movies.map((movie) => (
                <Link key={movie.imdbID} to={`/movie/${movie.imdbID}`} className="movie-card-link">
                  <div className="movie-card">
                    <img
                      src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"}
                      alt={movie.Title}
                      className="movie-poster"
                    />
                    <div className="movie-info">
                      <h3 className="movie-title">{movie.Title}</h3>
                      <p className="movie-year">{movie.Year}</p>
                      
                      <div className="watchlist-icon">
                        {user ? (
                          isInWatchlist(movie.imdbID) ? (
                            <button className="in-watchlist-btn" disabled>
                              <FaCheck /> In Watchlist
                            </button>
                          ) : (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleAddToWatchlist(movie);
                              }}
                              className="add-btn"
                            >
                              <FaPlus /> Watchlist
                            </button>
                          )
                        ) : (
                          <button className="login-btn" disabled>
                            Log in to add
                          </button>
                        )}
                      </div>

                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default HomeDashboard;

