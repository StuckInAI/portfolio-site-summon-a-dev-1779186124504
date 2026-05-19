import { usePortfolio } from '@/context/PortfolioContext';
import { defaultProjects } from '@/lib/data';
import styles from './ProjectsPage.module.css';

const GRAD: Record<string, string> = {
  lumina: 'linear-gradient(135deg,#6366f1 0%,#8b5cf6 100%)',
  flowstate: 'linear-gradient(135deg,#ec4899 0%,#f97316 100%)',
  aurora: 'linear-gradient(135deg,#06b6d4 0%,#3b82f6 100%)',
};

export default function ProjectsPage() {
  let projects = defaultProjects;
  try {
    const ctx = usePortfolio();
    projects = ctx.projects;
  } catch { /* outside provider */ }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>All Projects</h1>
        <p className={styles.sub}>A collection of things I've built — from open-source tools to client products.</p>
      </div>
      <div className={styles.grid}>
        {projects.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.img} style={{ background: GRAD[p.image] ?? 'linear-gradient(135deg,#6366f1,#8b5cf6)' }}>
              <span className={styles.imgLabel}>{p.title[0]}</span>
            </div>
            <div className={styles.body}>
              <div className={styles.meta}>
                <span className={styles.category}>{p.category}</span>
                <span className={styles.year}>{p.year}</span>
              </div>
              <h2 className={styles.cardTitle}>{p.title}</h2>
              <p className={styles.cardDesc}>{p.description}</p>
              <div className={styles.tags}>
                {p.tags.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
              </div>
              <div className={styles.links}>
                {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className={styles.link}>Live ↗</a>}
                {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className={styles.link}>GitHub ↗</a>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
