import { useState } from 'react';
import { usePortfolio } from '@/context/PortfolioContext';
import type { Profile, Testimonial } from '@/context/PortfolioContext';
import type { Project, Skill, Experience } from '@/types';
import { Plus, Trash2, Save, ChevronDown, ChevronUp, Loader2 } from 'lucide-react';
import styles from './AdminPage.module.css';

type Tab = 'profile' | 'projects' | 'skills' | 'experiences' | 'testimonials';

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('profile');
  const ctx = usePortfolio();

  if (ctx.loading) {
    return (
      <div className={styles.loadingWrap}>
        <Loader2 size={32} className={styles.loadingSpinner} />
        <p>Loading data from Supabase...</p>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <div className={styles.header}>
          <h1 className={styles.title}>Portfolio Admin</h1>
          <p className={styles.subtitle}>Changes are saved directly to Supabase and reflect instantly across your portfolio.</p>
        </div>

        <div className={styles.tabs}>
          {(['profile', 'projects', 'skills', 'experiences', 'testimonials'] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`${styles.tabBtn} ${tab === t ? styles.tabActive : ''}`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>

        <div className={styles.content}>
          {tab === 'profile' && <ProfileEditor profile={ctx.profile} setProfile={ctx.setProfile} />}
          {tab === 'projects' && <ProjectsEditor projects={ctx.projects} setProjects={ctx.setProjects} addProject={ctx.addProject} updateProject={ctx.updateProject} removeProject={ctx.removeProject} />}
          {tab === 'skills' && <SkillsEditor skills={ctx.skills} setSkills={ctx.setSkills} />}
          {tab === 'experiences' && <ExperiencesEditor experiences={ctx.experiences} setExperiences={ctx.setExperiences} addExperience={ctx.addExperience} updateExperience={ctx.updateExperience} removeExperience={ctx.removeExperience} />}
          {tab === 'testimonials' && <TestimonialsEditor testimonials={ctx.testimonials} setTestimonials={ctx.setTestimonials} addTestimonial={ctx.addTestimonial} updateTestimonial={ctx.updateTestimonial} removeTestimonial={ctx.removeTestimonial} />}
        </div>
      </div>
    </div>
  );
}

// ─── Profile Editor ──────────────────────────────────────────────────────────

function ProfileEditor({ profile, setProfile }: { profile: Profile; setProfile: (p: Profile) => Promise<void> }) {
  const [local, setLocal] = useState<Profile>({ ...profile });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setLocal((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await setProfile(local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  const fields: { key: keyof Profile; label: string; multi?: boolean }[] = [
    { key: 'name', label: 'Full Name' },
    { key: 'initials', label: 'Initials (2 chars)' },
    { key: 'title', label: 'Title / Tagline' },
    { key: 'bio1', label: 'Bio Paragraph 1', multi: true },
    { key: 'bio2', label: 'Bio Paragraph 2', multi: true },
    { key: 'location', label: 'Location' },
    { key: 'timezone', label: 'Timezone' },
    { key: 'availability', label: 'Availability' },
    { key: 'email', label: 'Email' },
    { key: 'github', label: 'GitHub URL' },
    { key: 'linkedin', label: 'LinkedIn URL' },
    { key: 'twitter', label: 'Twitter URL' },
    { key: 'heroTagline', label: 'Hero Tagline (badge)' },
    { key: 'heroHeading', label: 'Hero Heading' },
    { key: 'heroSub', label: 'Hero Sub-heading', multi: true },
    { key: 'statYears', label: 'Stat: Years exp.' },
    { key: 'statProjects', label: 'Stat: Projects shipped' },
    { key: 'statClients', label: 'Stat: Happy clients' },
  ];

  return (
    <div className={styles.editorSection}>
      <div className={styles.formGrid}>
        {fields.map(({ key, label, multi }) => (
          <div key={key} className={multi ? styles.formGroupFull : styles.formGroup}>
            <label className={styles.label}>{label}</label>
            {multi ? (
              <textarea
                name={key}
                value={local[key]}
                onChange={handleChange}
                rows={3}
                className={styles.textarea}
              />
            ) : (
              <input
                name={key}
                type="text"
                value={local[key]}
                onChange={handleChange}
                className={styles.input}
              />
            )}
          </div>
        ))}
      </div>
      <button onClick={handleSave} disabled={saving} className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}>
        {saving ? <Loader2 size={15} className={styles.spinIcon} /> : <Save size={15} />}
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Profile'}
      </button>
    </div>
  );
}

// ─── Projects Editor ─────────────────────────────────────────────────────────

function ProjectsEditor({
  projects,
  setProjects,
  addProject,
  updateProject,
  removeProject,
}: {
  projects: Project[];
  setProjects: (p: Project[]) => Promise<void>;
  addProject: (p: Project) => Promise<void>;
  updateProject: (p: Project) => Promise<void>;
  removeProject: (id: string) => Promise<void>;
}) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [local, setLocal] = useState<Project[]>(projects.map((p) => ({ ...p })));
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  function update(id: string, field: keyof Project, value: any) {
    setLocal((prev) => prev.map((p) => p.id === id ? { ...p, [field]: value } : p));
  }

  function updateTags(id: string, raw: string) {
    update(id, 'tags', raw.split(',').map((t) => t.trim()).filter(Boolean));
  }

  async function handleAddProject() {
    const newP: Project = {
      id: `p${Date.now()}`,
      title: 'New Project',
      description: '',
      longDescription: '',
      tags: [],
      category: 'web',
      image: 'lumina',
      featured: false,
      year: new Date().getFullYear(),
    };
    setLocal((prev) => [newP, ...prev]);
    setExpanded(newP.id);
    await addProject(newP);
  }

  async function handleRemoveProject(id: string) {
    setRemoving(id);
    await removeProject(id);
    setLocal((prev) => prev.filter((p) => p.id !== id));
    setRemoving(null);
  }

  async function handleSave(id: string) {
    const project = local.find((p) => p.id === id);
    if (!project) return;
    setSaving(id);
    await updateProject(project);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <div className={styles.editorSection}>
      <div className={styles.listHeader}>
        <button onClick={handleAddProject} className={styles.addBtn}><Plus size={14} /> Add Project</button>
      </div>
      <div className={styles.list}>
        {local.map((p) => (
          <div key={p.id} className={styles.listItem}>
            <div className={styles.listItemHeader} onClick={() => setExpanded(expanded === p.id ? null : p.id)}>
              <span className={styles.listItemTitle}>{p.title || 'Untitled'}</span>
              <div className={styles.listItemActions}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemoveProject(p.id); }}
                  className={styles.deleteBtn}
                  disabled={removing === p.id}
                >
                  {removing === p.id ? <Loader2 size={14} className={styles.spinIcon} /> : <Trash2 size={14} />}
                </button>
                {expanded === p.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expanded === p.id && (
              <div className={styles.listItemBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Title</label>
                    <input className={styles.input} value={p.title} onChange={(e) => update(p.id, 'title', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Year</label>
                    <input className={styles.input} type="number" value={p.year} onChange={(e) => update(p.id, 'year', Number(e.target.value))} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Category</label>
                    <select className={styles.select} value={p.category} onChange={(e) => update(p.id, 'category', e.target.value)}>
                      <option value="web">Web</option>
                      <option value="mobile">Mobile</option>
                      <option value="design">Design</option>
                      <option value="oss">Open Source</option>
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Image key</label>
                    <select className={styles.select} value={p.image} onChange={(e) => update(p.id, 'image', e.target.value)}>
                      {['lumina','flowstate','aurora','horizon','sonic','devpulse'].map((img) => (
                        <option key={img} value={img}>{img}</option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Live URL</label>
                    <input className={styles.input} value={p.liveUrl || ''} onChange={(e) => update(p.id, 'liveUrl', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>GitHub URL</label>
                    <input className={styles.input} value={p.githubUrl || ''} onChange={(e) => update(p.id, 'githubUrl', e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Tags (comma-separated)</label>
                    <input className={styles.input} value={p.tags.join(', ')} onChange={(e) => updateTags(p.id, e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Short Description</label>
                    <textarea className={styles.textarea} rows={2} value={p.description} onChange={(e) => update(p.id, 'description', e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Long Description</label>
                    <textarea className={styles.textarea} rows={4} value={p.longDescription} onChange={(e) => update(p.id, 'longDescription', e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>
                      <input type="checkbox" checked={p.featured} onChange={(e) => update(p.id, 'featured', e.target.checked)} />
                      {' '}Featured project
                    </label>
                  </div>
                </div>
                <button
                  onClick={() => handleSave(p.id)}
                  disabled={saving === p.id}
                  className={`${styles.saveBtn} ${saved === p.id ? styles.savedBtn : ''}`}
                >
                  {saving === p.id ? <Loader2 size={15} className={styles.spinIcon} /> : <Save size={15} />}
                  {saving === p.id ? 'Saving...' : saved === p.id ? 'Saved!' : 'Save Project'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Skills Editor ───────────────────────────────────────────────────────────

function SkillsEditor({ skills, setSkills }: { skills: Skill[]; setSkills: (s: Skill[]) => Promise<void> }) {
  const [local, setLocal] = useState<Skill[]>(skills.map((s) => ({ ...s })));
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  function update(index: number, field: keyof Skill, value: any) {
    setLocal((prev) => prev.map((s, i) => i === index ? { ...s, [field]: value } : s));
    setSaved(false);
  }

  function addSkill() {
    setLocal((prev) => [...prev, { name: 'New Skill', level: 50, category: 'frontend' }]);
    setSaved(false);
  }

  function removeSkill(index: number) {
    setLocal((prev) => prev.filter((_, i) => i !== index));
    setSaved(false);
  }

  async function handleSave() {
    setSaving(true);
    await setSkills(local);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={styles.editorSection}>
      <div className={styles.listHeader}>
        <button onClick={addSkill} className={styles.addBtn}><Plus size={14} /> Add Skill</button>
        <button onClick={handleSave} disabled={saving} className={`${styles.saveBtn} ${saved ? styles.savedBtn : ''}`}>
          {saving ? <Loader2 size={15} className={styles.spinIcon} /> : <Save size={15} />}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save All'}
        </button>
      </div>
      <div className={styles.skillRows}>
        {local.map((s, i) => (
          <div key={i} className={styles.skillRow}>
            <input
              className={styles.input}
              value={s.name}
              onChange={(e) => update(i, 'name', e.target.value)}
              placeholder="Skill name"
            />
            <select
              className={styles.select}
              value={s.category}
              onChange={(e) => update(i, 'category', e.target.value)}
            >
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="tools">Tools</option>
              <option value="design">Design</option>
            </select>
            <div className={styles.levelWrap}>
              <input
                type="range"
                min={0}
                max={100}
                value={s.level}
                onChange={(e) => update(i, 'level', Number(e.target.value))}
                className={styles.range}
              />
              <span className={styles.levelNum}>{s.level}%</span>
            </div>
            <button onClick={() => removeSkill(i)} className={styles.deleteBtn}><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Experiences Editor ──────────────────────────────────────────────────────

function ExperiencesEditor({
  experiences,
  setExperiences,
  addExperience,
  updateExperience,
  removeExperience,
}: {
  experiences: Experience[];
  setExperiences: (e: Experience[]) => Promise<void>;
  addExperience: (e: Experience) => Promise<void>;
  updateExperience: (e: Experience) => Promise<void>;
  removeExperience: (id: string) => Promise<void>;
}) {
  const [local, setLocal] = useState<Experience[]>(experiences.map((e) => ({ ...e, description: [...e.description], tech: [...e.tech] })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  function update(id: string, field: keyof Experience, value: any) {
    setLocal((prev) => prev.map((e) => e.id === id ? { ...e, [field]: value } : e));
  }

  async function handleAdd() {
    const newE: Experience = {
      id: `e${Date.now()}`,
      company: 'Company',
      role: 'Role',
      period: '2024 — Present',
      description: ['Describe what you did here.'],
      tech: [],
    };
    setLocal((prev) => [newE, ...prev]);
    setExpanded(newE.id);
    await addExperience(newE);
  }

  async function handleRemove(id: string) {
    setRemoving(id);
    await removeExperience(id);
    setLocal((prev) => prev.filter((e) => e.id !== id));
    setRemoving(null);
  }

  async function handleSave(id: string) {
    const exp = local.find((e) => e.id === id);
    if (!exp) return;
    setSaving(id);
    await updateExperience(exp);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  }

  return (
    <div className={styles.editorSection}>
      <div className={styles.listHeader}>
        <button onClick={handleAdd} className={styles.addBtn}><Plus size={14} /> Add Experience</button>
      </div>
      <div className={styles.list}>
        {local.map((exp) => (
          <div key={exp.id} className={styles.listItem}>
            <div className={styles.listItemHeader} onClick={() => setExpanded(expanded === exp.id ? null : exp.id)}>
              <span className={styles.listItemTitle}>{exp.role} @ {exp.company}</span>
              <div className={styles.listItemActions}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(exp.id); }}
                  className={styles.deleteBtn}
                  disabled={removing === exp.id}
                >
                  {removing === exp.id ? <Loader2 size={14} className={styles.spinIcon} /> : <Trash2 size={14} />}
                </button>
                {expanded === exp.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expanded === exp.id && (
              <div className={styles.listItemBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company</label>
                    <input className={styles.input} value={exp.company} onChange={(e) => update(exp.id, 'company', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Role</label>
                    <input className={styles.input} value={exp.role} onChange={(e) => update(exp.id, 'role', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Period</label>
                    <input className={styles.input} value={exp.period} onChange={(e) => update(exp.id, 'period', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Tech (comma-separated)</label>
                    <input className={styles.input} value={exp.tech.join(', ')} onChange={(e) => update(exp.id, 'tech', e.target.value.split(',').map((t) => t.trim()).filter(Boolean))} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Description (one bullet per line)</label>
                    <textarea
                      className={styles.textarea}
                      rows={5}
                      value={exp.description.join('\n')}
                      onChange={(e) => update(exp.id, 'description', e.target.value.split('\n').filter(Boolean))}
                    />
                  </div>
                </div>
                <button
                  onClick={() => handleSave(exp.id)}
                  disabled={saving === exp.id}
                  className={`${styles.saveBtn} ${saved === exp.id ? styles.savedBtn : ''}`}
                >
                  {saving === exp.id ? <Loader2 size={15} className={styles.spinIcon} /> : <Save size={15} />}
                  {saving === exp.id ? 'Saving...' : saved === exp.id ? 'Saved!' : 'Save Experience'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Testimonials Editor ─────────────────────────────────────────────────────

function TestimonialsEditor({
  testimonials,
  setTestimonials,
  addTestimonial,
  updateTestimonial,
  removeTestimonial,
}: {
  testimonials: Testimonial[];
  setTestimonials: (t: Testimonial[]) => Promise<void>;
  addTestimonial: (t: Testimonial) => Promise<void>;
  updateTestimonial: (t: Testimonial) => Promise<void>;
  removeTestimonial: (id: string) => Promise<void>;
}) {
  const [local, setLocal] = useState<Testimonial[]>(testimonials.map((t) => ({ ...t })));
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [removing, setRemoving] = useState<string | null>(null);

  function update(id: string, field: keyof Testimonial, value: any) {
    setLocal((prev) => prev.map((t) => t.id === id ? { ...t, [field]: value } : t));
  }

  async function handleAdd() {
    const newT: Testimonial = {
      id: `t${Date.now()}`,
      quote: 'A wonderful testimonial.',
      name: 'Person Name',
      role: 'Role',
      company: 'Company',
      initials: 'PN',
      color: '#6366f1',
    };
    setLocal((prev) => [...prev, newT]);
    setExpanded(newT.id);
    await addTestimonial(newT);
  }

  async function handleRemove(id: string) {
    setRemoving(id);
    await removeTestimonial(id);
    setLocal((prev) => prev.filter((t) => t.id !== id));
    setRemoving(null);
  }

  async function handleSave(id: string) {
    const t = local.find((x) => x.id === id);
    if (!t) return;
    setSaving(id);
    await updateTestimonial(t);
    setSaving(null);
    setSaved(id);
    setTimeout(() => setSaved(null), 2000);
  }

  const colorOptions = ['#6366f1', '#f472b6', '#34d399', '#f59e0b', '#60a5fa', '#a78bfa', '#fb923c'];

  return (
    <div className={styles.editorSection}>
      <div className={styles.listHeader}>
        <button onClick={handleAdd} className={styles.addBtn}><Plus size={14} /> Add Testimonial</button>
      </div>
      <div className={styles.list}>
        {local.map((t) => (
          <div key={t.id} className={styles.listItem}>
            <div className={styles.listItemHeader} onClick={() => setExpanded(expanded === t.id ? null : t.id)}>
              <span className={styles.listItemTitle}>{t.name} @ {t.company}</span>
              <div className={styles.listItemActions}>
                <button
                  onClick={(e) => { e.stopPropagation(); handleRemove(t.id); }}
                  className={styles.deleteBtn}
                  disabled={removing === t.id}
                >
                  {removing === t.id ? <Loader2 size={14} className={styles.spinIcon} /> : <Trash2 size={14} />}
                </button>
                {expanded === t.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </div>
            </div>
            {expanded === t.id && (
              <div className={styles.listItemBody}>
                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Name</label>
                    <input className={styles.input} value={t.name} onChange={(e) => update(t.id, 'name', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Initials</label>
                    <input className={styles.input} value={t.initials} maxLength={3} onChange={(e) => update(t.id, 'initials', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Role</label>
                    <input className={styles.input} value={t.role} onChange={(e) => update(t.id, 'role', e.target.value)} />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Company</label>
                    <input className={styles.input} value={t.company} onChange={(e) => update(t.id, 'company', e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Quote</label>
                    <textarea className={styles.textarea} rows={3} value={t.quote} onChange={(e) => update(t.id, 'quote', e.target.value)} />
                  </div>
                  <div className={styles.formGroupFull}>
                    <label className={styles.label}>Avatar Color</label>
                    <div className={styles.colorPicker}>
                      {colorOptions.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => update(t.id, 'color', c)}
                          className={`${styles.colorSwatch} ${t.color === c ? styles.colorSwatchActive : ''}`}
                          style={{ background: c }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleSave(t.id)}
                  disabled={saving === t.id}
                  className={`${styles.saveBtn} ${saved === t.id ? styles.savedBtn : ''}`}
                >
                  {saving === t.id ? <Loader2 size={15} className={styles.spinIcon} /> : <Save size={15} />}
                  {saving === t.id ? 'Saving...' : saved === t.id ? 'Saved!' : 'Save Testimonial'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
