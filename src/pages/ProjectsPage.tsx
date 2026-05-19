import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { usePortfolio } from '@/context/PortfolioContext';
import { getProjectGradient, getProjectAccent } from '@/lib/utils';
import { ExternalLink, Github } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Project } from '@/types';
import styles from './ProjectsPage.module.css';

type Filter = 'all' | Project['category'];

const filters: { label: string; value: Filter }[] = [
  { label: 'All', value: 'all' },
  { label: 'Web', value: 'web' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Design', value: 'design' },
  { label: 'Open Source', value: 'oss' },
];

export default function ProjectsPage() {
  const { projects } = usePortfolio();
  const [active, setActive] = useState<Filter>('all');
  const filtered = active === 'all' ? projects : projects.filter((p) => p.category === active);

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <SectionTitle
            label="Portfolio"
            title="All projects"
            subtitle="Everything I've shipped — web apps, mobile apps, design systems, and open-source."
            align="center"
          />
        </div>

        <div className={styles.filters}>
          {filters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActive(f.value)}
              className={cn(styles.filterBtn, active === f.value && styles.filterActive)}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filtered.map((project) => (
            <div
              key={project.id}
              className={styles.card}
              style={{ '--accent': getProjectAccent(project.image) } as React.CSSProperties}
            >
              <div
                className={styles.cardImage}
                style={{ background: getProjectGradient(project.image) }}
              >
                <div className={styles.cardOverlay} />
                <div className={styles.cardTopRow}>
                  <span className={styles.cardYear}>{project.year}</span>
                  <div className={styles.cardLinks}>
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                        <ExternalLink size={15} />
                      </a>
                    )}
                    {project.githubUrl && (
                      <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                        <Github size={15} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardMeta}>
                  <Badge variant="primary">{project.category === 'oss' ? 'Open Source' : project.category.charAt(0).toUpperCase() + project.category.slice(1)}</Badge>
                </div>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
