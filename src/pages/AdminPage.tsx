import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import styles from './AdminPage.module.css';
import type { Project, Skill, Experience } from '@/types';
import type { Profile, Testimonial } from '@/lib/data';

type Tab = 'profile' | 'projects' | 'skills' | 'experience' | 'testimonials';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const {
    profile, setProfile,
    projects, addProject, updateProject, removeProject,
    skills, setSkills,
    experiences, addExperience, removeExperience,
    testimonials, addTestimonial, removeTestimonial,
    loading,
  } = usePortfolio();

  const [profileDraft, setProfileDraft] = useState<Profile>(profile);
  const [saved, setSaved] = useState(false);

  async function saveProfile() {
    await setProfile(profileDraft);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const tabs: Tab[] = ['profile', 'projects', 'skills', 'experience', 'testimonials'];

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Admin Panel</h1>
        <p className={styles.sub}>Manage your portfolio content</p>
      </div>

      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t}
            className={tab === t ? styles.tabActive : styles.tab}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {loading && <div className={styles.loadingBar} />}

      <div className={styles.content}>
        {tab === 'profile' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Profile</h2>
            <div className={styles.fieldGrid}>
              {(Object.keys(profileDraft) as (keyof Profile)[]).map((key) => (
                <div key={key} className={styles.field}>
                  <label className={styles.label}>{key}</label>
                  <input
                    className={styles.input}
                    value={String(profileDraft[key])}
                    onChange={(e) => setProfileDraft((d) => ({ ...d, [key]: e.target.value }))}
                  />
                </div>
              ))}
            </div>
            <button className={styles.saveBtn} onClick={saveProfile}>
              {saved ? '✓ Saved!' : 'Save Profile'}
            </button>
          </div>
        )}

        {tab === 'projects' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Projects ({projects.length})</h2>
            <div className={styles.list}>
              {projects.map((p) => (
                <div key={p.id} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <strong>{p.title}</strong>
                    <span className={styles.listMeta}>{p.year} · {p.category}</span>
                  </div>
                  <div className={styles.listActions}>
                    <button className={styles.dangerBtn} onClick={() => removeProject(p.id)}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <AddProjectForm onAdd={addProject} />
          </div>
        )}

        {tab === 'skills' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Skills ({skills.length})</h2>
            <div className={styles.list}>
              {skills.map((s, i) => (
                <div key={s.name} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <strong>{s.name}</strong>
                    <span className={styles.listMeta}>{s.category} · {s.level}%</span>
                  </div>
                  <div className={styles.listActions}>
                    <button className={styles.dangerBtn} onClick={() => setSkills(skills.filter((_, j) => j !== i))}>Remove</button>
                  </div>
                </div>
              ))}
            </div>
            <AddSkillForm onAdd={(s) => setSkills([...skills, s])} />
          </div>
        )}

        {tab === 'experience' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Experience ({experiences.length})</h2>
            <div className={styles.list}>
              {experiences.map((e) => (
                <div key={e.id} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <strong>{e.role}</strong>
                    <span className={styles.listMeta}>{e.company} · {e.period}</span>
                  </div>
                  <button className={styles.dangerBtn} onClick={() => removeExperience(e.id)}>Remove</button>
                </div>
              ))}
            </div>
            <AddExperienceForm onAdd={addExperience} />
          </div>
        )}

        {tab === 'testimonials' && (
          <div className={styles.section}>
            <h2 className={styles.sectionTitle}>Testimonials ({testimonials.length})</h2>
            <div className={styles.list}>
              {testimonials.map((t) => (
                <div key={t.id} className={styles.listItem}>
                  <div className={styles.listItemInfo}>
                    <strong>{t.name}</strong>
                    <span className={styles.listMeta}>{t.role}, {t.company}</span>
                  </div>
                  <button className={styles.dangerBtn} onClick={() => removeTestimonial(t.id)}>Remove</button>
                </div>
              ))}
            </div>
            <AddTestimonialForm onAdd={addTestimonial} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sub-forms ────────────────────────────────────────────────────────────────

function AddProjectForm({ onAdd }: { onAdd: (p: Project) => void }) {
  const [v, setV] = useState({ title: '', description: '', category: 'web', tags: '', year: String(new Date().getFullYear()), liveUrl: '', githubUrl: '' });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      id: crypto.randomUUID(),
      title: v.title,
      description: v.description,
      longDescription: v.description,
      tags: v.tags.split(',').map((t) => t.trim()).filter(Boolean),
      category: v.category as Project['category'],
      image: v.title.toLowerCase().replace(/\s+/g, '-'),
      liveUrl: v.liveUrl || undefined,
      githubUrl: v.githubUrl || undefined,
      featured: false,
      year: Number(v.year),
    });
    setV({ title: '', description: '', category: 'web', tags: '', year: String(new Date().getFullYear()), liveUrl: '', githubUrl: '' });
  }
  return (
    <form className={styles.addForm} onSubmit={submit}>
      <h3 className={styles.addTitle}>Add Project</h3>
      <div className={styles.fieldGrid}>
        {(['title','description','tags','year','liveUrl','githubUrl'] as const).map((k) => (
          <div key={k} className={styles.field}>
            <label className={styles.label}>{k}</label>
            <input className={styles.input} value={v[k as keyof typeof v]} onChange={(e) => setV((x) => ({ ...x, [k]: e.target.value }))} />
          </div>
        ))}
        <div className={styles.field}>
          <label className={styles.label}>category</label>
          <select className={styles.input} value={v.category} onChange={(e) => setV((x) => ({ ...x, category: e.target.value }))}>
            {['web','mobile','design','oss'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <button className={styles.saveBtn} type="submit">Add Project</button>
    </form>
  );
}

function AddSkillForm({ onAdd }: { onAdd: (s: Skill) => void }) {
  const [v, setV] = useState({ name: '', level: '80', category: 'frontend' });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({ name: v.name, level: Number(v.level), category: v.category as Skill['category'] });
    setV({ name: '', level: '80', category: 'frontend' });
  }
  return (
    <form className={styles.addForm} onSubmit={submit}>
      <h3 className={styles.addTitle}>Add Skill</h3>
      <div className={styles.fieldGrid}>
        <div className={styles.field}>
          <label className={styles.label}>name</label>
          <input className={styles.input} value={v.name} onChange={(e) => setV((x) => ({ ...x, name: e.target.value }))} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>level (0-100)</label>
          <input className={styles.input} type="number" min={0} max={100} value={v.level} onChange={(e) => setV((x) => ({ ...x, level: e.target.value }))} />
        </div>
        <div className={styles.field}>
          <label className={styles.label}>category</label>
          <select className={styles.input} value={v.category} onChange={(e) => setV((x) => ({ ...x, category: e.target.value }))}>
            {['frontend','backend','tools','design'].map((c) => <option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <button className={styles.saveBtn} type="submit">Add Skill</button>
    </form>
  );
}

function AddExperienceForm({ onAdd }: { onAdd: (e: Experience) => void }) {
  const [v, setV] = useState({ company: '', role: '', period: '', description: '', tech: '' });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    onAdd({
      id: crypto.randomUUID(),
      company: v.company,
      role: v.role,
      period: v.period,
      description: v.description.split('\n').filter(Boolean),
      tech: v.tech.split(',').map((t) => t.trim()).filter(Boolean),
    });
    setV({ company: '', role: '', period: '', description: '', tech: '' });
  }
  return (
    <form className={styles.addForm} onSubmit={submit}>
      <h3 className={styles.addTitle}>Add Experience</h3>
      <div className={styles.fieldGrid}>
        {(['company','role','period','tech'] as const).map((k) => (
          <div key={k} className={styles.field}>
            <label className={styles.label}>{k}</label>
            <input className={styles.input} value={v[k]} onChange={(e) => setV((x) => ({ ...x, [k]: e.target.value }))} />
          </div>
        ))}
        <div className={styles.field}>
          <label className={styles.label}>description (one per line)</label>
          <textarea className={styles.input} rows={3} value={v.description} onChange={(e) => setV((x) => ({ ...x, description: e.target.value }))} />
        </div>
      </div>
      <button className={styles.saveBtn} type="submit">Add Experience</button>
    </form>
  );
}

function AddTestimonialForm({ onAdd }: { onAdd: (t: Testimonial) => void }) {
  const [v, setV] = useState({ name: '', role: '', company: '', quote: '', color: '#6366f1' });
  function submit(e: React.FormEvent) {
    e.preventDefault();
    const initials = v.name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2);
    onAdd({ id: crypto.randomUUID(), ...v, initials });
    setV({ name: '', role: '', company: '', quote: '', color: '#6366f1' });
  }
  return (
    <form className={styles.addForm} onSubmit={submit}>
      <h3 className={styles.addTitle}>Add Testimonial</h3>
      <div className={styles.fieldGrid}>
        {(['name','role','company','quote','color'] as const).map((k) => (
          <div key={k} className={styles.field}>
            <label className={styles.label}>{k}</label>
            <input className={styles.input} value={v[k]} onChange={(e) => setV((x) => ({ ...x, [k]: e.target.value }))} />
          </div>
        ))}
      </div>
      <button className={styles.saveBtn} type="submit">Add Testimonial</button>
    </form>
  );
}
