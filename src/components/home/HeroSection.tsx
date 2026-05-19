import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.bg}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.grid} />
      </div>
      <div className={styles.inner}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          Available for work
        </div>
        <h1 className={styles.heading}>
          I craft digital
          <br />
          <span className={styles.gradient}>experiences</span>
          <br />
          that matter
        </h1>
        <p className={styles.sub}>
          Full-stack developer & designer specialising in React, TypeScript, and beautiful
          interfaces. I turn complex problems into elegant, performant solutions.
        </p>
        <div className={styles.actions}>
          <Link to="/projects" className={styles.primaryBtn}>
            View my work
            <ArrowRight size={16} />
          </Link>
          <a href="#" className={styles.secondaryBtn}>
            <Download size={16} />
            Resume
          </a>
        </div>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.statNum}>6+</span>
            <span className={styles.statLabel}>Years exp.</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>40+</span>
            <span className={styles.statLabel}>Projects shipped</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>15+</span>
            <span className={styles.statLabel}>Happy clients</span>
          </div>
        </div>
      </div>
      <div className={styles.scrollIndicator}>
        <div className={styles.scrollLine} />
        <span>Scroll</span>
      </div>
    </section>
  );
}
