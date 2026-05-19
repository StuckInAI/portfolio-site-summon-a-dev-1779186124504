import { usePortfolio } from '@/context/PortfolioContext';
import { defaultSkills } from '@/lib/data';
import styles from './SkillsSection.module.css';

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  design: 'Design',
};

export default function SkillsSection() {
  let skills = defaultSkills;
  try {
    const ctx = usePortfolio();
    skills = ctx.skills;
  } catch { /* outside provider */ }

  const categories = Array.from(new Set(skills.map((s) => s.category)));

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Skills & Expertise</h2>
      <div className={styles.grid}>
        {categories.map((cat) => (
          <div key={cat} className={styles.catCard}>
            <h3 className={styles.catTitle}>{CATEGORY_LABELS[cat] ?? cat}</h3>
            <div className={styles.bars}>
              {skills.filter((s) => s.category === cat).map((s) => (
                <div key={s.name} className={styles.barItem}>
                  <div className={styles.barHeader}>
                    <span className={styles.skillName}>{s.name}</span>
                    <span className={styles.skillLevel}>{s.level}%</span>
                  </div>
                  <div className={styles.track}>
                    <div className={styles.fill} style={{ width: `${s.level}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
