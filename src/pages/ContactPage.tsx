import { usePortfolio } from '@/context/PortfolioContext';
import { defaultProfile } from '@/lib/data';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  let profile = defaultProfile;
  try {
    const ctx = usePortfolio();
    profile = ctx.profile;
  } catch { /* outside provider */ }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Get in Touch</h1>
        <p className={styles.sub}>Have a project in mind? I'd love to hear about it.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.info}>
          <h2 className={styles.infoTitle}>Contact Info</h2>
          <div className={styles.infoItems}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Email</span>
              <a href={`mailto:${profile.email}`} className={styles.infoValue}>{profile.email}</a>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Location</span>
              <span className={styles.infoValue}>{profile.location}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Timezone</span>
              <span className={styles.infoValue}>{profile.timezone}</span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Availability</span>
              <span className={styles.infoValue}>{profile.availability}</span>
            </div>
          </div>
          <div className={styles.socials}>
            <a href={profile.github} target="_blank" rel="noreferrer" className={styles.social}>GitHub ↗</a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className={styles.social}>LinkedIn ↗</a>
            <a href={profile.twitter} target="_blank" rel="noreferrer" className={styles.social}>Twitter ↗</a>
          </div>
        </div>

        <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
          <h2 className={styles.infoTitle}>Send a Message</h2>
          <div className={styles.field}>
            <label className={styles.label}>Name</label>
            <input className={styles.input} type="text" placeholder="Your name" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input className={styles.input} type="email" placeholder="you@example.com" />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Message</label>
            <textarea className={styles.textarea} rows={5} placeholder="Tell me about your project..." />
          </div>
          <button type="submit" className={styles.btn}>Send Message</button>
        </form>
      </div>
    </div>
  );
}
