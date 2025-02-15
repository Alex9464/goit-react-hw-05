import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../api/tmdb';
import styles from './MovieCast.module.css';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCast = async () => {
      try {
        const data = await fetchMovieCast(movieId);
        setCast(data);
      } catch (err) {
        setError('Failed to load actors', err);
      }
    };

    getCast();
  }, [movieId]);

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.castContainer}>
      {cast.length > 0 ? (
        <ul className={styles.castList}>
          {cast.map((actor) => (
            <li key={actor.id} className={styles.castItem}>
              <img
                src={
                  actor.profile_path
                    ? `https://image.tmdb.org/t/p/w200${actor.profile_path}`
                    : 'https://via.placeholder.com/50x50?text=No+Image'
                }
                alt={actor.name}
                className={styles.actorImage}
              />
              <div className={styles.actorInfo}>
                <p className={styles.actorName}>{actor.name}</p>
                <p className={styles.actorRole}>{actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noCast}>No information about actors</p>
      )}
    </div>
  );
};

export default MovieCast;


