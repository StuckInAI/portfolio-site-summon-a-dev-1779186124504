import SectionTitle from '@/components/ui/SectionTitle';
import { Quote } from 'lucide-react';
import styles from './TestimonialsSection.module.css';

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
};

const testimonials: Testimonial[] = [
  {
    quote: "Alex is one of the most talented engineers I've worked with. Their attention to detail and ability to translate complex requirements into elegant code is remarkable.",
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Vercel',
    initials: 'SC',
    color: '#6366f1',
  },
  {
    quote: "Working with Alex transformed our product. They delivered not just what we asked for, but something far better — and on time. The UX improvements alone doubled our conversion rate.",
    name: 'Marcus Williams',
    role: 'CEO',
    company: 'Luminary',
    initials: 'MW',
    color: '#f472b6',
  },
  {
    quote: "I've seen a lot of developers over the years, but Alex's combination of technical depth and design sensibility is genuinely rare. Would work with them again without hesitation.",
    name: 'Priya Patel',
    role: 'Product Lead',
    company: 'Shopify',
    initials: 'PP',
    color: '#34d399',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionTitle
          label="Kind words"
          title="What people say"
          align="center"
        />
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div key={t.name} className={styles.card}>
              <Quote size={28} className={styles.quoteIcon} />
              <p className={styles.quote}>{t.quote}</p>
              <div className={styles.author}>
                <div
                  className={styles.avatar}
                  style={{ background: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <div className={styles.name}>{t.name}</div>
                  <div className={styles.role}>{t.role} @ {t.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
