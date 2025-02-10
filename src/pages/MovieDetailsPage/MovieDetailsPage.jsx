import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import MovieCast from '../../components/MovieCast/MovieCast';
import styles from './MovieDetailsPage.module.css';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showCast, setShowCast] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=fb7bb23f03b6994dafc674c074d01761`)
      .then(response => {
        if (!response.ok) throw new Error("Movie loading error");
        return response.json();
      })
      .then(data => {
        setMovie(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!movie) return <div>Not found</div>;

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <span>⬅ back</span>
          <i className={styles.dec}></i>
        </button>
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <p className={styles.info}><span className={styles.rating}>Rating:</span> {movie.vote_average.toFixed(1)}</p>
        <p className={styles.info}><span className={styles.release}>Release:</span> {movie.release_date}</p>
        <button 
          className={styles.castBtn} 
          onClick={() => setShowCast(prev => !prev)}
        >
          {showCast ? "Hide Cast" : "Show Cast"}
        </button>
      </div>

      <div className={styles.castWrap}>
        <img className={styles.poster} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title} />
        {showCast && <MovieCast movieId={movieId} />}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
