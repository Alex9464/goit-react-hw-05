import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import toast from 'react-hot-toast';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const searchResults = await searchMovies(query);
        setMovies(searchResults);
      } catch (error) {
        console.error('Error searching for movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      toast.error('Please enter a movie name to search!');
      return;
    }

    setSearchParams({ query });
  };

  return (
    <div className={styles.searchWrap}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setSearchParams({ query: e.target.value })}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;


