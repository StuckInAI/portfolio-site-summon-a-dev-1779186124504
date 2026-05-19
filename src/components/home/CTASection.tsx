import { Link } from 'react-router-dom';
import { ArrowRight, Mail } from 'lucide-react';
import styles from './CTASection.module.css';

export default function CTASection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <div className={styles.card}>
          <div className={styles.orb1} />
          <div className={styles.orb2} />
          <div className={styles.content}>
            <span className={styles.label}>Let's connect</span>
            <h2 className={styles.heading}>Have a project in mind?</h2>
            <p className={styles.sub}>
              I'm currently open to new opportunities. Whether you have a project to discuss
              or just want to say hi, my inbox is always open.
            </p>
            <div className={styles.actions}>
              <Link to="/contact" className={styles.primaryBtn}>
                <Mail size={16} />
                Get in touch
                <ArrowRight size={16} />
              </Link>
              <Link to="/projects" className={styles.secondaryBtn}>
                View my work
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
