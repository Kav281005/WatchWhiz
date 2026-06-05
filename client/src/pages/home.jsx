import React, { useEffect, useState } from "react";
import { fetchMovies } from "../api/fetchMovies";
import { Link } from 'react-router-dom';
import './home.css';


const Home = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies().then((data) => {
      console.log("Movies:", data); // 👀 Debug log
      setMovies(data);
    });
  }, []);


return (

    <div className="home-container">
      <h1 className="home-heading">Must Watches</h1>

      {movies.length === 0 ? (
        <p className="no-movies-text">No movies found</p>
      ) : (
        <div className="overflow-y-auto max-h-screen">
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
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      )}
    </div>
  );
};

export default Home;

