import axios from 'axios';

const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2NzZlMjMxY2IwMzc0OWFlYjU0M2NiN2RhN2UwMDRiOSIsIm5iZiI6MTczOTAwMDg2Ny45NSwic3ViIjoiNjdhNzBjMjNkY2Y3NWFmYmUyZjEwNzIxIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.JN9IweUDXTnBgyLkwjKZwd3vd0PBM-TlJ22j6KCEcSE';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchTrendingMovies = async () => {
  const url = `${BASE_URL}/trending/movie/day`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error while getting popular movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  const url = `${BASE_URL}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error while searching for movie:', error);
    throw error;
  }
};

export const fetchMovieDetails = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}`;
  const options = {
    headers: {
      Authorization: `Bearer ${API_KEY}`,
    },
  };

  try {
    const response = await axios.get(url, options);
    return response.data;
  } catch (error) {
    console.error('Error retrieving movie information:', error);
    throw error;
  }
};

export const fetchMovieCast = async (movieId) => {
    const url = `${BASE_URL}/movie/${movieId}/credits`;
    const options = {
      headers: {
        Authorization: `Bearer ${API_KEY}`,
      },
    };
  
    try {
      const response = await axios.get(url, options);
      return response.data.cast;
    } catch (error) {
      console.error('Error getting cast:', error);
      throw error;
    }
  };
  

export const fetchMovieReviews = async (movieId) => {
  const url = `${BASE_URL}/movie/${movieId}/reviews`;
  const options = { headers: { Authorization: `Bearer ${API_KEY}` } };

  try {
    const response = await axios.get(url, options);
    return response.data.results;
  } catch (error) {
    console.error('Error while getting reviews:', error);
    throw error;
  }
};
  
