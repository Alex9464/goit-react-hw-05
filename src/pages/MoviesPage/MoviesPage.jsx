import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import MovieDetails from '../MovieDetailsPage/MovieDetailsPage';

function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('API_URL')
      .then(response => response.json())
      .then(data => setMovies(data.results));
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <MovieDetails movies={movies} /> {}
    </div>
  );
}

export default MoviesPage;
