import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css';

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.activeLink}` : styles.link)}
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/movies"
            className={({ isActive }) => (isActive ? `${styles.link} ${styles.activeLink}` : styles.link)}
          >
            Movies
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;

