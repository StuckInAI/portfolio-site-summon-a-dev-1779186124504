import { usePortfolio } from '@/context/PortfolioContext';
import { defaultProfile } from '@/lib/data';
import styles from './CTASection.module.css';

export default function CTASection() {
  let profile = defaultProfile;
  try {
    const ctx = usePortfolio();
    profile = ctx.profile;
  } catch { /* outside provider */ }

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Let's build something great together</h2>
        <p className={styles.sub}>I'm {profile.availability.toLowerCase()}. If you have a project in mind, I'd love to hear about it.</p>
        <a href="/contact" className={styles.btn}>Start a Conversation</a>
      </div>
    </section>
  );
}
