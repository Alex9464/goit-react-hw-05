import { useState, useEffect } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar'; // Компонент поиска

function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]); // Состояние для фильтрации

  // Функция для поиска фильмов
  const handleSearch = (query) => {
    if (!query) return;
    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMovies(filtered);
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?api_key=YOUR_API_KEY');
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }
        const data = await response.json();
        setMovies(data.results);
        setFilteredMovies(data.results); // Изначально показываем все фильмы
      } catch (error) {
        console.error('Ошибка загрузки фильмов:', error);
      }
    }

    fetchMovies();
  }, []);

  return (
    <div>
      <h1>Movies</h1>
      <SearchBar onSearch={handleSearch} /> {/* Передаем handleSearch как onSearch */}
      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>
            <p>{movie.title}</p> {/* Временно вместо MovieCard */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoviesPage;
