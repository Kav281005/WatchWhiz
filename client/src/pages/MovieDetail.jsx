import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Watchlist.css'; // Reuse container and button styles

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, refreshUser } = useAuth();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/movies/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data.error) setError(data.error);
        else {
          setMovie(data);
        }
      })
      .catch(() => setError('Failed to load movie details'))
      .finally(() => setLoading(false));
  }, [id, user]);

  if (loading) return <div className="watchlist-container"><h2>Loading...</h2></div>;
  if (error) return <div className="watchlist-container"><h2 style={{color: '#ef4444'}}>{error}</h2></div>;
  if (!movie) return null;

  return (
    <div className="watchlist-container">
      <button onClick={() => navigate(-1)} className="back-button" style={{ marginBottom: '2rem' }}>
        ← Go Back
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        <div>
          <img 
            src={movie.Poster !== "N/A" ? movie.Poster : "/fallback.jpg"} 
            alt={movie.Title} 
            style={{ width: '100%', borderRadius: '1rem', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5)' }} 
          />
        </div>
        
        <div style={{ color: 'white' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: '800', marginBottom: '1rem', background: 'linear-gradient(to right, #60a5fa, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            {movie.Title}
          </h1>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <span style={{ backgroundColor: '#334155', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>{movie.Year}</span>
            <span style={{ backgroundColor: '#334155', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>{movie.Rated}</span>
            <span style={{ backgroundColor: '#334155', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.875rem' }}>{movie.Runtime}</span>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Genre</h3>
            <p style={{ fontSize: '1.125rem' }}>{movie.Genre}</p>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Plot</h3>
            <p style={{ fontSize: '1.125rem', lineHeight: '1.6', color: '#cbd5e1' }}>{movie.Plot}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Director</h3>
              <p>{movie.Director}</p>
            </div>
            <div>
              <h3 style={{ color: '#94a3b8', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>Actors</h3>
              <p>{movie.Actors}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
