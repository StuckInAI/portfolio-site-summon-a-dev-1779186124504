import { useState } from 'react';
import SectionTitle from '@/components/ui/SectionTitle';
import { Mail, MapPin, Clock, Github, Linkedin, Twitter, Send, CheckCircle } from 'lucide-react';
import styles from './ContactPage.module.css';

type FormState = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const initForm: FormState = { name: '', email: '', subject: '', message: '' };

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1400);
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.titleWrap}>
          <SectionTitle
            label="Contact"
            title="Let's work together"
            subtitle="I'm open to freelance projects, full-time roles, and consulting. Reach out and let's chat."
            align="center"
          />
        </div>

        <div className={styles.grid}>
          {/* Info */}
          <div className={styles.info}>
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>Get in touch</h3>
              <div className={styles.infoItems}>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Mail size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Email</div>
                    <a href="mailto:alex@example.com" className={styles.infoValue}>alex@example.com</a>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><MapPin size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Location</div>
                    <span className={styles.infoValue}>San Francisco, CA</span>
                  </div>
                </div>
                <div className={styles.infoItem}>
                  <div className={styles.infoIcon}><Clock size={18} /></div>
                  <div>
                    <div className={styles.infoLabel}>Timezone</div>
                    <span className={styles.infoValue}>PST (UTC-8)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.socialCard}>
              <h4 className={styles.socialTitle}>Find me online</h4>
              <div className={styles.socials}>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialBtn}>
                  <Twitter size={18} />
                  <span>Twitter</span>
                </a>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className={styles.formWrap}>
            {submitted ? (
              <div className={styles.success}>
                <CheckCircle size={48} className={styles.successIcon} />
                <h3 className={styles.successTitle}>Message sent!</h3>
                <p className={styles.successSub}>
                  Thanks for reaching out. I'll get back to you within 1–2 business days.
                </p>
                <button
                  className={styles.resetBtn}
                  onClick={() => { setForm(initForm); setSubmitted(false); }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="name">Name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Jane Smith"
                      value={form.name}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="email">Email</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="jane@company.com"
                      value={form.email}
                      onChange={handleChange}
                      className={styles.input}
                    />
                  </div>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="subject">Subject</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={form.subject}
                    onChange={handleChange}
                    className={styles.select}
                  >
                    <option value="">Select a subject</option>
                    <option value="project">New project</option>
                    <option value="fulltime">Full-time opportunity</option>
                    <option value="consulting">Consulting</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label} htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell me about your project or how I can help..."
                    value={form.message}
                    onChange={handleChange}
                    className={styles.textarea}
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.submitBtn}
                >
                  {loading ? (
                    <span className={styles.spinner} />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? 'Sending...' : 'Send message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
