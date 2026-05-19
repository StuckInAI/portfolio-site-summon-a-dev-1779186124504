import { usePortfolio } from '@/context/PortfolioContext';
import styles from './FeaturedProjects.module.css';

const GRAD: Record<string, string> = {
  lumina: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)',
  flowstate: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)',
  aurora: 'linear-gradient(135deg,#06b6d4 0%,#3b82f6 100%)',
};

export default function FeaturedProjects() {
  const { projects } = usePortfolio();
  const featured = projects.filter((p) => p.featured);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <h2 className={styles.title}>Featured Projects</h2>
        <a href="/projects" className={styles.seeAll}>See all projects →</a>
      </div>
      <div className={styles.grid}>
        {featured.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.img} style={{ background: GRAD[p.image] ?? 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className={styles.imgLabel}>{p.title[0]}</span>
            </div>
            <div className={styles.body}>
              <h3 className={styles.cardTitle}>{p.title}</h3>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.tags}>
                {p.tags.slice(0, 3).map((t) => (
                  <span key={t} className={styles.tag}>{t}</span>
                ))}
              </div>
              <div className={styles.links}>
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className={styles.link}>Live ↗</a>}
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className={styles.link}>GitHub ↗</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
