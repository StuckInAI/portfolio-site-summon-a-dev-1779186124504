import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.title}>Let's build something great together</h2>
        <p className={styles.sub}>I'm available for freelance projects, full-time roles, and interesting collaborations.</p>
        <div className={styles.ctas}>
          <a href="/contact" className={styles.btnPrimary}>Start a Conversation</a>
          <a href="/projects" className={styles.btnSecondary}>View My Work</a>
        </div>
      </div>
    </section>
  );
}
