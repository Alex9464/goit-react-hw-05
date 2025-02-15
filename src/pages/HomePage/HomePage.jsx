import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../../api/tmdb';
import MovieList from '../../components/MovieList/MovieList';
import styles from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getTrendingMovies = async () => {
      try {
        const trendingMovies = await fetchTrendingMovies();
        setMovies(trendingMovies);
        setLoading(false);
      } catch (error) {
        console.error('Error loading popular movies:', error);
        setLoading(false);
      }
    };

    getTrendingMovies();
  }, []);

  return (
    <div className={styles.titleWrap}>
      <h1 className={styles.mainTitle}>Popular Movies</h1>
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
