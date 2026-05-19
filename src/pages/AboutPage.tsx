import { usePortfolio } from '@/context/PortfolioContext';
import { defaultProfile, defaultExperiences } from '@/lib/data';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  let profile = defaultProfile;
  let experiences = defaultExperiences;
  try {
    const ctx = usePortfolio();
    profile = ctx.profile;
    experiences = ctx.experiences;
  } catch { /* outside provider */ }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.avatar}>{profile.initials}</div>
        <h1 className={styles.name}>{profile.name}</h1>
        <p className={styles.title}>{profile.title}</p>
      </div>

      <div className={styles.content}>
        <section className={styles.bio}>
          <p>{profile.bio1}</p>
          <p>{profile.bio2}</p>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <div className={styles.timeline}>
            {experiences.map((exp) => (
              <div key={exp.id} className={styles.expCard}>
                <div className={styles.expHeader}>
                  <div>
                    <h3 className={styles.expRole}>{exp.role}</h3>
                    <div className={styles.expCompany}>{exp.company}</div>
                  </div>
                  <span className={styles.expPeriod}>{exp.period}</span>
                </div>
                <ul className={styles.expDesc}>
                  {exp.description.map((d, i) => <li key={i}>{d}</li>)}
                </ul>
                <div className={styles.tags}>
                  {exp.tech.map((t) => <span key={t} className={styles.tag}>{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className={styles.sectionTitle}>Details</h2>
          <div className={styles.details}>
            <div className={styles.detail}><span>📍</span> {profile.location}</div>
            <div className={styles.detail}><span>🕐</span> {profile.timezone}</div>
            <div className={styles.detail}><span>✅</span> {profile.availability}</div>
            <div className={styles.detail}><span>📧</span> {profile.email}</div>
          </div>
        </section>
      </div>
    </div>
  );
}
