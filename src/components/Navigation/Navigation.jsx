import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import styles from './Navigation.module.css';

function Navigation() {
  const [showSearch, setShowSearch] = useState(false); // Состояние для отображения поиска
  const location = useLocation(); // Хук для получения текущего маршрута

  const handleMoviesClick = () => {
    setShowSearch(prev => !prev); // Показываем/скрываем поиск при клике на Movies
  };

  // Скрыть поиск при переходе на другие маршруты, если не на странице /movies
  useEffect(() => {
    if (location.pathname !== '/movies') {
      setShowSearch(false); // Скрываем поиск, если не на странице Movies
    }
  }, [location.pathname]); // Следим за изменением маршрута

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.activeLink}` : styles.link)}
          >
            Home
          </NavLink>
        </li>
        {!showSearch && (
          <li>
            <NavLink
              to="#"
              className={styles.movieLink}
              onClick={handleMoviesClick} // При клике на Movies показываем поиск
            >
              Movies
            </NavLink>
          </li>
        )}
      </ul>
      {showSearch && (
        <div className={styles.searchContainer}>
          <SearchBar /> {/* Показываем компонент поиска */}
        </div>
      )}
    </nav>
  );
}

export default Navigation;
