import { usePortfolio } from '@/context/PortfolioContext';
import styles from './SkillsSection.module.css';

const CATEGORY_LABELS: Record<string, string> = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & DevOps',
  design: 'Design',
};

export default function SkillsSection() {
  const { skills } = usePortfolio();

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    const cat = skill.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Skills & Expertise</h2>
      <div className={styles.grid}>
        {Object.entries(grouped).map(([cat, items]) => (
          <div key={cat} className={styles.group}>
            <h3 className={styles.groupTitle}>{CATEGORY_LABELS[cat] ?? cat}</h3>
            <div className={styles.skills}>
              {items.map((skill) => (
                <div key={skill.name} className={styles.skill}>
                  <div className={styles.skillHeader}>
                    <span className={styles.skillName}>{skill.name}</span>
                    <span className={styles.skillLevel}>{skill.level}%</span>
                  </div>
                  <div className={styles.bar}>
                    <div className={styles.fill} style={{ width: `${skill.level}%` }} />
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
