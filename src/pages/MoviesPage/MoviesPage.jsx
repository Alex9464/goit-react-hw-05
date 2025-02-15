import { useState } from 'react';
import { searchMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import toast from 'react-hot-toast';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast.error('Please enter a movie name to search!');
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchMovies(query);
      setMovies(searchResults);
      setLoading(false);
    } catch (error) {
      console.error('Error searching for movies:', error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.searchWrap}>
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
