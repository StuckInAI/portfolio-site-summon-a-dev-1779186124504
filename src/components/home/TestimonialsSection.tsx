import { usePortfolio } from '@/context/PortfolioContext';
import { defaultTestimonials } from '@/lib/data';
import styles from './TestimonialsSection.module.css';

export default function TestimonialsSection() {
  let testimonials = defaultTestimonials;
  try {
    const ctx = usePortfolio();
    testimonials = ctx.testimonials;
  } catch { /* outside provider */ }

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>What People Say</h2>
      <div className={styles.grid}>
        {testimonials.map((t) => (
          <div key={t.id} className={styles.card}>
            <p className={styles.quote}>"{t.quote}"</p>
            <div className={styles.author}>
              <div className={styles.avatar} style={{ background: t.color }}>{t.initials}</div>
              <div>
                <div className={styles.name}>{t.name}</div>
                <div className={styles.role}>{t.role} · {t.company}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
