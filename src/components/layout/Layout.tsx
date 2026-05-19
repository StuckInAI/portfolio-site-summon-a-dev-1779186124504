import { Outlet, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <NavLink to="/" className={styles.logo} end>AR</NavLink>
          <div className={styles.links}>
            <NavLink to="/" end className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Home</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Projects</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}>Contact</NavLink>
          </div>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} — Built with React &amp; Supabase</p>
      </footer>
    </div>
  );
}
