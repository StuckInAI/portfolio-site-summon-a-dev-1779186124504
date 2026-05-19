import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X, Code2, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import styles from './Navbar.module.css';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Projects', path: '/projects' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header className={cn(styles.navbar, scrolled && styles.scrolled)}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          <Code2 size={22} />
          <span>Alex Rivera</span>
        </Link>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => cn(styles.navLink, isActive && styles.active)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/admin" className={cn(styles.navLink, styles.adminLink)} title="Admin">
            <Settings size={15} />
          </Link>
        </nav>

        <button className={styles.menuBtn} onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className={styles.mobileMenu}>
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) => cn(styles.mobileLink, isActive && styles.active)}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link to="/admin" className={styles.mobileLink} onClick={() => setOpen(false)}>
            <Settings size={15} /> Admin
          </Link>
        </div>
      )}
    </header>
  );
}
