import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import styles from './ContactPage.module.css';

export default function ContactPage() {
  const { profile } = usePortfolio();
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <h1 className={styles.heading}>Get in Touch</h1>
        <p className={styles.sub}>Have a project in mind? I'd love to hear about it.</p>
      </div>
      <div className={styles.layout}>
        <div className={styles.info}>
          <h2 className={styles.infoTitle}>Let's talk</h2>
          <p className={styles.infoText}>I'm currently available for freelance work and full-time opportunities. Reach out and I'll get back to you within 24 hours.</p>
          <div className={styles.contacts}>
            <a href={`mailto:${profile.email}`} className={styles.contactItem}>
              <span className={styles.contactIcon}>✉</span>
              <span>{profile.email}</span>
            </a>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>📍</span>
              <span>{profile.location}</span>
            </div>
            <div className={styles.contactItem}>
              <span className={styles.contactIcon}>🕐</span>
              <span>{profile.timezone}</span>
            </div>
          </div>
        </div>
        <div className={styles.formWrap}>
          {sent ? (
            <div className={styles.success}>
              <div className={styles.successIcon}>✓</div>
              <h3>Message sent!</h3>
              <p>Thanks for reaching out. I'll be in touch soon.</p>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit}>
              <div className={styles.field}>
                <label className={styles.label}>Name</label>
                <input className={styles.input} name="name" value={form.name} onChange={handleChange} required placeholder="Your name" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Email</label>
                <input className={styles.input} name="email" type="email" value={form.email} onChange={handleChange} required placeholder="you@example.com" />
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Message</label>
                <textarea className={styles.textarea} name="message" value={form.message} onChange={handleChange} required rows={5} placeholder="Tell me about your project..." />
              </div>
              <button type="submit" className={styles.submit}>Send Message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
