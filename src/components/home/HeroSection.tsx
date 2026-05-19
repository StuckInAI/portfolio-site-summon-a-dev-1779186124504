import { ArrowRight, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '@/context/PortfolioContext';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const { profile } = usePortfolio();

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
          {profile.heroTagline}
        </div>
        <h1 className={styles.heading}>
          <span className={styles.gradient}>{profile.heroHeading}</span>
        </h1>
        <p className={styles.sub}>{profile.heroSub}</p>
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
            <span className={styles.statNum}>{profile.statYears}</span>
            <span className={styles.statLabel}>Years exp.</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{profile.statProjects}</span>
            <span className={styles.statLabel}>Projects shipped</span>
          </div>
          <div className={styles.statDivider} />
          <div className={styles.stat}>
            <span className={styles.statNum}>{profile.statClients}</span>
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
