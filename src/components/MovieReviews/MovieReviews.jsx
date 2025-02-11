import { useState, useEffect } from "react";
import styles from "./MovieReviews.module.css";

function MovieReviews({ movieId }) {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=fb7bb23f03b6994dafc674c074d01761`)
      .then(response => {
        if (!response.ok) throw new Error("Error loading reviews");
        return response.json();
      })
      .then(data => {
        setReviews(data.results);
      })
      .catch(err => setError(err.message));
  }, [movieId]);

  if (error) return <div className={styles.error}>Error: {error}</div>;
  if (reviews.length === 0) return <div className={styles.noReviews}>No reviews available</div>;

  return (
    <div className={styles.reviewsContainer}>
      <h2>Reviews</h2>
      <ul className={styles.reviewList}>
        {reviews.slice(0, 5).map(review => (
          <li key={review.id} className={styles.review}>
            <h3>{review.author}</h3>
            <p>{review.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieReviews;
