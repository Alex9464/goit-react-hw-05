import { useState, useEffect } from 'react';
import styles from './MovieCast.module.css';

function MovieCast({ movieId }) {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=fb7bb23f03b6994dafc674c074d01761`)
      .then(response => {
        if (!response.ok) throw new Error("Error loading cast");
        return response.json();
      })
      .then(data => {
        setCast(data.cast);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [movieId]);

  if (loading) return <div>Loading cast...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.cast}>
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.slice(0, 9).map(actor => (
          <li key={actor.id} className={styles.actor}>
            <img
              className={styles.actorImg}
              src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
              alt={actor.name}
            />
            <div className={styles.actorInfo}>
              <p className={styles.actorName}>{actor.name}</p>
              <p className={styles.actorCharacter}>{actor.character}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
