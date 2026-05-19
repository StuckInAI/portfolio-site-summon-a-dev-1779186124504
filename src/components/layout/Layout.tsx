import { Outlet, NavLink } from 'react-router-dom';
import styles from './Layout.module.css';

export default function Layout() {
  return (
    <div className={styles.root}>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <a href="/" className={styles.logo}>AR</a>
          <div className={styles.links}>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.active : styles.navLink}>Home</NavLink>
            <NavLink to="/projects" className={({ isActive }) => isActive ? styles.active : styles.navLink}>Projects</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : styles.navLink}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? styles.active : styles.navLink}>Contact</NavLink>
          </div>
          <a href="/admin" className={styles.adminBtn}>Admin</a>
        </nav>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} Portfolio. Built with React & Supabase.</p>
      </footer>
    </div>
  );
}
