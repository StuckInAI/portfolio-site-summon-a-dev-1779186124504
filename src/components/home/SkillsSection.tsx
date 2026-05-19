import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { skills } from '@/lib/data';
import { cn } from '@/lib/utils';
import styles from './SkillsSection.module.css';
import type { Skill } from '@/types';

type Category = 'all' | Skill['category'];

const categories: { label: string; value: Category }[] = [
  { label: 'All', value: 'all' },
  { label: 'Frontend', value: 'frontend' },
  { label: 'Backend', value: 'backend' },
  { label: 'Tools', value: 'tools' },
  { label: 'Design', value: 'design' },
];

export default function SkillsSection() {
  const [active, setActive] = useState<Category>('all');

  const filtered = active === 'all' ? skills : skills.filter((s) => s.category === active);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle
          label="Skills"
          title="Tools of the trade"
          subtitle="Technologies I work with daily and the proficiency I've built over the years."
          align="center"
        />

        <div className={styles.filters}>
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={cn(styles.filterBtn, active === cat.value && styles.filterActive)}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((skill) => (
            <div key={skill.name} className={styles.skillCard}>
              <div className={styles.skillHeader}>
                <span className={styles.skillName}>{skill.name}</span>
                <span className={styles.skillLevel}>{skill.level}%</span>
              </div>
              <div className={styles.bar}>
                <div
                  className={styles.barFill}
                  style={{ '--w': `${skill.level}%` } as React.CSSProperties}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
