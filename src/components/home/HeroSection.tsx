import { usePortfolio } from '@/context/PortfolioContext';
import { defaultProfile } from '@/lib/data';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  let profile = defaultProfile;
  try {
    const ctx = usePortfolio();
    profile = ctx.profile;
  } catch {
    // outside provider — use default
  }

  return (
    <section className={styles.hero}>
      <div className={styles.badge}>
        <span className={styles.dot} />
        {profile.heroTagline}
      </div>
      <h1 className={styles.heading}>{profile.heroHeading}</h1>
      <p className={styles.sub}>{profile.heroSub}</p>
      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statNum}>{profile.statYears}</span>
          <span className={styles.statLabel}>Years Experience</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>{profile.statProjects}</span>
          <span className={styles.statLabel}>Projects Shipped</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.stat}>
          <span className={styles.statNum}>{profile.statClients}</span>
          <span className={styles.statLabel}>Happy Clients</span>
        </div>
      </div>
      <div className={styles.ctas}>
        <a href="/projects" className={styles.btnPrimary}>View My Work</a>
        <a href="/contact" className={styles.btnSecondary}>Get in Touch</a>
      </div>
    </section>
  );
}
