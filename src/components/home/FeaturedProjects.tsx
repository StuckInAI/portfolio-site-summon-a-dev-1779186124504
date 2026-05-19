import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { projects } from '@/lib/data';
import { getProjectGradient, getProjectAccent } from '@/lib/utils';
import styles from './FeaturedProjects.module.css';

export default function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <SectionTitle
            label="Selected Work"
            title="Projects I'm proud of"
            subtitle="A handful of the things I've built — from design systems to full-stack products."
          />
          <Link to="/projects" className={styles.viewAll}>
            View all projects <ArrowRight size={14} />
          </Link>
        </div>

        <div className={styles.grid}>
          {featured.map((project, i) => (
            <div
              key={project.id}
              className={styles.card}
              style={{ '--accent': getProjectAccent(project.image) } as React.CSSProperties}
              data-large={i === 0 ? 'true' : 'false'}
            >
              <div
                className={styles.cardImage}
                style={{ background: getProjectGradient(project.image) }}
              >
                <div className={styles.cardImageOverlay} />
                <span className={styles.cardYear}>{project.year}</span>
                <div className={styles.cardLinks}>
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                      <ExternalLink size={16} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
                      <Github size={16} />
                    </a>
                  )}
                </div>
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{project.title}</h3>
                <p className={styles.cardDesc}>{project.description}</p>
                <div className={styles.cardTags}>
                  {project.tags.slice(0, 4).map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
