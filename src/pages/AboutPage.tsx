import { usePortfolio } from '@/context/PortfolioContext';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { skills, experiences, profile } = usePortfolio();
  const frontendSkills = skills.filter((s) => s.category === 'frontend');
  const otherSkills = skills.filter((s) => s.category !== 'frontend');

  return (
    <div className={styles.page}>
      <div className={styles.inner}>

        {/* Hero */}
        <div className={styles.hero}>
          <div className={styles.heroText}>
            <SectionTitle
              label="About me"
              title={`Hey, I'm ${profile.name} 👋`}
            />
            <p className={styles.bio}>{profile.bio1}</p>
            <p className={styles.bio}>{profile.bio2}</p>
            <div className={styles.heroMeta}>
              <span className={styles.metaItem}>
                <MapPin size={14} />
                {profile.location}
              </span>
              <span className={styles.metaItem}>
                <Calendar size={14} />
                {profile.availability}
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>{profile.initials}</span>
              </div>
              <div className={styles.avatarRing} />
              <div className={styles.avatarRing2} />
            </div>
          </div>
        </div>

        {/* Experience */}
        <div className={styles.section}>
          <SectionTitle label="Experience" title="Where I've worked" />
          <div className={styles.timeline}>
            {experiences.map((exp, i) => (
              <div key={exp.id} className={styles.timelineItem}>
                <div className={styles.timelineDot} data-first={i === 0 ? 'true' : 'false'} />
                <div className={styles.timelineCard}>
                  <div className={styles.expHeader}>
                    <div>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <div className={styles.expCompany}>
                        <span>{exp.company}</span>
                        <ExternalLink size={12} />
                      </div>
                    </div>
                    <span className={styles.expPeriod}>{exp.period}</span>
                  </div>
                  <ul className={styles.expList}>
                    {exp.description.map((desc, j) => (
                      <li key={j} className={styles.expListItem}>{desc}</li>
                    ))}
                  </ul>
                  <div className={styles.expTech}>
                    {exp.tech.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div className={styles.section}>
          <SectionTitle label="Skills" title="What I bring to the table" />
          <div className={styles.skillsGrid}>
            <div className={styles.skillGroup}>
              <h4 className={styles.skillGroupTitle}>Frontend</h4>
              <div className={styles.skillBadges}>
                {frontendSkills.map((s) => (
                  <div key={s.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{s.name}</span>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillBarFill}
                        style={{ '--w': `${s.level}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={styles.skillGroup}>
              <h4 className={styles.skillGroupTitle}>Backend, Tools & Design</h4>
              <div className={styles.skillBadges}>
                {otherSkills.map((s) => (
                  <div key={s.name} className={styles.skillItem}>
                    <span className={styles.skillName}>{s.name}</span>
                    <div className={styles.skillBar}>
                      <div
                        className={styles.skillBarFill}
                        style={{ '--w': `${s.level}%` } as React.CSSProperties}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
