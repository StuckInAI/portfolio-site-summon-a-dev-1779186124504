import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import styles from './AdminPage.module.css';
import type { Project, Skill, Experience } from '@/types';
import type { Testimonial, Profile } from '@/lib/data';

type Tab = 'profile' | 'projects' | 'skills' | 'experiences' | 'testimonials';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const ctx = usePortfolio();

  const tabs: { id: Tab; label: string }[] = [
    { id: 'profile', label: 'Profile' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'experiences', label: 'Experience' },
    { id: 'testimonials', label: 'Testimonials' },
  ];

  return (
    <div className={styles.page}>
      <h1 className={styles.heading}>Admin Panel</h1>
      <div className={styles.tabs}>
        {tabs.map((t) => (
          <button
            key={t.id}
            className={tab === t.id ? `${styles.tab} ${styles.activeTab}` : styles.tab}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className={styles.content}>
        {tab === 'profile' && <ProfileEditor profile={ctx.profile} onSave={ctx.setProfile} />}
        {tab === 'projects' && <ProjectsEditor projects={ctx.projects} onAdd={ctx.addProject} onUpdate={ctx.updateProject} onRemove={ctx.removeProject} />}
        {tab === 'skills' && <SkillsEditor skills={ctx.skills} onSave={ctx.setSkills} />}
        {tab === 'experiences' && <ExperiencesEditor experiences={ctx.experiences} onAdd={ctx.addExperience} onUpdate={ctx.updateExperience} onRemove={ctx.removeExperience} />}
        {tab === 'testimonials' && <TestimonialsEditor testimonials={ctx.testimonials} onAdd={ctx.addTestimonial} onUpdate={ctx.updateTestimonial} onRemove={ctx.removeTestimonial} />}
      </div>
    </div>
  );
}

// ── Profile Editor ────────────────────────────────────────────────────────────
function ProfileEditor({ profile, onSave }: { profile: Profile; onSave: (p: Profile) => Promise<void> }) {
  const [form, setForm] = useState<Profile>(profile);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof Profile) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSave = async () => {
    await onSave(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const fields: { key: keyof Profile; label: string; multi?: boolean }[] = [
    { key: 'name', label: 'Name' },
    { key: 'initials', label: 'Initials' },
    { key: 'title', label: 'Title' },
    { key: 'bio1', label: 'Bio paragraph 1', multi: true },
    { key: 'bio2', label: 'Bio paragraph 2', multi: true },
    { key: 'location', label: 'Location' },
    { key: 'timezone', label: 'Timezone' },
    { key: 'availability', label: 'Availability' },
    { key: 'email', label: 'Email' },
    { key: 'github', label: 'GitHub URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'twitter', label: 'Twitter URL' },
    { key: 'heroTagline', label: 'Hero Tagline' },
    { key: 'heroHeading', label: 'Hero Heading', multi: true },
    { key: 'heroSub', label: 'Hero Subtitle', multi: true },
    { key: 'statYears', label: 'Stat: Years' },
    { key: 'statProjects', label: 'Stat: Projects' },
    { key: 'statClients', label: 'Stat: Clients' },
  ];

  return (
    <div className={styles.editor}>
      <h2 className={styles.editorTitle}>Edit Profile</h2>
      {fields.map((f) => (
        <div key={f.key} className={styles.field}>
          <label className={styles.label}>{f.label}</label>
          {f.multi
            ? <textarea className={styles.textarea} rows={3} value={form[f.key]} onChange={set(f.key)} />
            : <input className={styles.input} value={form[f.key]} onChange={set(f.key)} />}
        </div>
      ))}
      <button className={styles.saveBtn} onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Profile'}</button>
    </div>
  );
}

// ── Projects Editor ───────────────────────────────────────────────────────────
function ProjectsEditor({
  projects, onAdd, onUpdate, onRemove
}: {
  projects: Project[];
  onAdd: (p: Project) => Promise<void>;
  onUpdate: (p: Project) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  const empty: Project = { id: '', title: '', description: '', longDescription: '', tags: [], category: 'web', image: '', featured: false, year: new Date().getFullYear() };
  const [form, setForm] = useState<Project>(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof Project) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const val = k === 'tags' ? e.target.value.split(',').map((s) => s.trim()) : k === 'featured' ? (e.target as HTMLInputElement).checked : k === 'year' ? Number(e.target.value) : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const startEdit = (p: Project) => { setForm(p); setEditing(p.id); };
  const cancelEdit = () => { setForm(empty); setEditing(null); };

  const handleSave = async () => {
    const data = { ...form, id: form.id || crypto.randomUUID() };
    if (editing) { await onUpdate(data); } else { await onAdd(data); }
    setForm(empty);
    setEditing(null);
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editorTitle}>Projects</h2>
      <div className={styles.list}>
        {projects.map((p) => (
          <div key={p.id} className={styles.listItem}>
            <span className={styles.listName}>{p.title}</span>
            <div className={styles.listActions}>
              <button className={styles.editBtn} onClick={() => startEdit(p)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => onRemove(p.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <h3 className={styles.subTitle}>{editing ? 'Edit Project' : 'Add Project'}</h3>
      <div className={styles.field}><label className={styles.label}>Title</label><input className={styles.input} value={form.title} onChange={set('title')} /></div>
      <div className={styles.field}><label className={styles.label}>Description</label><textarea className={styles.textarea} rows={2} value={form.description} onChange={set('description')} /></div>
      <div className={styles.field}><label className={styles.label}>Long Description</label><textarea className={styles.textarea} rows={3} value={form.longDescription} onChange={set('longDescription')} /></div>
      <div className={styles.field}><label className={styles.label}>Tags (comma-separated)</label><input className={styles.input} value={form.tags.join(', ')} onChange={set('tags')} /></div>
      <div className={styles.field}><label className={styles.label}>Category</label>
        <select className={styles.input} value={form.category} onChange={set('category')}>
          <option value="web">Web</option>
          <option value="mobile">Mobile</option>
          <option value="design">Design</option>
          <option value="oss">OSS</option>
        </select>
      </div>
      <div className={styles.field}><label className={styles.label}>Image key (e.g. lumina)</label><input className={styles.input} value={form.image} onChange={set('image')} /></div>
      <div className={styles.field}><label className={styles.label}>Live URL</label><input className={styles.input} value={form.liveUrl ?? ''} onChange={set('liveUrl')} /></div>
      <div className={styles.field}><label className={styles.label}>GitHub URL</label><input className={styles.input} value={form.githubUrl ?? ''} onChange={set('githubUrl')} /></div>
      <div className={styles.field}><label className={styles.label}>Year</label><input className={styles.input} type="number" value={form.year} onChange={set('year')} /></div>
      <div className={styles.field}><label className={styles.label}><input type="checkbox" checked={form.featured} onChange={set('featured')} /> Featured</label></div>
      <div className={styles.formActions}>
        <button className={styles.saveBtn} onClick={handleSave}>{editing ? 'Update' : 'Add Project'}</button>
        {editing && <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>}
      </div>
    </div>
  );
}

// ── Skills Editor ─────────────────────────────────────────────────────────────
function SkillsEditor({ skills, onSave }: { skills: Skill[]; onSave: (s: Skill[]) => Promise<void> }) {
  const [list, setList] = useState<Skill[]>(skills);
  const [saved, setSaved] = useState(false);

  const update = (i: number, k: keyof Skill) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const val = k === 'level' ? Number(e.target.value) : e.target.value;
    setList((prev) => prev.map((s, idx) => idx === i ? { ...s, [k]: val } : s));
  };

  const addSkill = () => setList((prev) => [...prev, { name: '', level: 80, category: 'frontend' }]);
  const removeSkill = (i: number) => setList((prev) => prev.filter((_, idx) => idx !== i));

  const handleSave = async () => {
    await onSave(list);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editorTitle}>Skills</h2>
      {list.map((s, i) => (
        <div key={i} className={styles.skillRow}>
          <input className={styles.input} placeholder="Name" value={s.name} onChange={update(i, 'name')} />
          <input className={styles.input} type="number" min={0} max={100} value={s.level} onChange={update(i, 'level')} style={{ width: 80 }} />
          <select className={styles.input} value={s.category} onChange={update(i, 'category')}>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
            <option value="tools">Tools</option>
            <option value="design">Design</option>
          </select>
          <button className={styles.deleteBtn} onClick={() => removeSkill(i)}>✕</button>
        </div>
      ))}
      <button className={styles.addBtn} onClick={addSkill}>+ Add Skill</button>
      <button className={styles.saveBtn} onClick={handleSave}>{saved ? 'Saved ✓' : 'Save Skills'}</button>
    </div>
  );
}

// ── Experiences Editor ────────────────────────────────────────────────────────
function ExperiencesEditor({
  experiences, onAdd, onUpdate, onRemove
}: {
  experiences: Experience[];
  onAdd: (e: Experience) => Promise<void>;
  onUpdate: (e: Experience) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  const empty: Experience = { id: '', company: '', role: '', period: '', description: [], tech: [] };
  const [form, setForm] = useState<Experience>(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof Experience) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = (k === 'description' || k === 'tech') ? e.target.value.split('\n').map(s => s.trim()).filter(Boolean) : e.target.value;
    setForm((f) => ({ ...f, [k]: val }));
  };

  const startEdit = (exp: Experience) => { setForm(exp); setEditing(exp.id); };
  const cancelEdit = () => { setForm(empty); setEditing(null); };

  const handleSave = async () => {
    const data = { ...form, id: form.id || crypto.randomUUID() };
    if (editing) { await onUpdate(data); } else { await onAdd(data); }
    setForm(empty);
    setEditing(null);
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editorTitle}>Experience</h2>
      <div className={styles.list}>
        {experiences.map((exp) => (
          <div key={exp.id} className={styles.listItem}>
            <span className={styles.listName}>{exp.role} @ {exp.company}</span>
            <div className={styles.listActions}>
              <button className={styles.editBtn} onClick={() => startEdit(exp)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => onRemove(exp.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <h3 className={styles.subTitle}>{editing ? 'Edit' : 'Add'} Experience</h3>
      <div className={styles.field}><label className={styles.label}>Company</label><input className={styles.input} value={form.company} onChange={set('company')} /></div>
      <div className={styles.field}><label className={styles.label}>Role</label><input className={styles.input} value={form.role} onChange={set('role')} /></div>
      <div className={styles.field}><label className={styles.label}>Period</label><input className={styles.input} value={form.period} onChange={set('period')} /></div>
      <div className={styles.field}><label className={styles.label}>Description (one per line)</label><textarea className={styles.textarea} rows={4} value={form.description.join('\n')} onChange={set('description')} /></div>
      <div className={styles.field}><label className={styles.label}>Tech (one per line)</label><textarea className={styles.textarea} rows={3} value={form.tech.join('\n')} onChange={set('tech')} /></div>
      <div className={styles.formActions}>
        <button className={styles.saveBtn} onClick={handleSave}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>}
      </div>
    </div>
  );
}

// ── Testimonials Editor ───────────────────────────────────────────────────────
function TestimonialsEditor({
  testimonials, onAdd, onUpdate, onRemove
}: {
  testimonials: Testimonial[];
  onAdd: (t: Testimonial) => Promise<void>;
  onUpdate: (t: Testimonial) => Promise<void>;
  onRemove: (id: string) => Promise<void>;
}) {
  const empty: Testimonial = { id: '', quote: '', name: '', role: '', company: '', initials: '', color: '#6366f1' };
  const [form, setForm] = useState<Testimonial>(empty);
  const [editing, setEditing] = useState<string | null>(null);

  const set = (k: keyof Testimonial) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const startEdit = (t: Testimonial) => { setForm(t); setEditing(t.id); };
  const cancelEdit = () => { setForm(empty); setEditing(null); };

  const handleSave = async () => {
    const data = { ...form, id: form.id || crypto.randomUUID() };
    if (editing) { await onUpdate(data); } else { await onAdd(data); }
    setForm(empty);
    setEditing(null);
  };

  return (
    <div className={styles.editor}>
      <h2 className={styles.editorTitle}>Testimonials</h2>
      <div className={styles.list}>
        {testimonials.map((t) => (
          <div key={t.id} className={styles.listItem}>
            <span className={styles.listName}>{t.name} — {t.company}</span>
            <div className={styles.listActions}>
              <button className={styles.editBtn} onClick={() => startEdit(t)}>Edit</button>
              <button className={styles.deleteBtn} onClick={() => onRemove(t.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <h3 className={styles.subTitle}>{editing ? 'Edit' : 'Add'} Testimonial</h3>
      <div className={styles.field}><label className={styles.label}>Quote</label><textarea className={styles.textarea} rows={3} value={form.quote} onChange={set('quote')} /></div>
      <div className={styles.field}><label className={styles.label}>Name</label><input className={styles.input} value={form.name} onChange={set('name')} /></div>
      <div className={styles.field}><label className={styles.label}>Role</label><input className={styles.input} value={form.role} onChange={set('role')} /></div>
      <div className={styles.field}><label className={styles.label}>Company</label><input className={styles.input} value={form.company} onChange={set('company')} /></div>
      <div className={styles.field}><label className={styles.label}>Initials</label><input className={styles.input} value={form.initials} onChange={set('initials')} /></div>
      <div className={styles.field}><label className={styles.label}>Color (hex)</label><input className={styles.input} value={form.color} onChange={set('color')} /></div>
      <div className={styles.formActions}>
        <button className={styles.saveBtn} onClick={handleSave}>{editing ? 'Update' : 'Add'}</button>
        {editing && <button className={styles.cancelBtn} onClick={cancelEdit}>Cancel</button>}
      </div>
    </div>
  );
}
