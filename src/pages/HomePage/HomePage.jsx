import { useState, useEffect } from 'react';
import MovieList from '../../components/MovieList/MovieList';

function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=f4e6cb562855574dff73c7801d4cebbf');
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;

