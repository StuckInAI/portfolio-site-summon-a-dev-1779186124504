import { experiences, skills } from '@/lib/data';
import SectionTitle from '@/components/ui/SectionTitle';
import Badge from '@/components/ui/Badge';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import styles from './AboutPage.module.css';

export default function AboutPage() {
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
              title="Hey, I'm Alex Rivera 👋"
            />
            <p className={styles.bio}>
              I'm a full-stack developer and designer based in San Francisco. For over 6 years
              I've been helping startups, scale-ups, and product teams ship delightful digital
              experiences. I care deeply about performance, accessibility, and the little details
              that make the difference between good and great.
            </p>
            <p className={styles.bio}>
              When I'm not building things on a screen, you'll find me trail running, obsessing
              over specialty coffee, or diving deep into typography rabbit holes. I believe the best
              products are built by people who love both the craft and the problem.
            </p>
            <div className={styles.heroMeta}>
              <span className={styles.metaItem}>
                <MapPin size={14} />
                San Francisco, CA
              </span>
              <span className={styles.metaItem}>
                <Calendar size={14} />
                Available from March 2025
              </span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.avatarWrap}>
              <div className={styles.avatar}>
                <span className={styles.avatarInitials}>AR</span>
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
