import { usePortfolio } from '@/context/PortfolioContext';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { profile, experiences, loading } = usePortfolio();

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.avatar}>{profile.initials}</div>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.title}>{profile.title}</p>
      </div>

      {loading ? (
        <div className={styles.loading}><div className={styles.spinner} /></div>
      ) : (
        <div className={styles.content}>
          <div className={styles.bio}>
            <h2 className={styles.sectionTitle}>About Me</h2>
            <p className={styles.bioText}>{profile.bio1}</p>
            <p className={styles.bioText}>{profile.bio2}</p>
            <div className={styles.details}>
              <div className={styles.detail}><span className={styles.detailLabel}>Location</span><span>{profile.location}</span></div>
              <div className={styles.detail}><span className={styles.detailLabel}>Timezone</span><span>{profile.timezone}</span></div>
              <div className={styles.detail}><span className={styles.detailLabel}>Availability</span><span className={styles.available}>{profile.availability}</span></div>
            </div>
            <div className={styles.socials}>
              <a href={`mailto:${profile.email}`} className={styles.socialLink}>Email</a>
              <a href={profile.github} target="_blank" rel="noreferrer" className={styles.socialLink}>GitHub</a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.socialLink}>LinkedIn</a>
              <a href={profile.twitter} target="_blank" rel="noreferrer" className={styles.socialLink}>Twitter</a>
            </div>
          </div>

          <div className={styles.experience}>
            <h2 className={styles.sectionTitle}>Experience</h2>
            <div className={styles.timeline}>
              {experiences.map((exp) => (
                <div key={exp.id} className={styles.expCard}>
                  <div className={styles.expHeader}>
                    <div>
                      <h3 className={styles.expRole}>{exp.role}</h3>
                      <p className={styles.expCompany}>{exp.company}</p>
                    </div>
                    <span className={styles.expPeriod}>{exp.period}</span>
                  </div>
                  <ul className={styles.expDesc}>
                    {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                  </ul>
                  <div className={styles.techTags}>
                    {exp.tech.map((t) => <span key={t} className={styles.techTag}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
