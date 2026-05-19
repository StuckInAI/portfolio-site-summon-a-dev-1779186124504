import { supabase } from './supabase';
import type { Project, Skill, Experience } from '@/types';

// ─── Types ────────────────────────────────────────────────────────────────────

export type Profile = {
  name: string;
  initials: string;
  title: string;
  bio1: string;
  bio2: string;
  location: string;
  timezone: string;
  availability: string;
  email: string;
  github: string;
  linkedin: string;
  twitter: string;
  heroTagline: string;
  heroHeading: string;
  heroSub: string;
  statYears: string;
  statProjects: string;
  statClients: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
};

// ─── Default / fallback data ──────────────────────────────────────────────────

export const defaultProfile: Profile = {
  name: 'Alex Rivera',
  initials: 'AR',
  title: 'Full-Stack Developer & Designer',
  bio1: "I'm a full-stack developer and designer based in San Francisco. For over 6 years I've been helping startups, scale-ups, and product teams ship delightful digital experiences. I care deeply about performance, accessibility, and the little details that make the difference between good and great.",
  bio2: "When I'm not building things on a screen, you'll find me trail running, obsessing over specialty coffee, or diving deep into typography rabbit holes. I believe the best products are built by people who love both the craft and the problem.",
  location: 'San Francisco, CA',
  timezone: 'PST (UTC-8)',
  availability: 'Available from March 2025',
  email: 'alex@example.com',
  github: 'https://github.com',
  linkedin: 'https://linkedin.com',
  twitter: 'https://twitter.com',
  heroTagline: 'Available for work',
  heroHeading: 'I craft digital experiences that matter',
  heroSub: 'Full-stack developer & designer specialising in React, TypeScript, and beautiful interfaces. I turn complex problems into elegant, performant solutions.',
  statYears: '6+',
  statProjects: '40+',
  statClients: '15+',
};

export const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Lumina Dashboard',
    description: 'A real-time analytics dashboard with beautiful data visualisations and team collaboration features.',
    longDescription: 'Built with React and D3.js, Lumina provides real-time insights with a stunning dark-mode UI.',
    tags: ['React', 'TypeScript', 'D3.js', 'WebSocket', 'Node.js'],
    category: 'web',
    image: 'lumina',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: 2024,
  },
  {
    id: 'p2',
    title: 'Flowstate — Task Manager',
    description: 'A minimalist productivity app with drag-and-drop boards, calendar sync, and focus mode.',
    longDescription: 'Flowstate is designed around the philosophy that the best tool gets out of your way.',
    tags: ['React Native', 'Expo', 'SQLite', 'Reanimated'],
    category: 'mobile',
    image: 'flowstate',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: true,
    year: 2024,
  },
  {
    id: 'p3',
    title: 'Aurora Design System',
    description: 'An open-source component library with 60+ accessible components, theming, and full Storybook docs.',
    longDescription: 'Aurora provides a cohesive design language across web products.',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS Modules', 'Vitest'],
    category: 'oss',
    image: 'aurora',
    githubUrl: 'https://github.com',
    featured: true,
    year: 2023,
  },
];

export const defaultSkills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 92, category: 'frontend' },
  { name: 'CSS / Animations', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'GraphQL', level: 78, category: 'backend' },
  { name: 'PostgreSQL', level: 72, category: 'backend' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Figma', level: 82, category: 'design' },
];

export const defaultExperiences: Experience[] = [
  {
    id: 'e1',
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    period: '2022 — Present',
    description: [
      'Led the redesign of the analytics dashboard, increasing user engagement by 40%.',
      'Architected a component library used across 6 internal products.',
    ],
    tech: ['React', 'TypeScript', 'Next.js', 'Turborepo'],
  },
  {
    id: 'e2',
    company: 'Shopify',
    role: 'Frontend Developer',
    period: '2020 — 2022',
    description: [
      'Built and shipped the new Checkout UI Extensions framework used by 10,000+ merchants.',
      'Improved Lighthouse performance scores from 68 to 97 across checkout flows.',
    ],
    tech: ['React', 'Liquid', 'GraphQL', 'Storybook'],
  },
];

export const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Alex is one of the most talented engineers I've worked with.",
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Vercel',
    initials: 'SC',
    color: '#6366f1',
  },
  {
    id: 't2',
    quote: 'Working with Alex transformed our product.',
    name: 'Marcus Williams',
    role: 'CEO',
    company: 'Luminary',
    initials: 'MW',
    color: '#f472b6',
  },
  {
    id: 't3',
    quote: "I've seen a lot of developers over the years, but Alex's combination of technical depth and design sensibility is genuinely rare.",
    name: 'Priya Patel',
    role: 'Product Lead',
    company: 'Shopify',
    initials: 'PP',
    color: '#34d399',
  },
];

// ─── Supabase CRUD helpers ────────────────────────────────────────────────────

// Profile (single row, id = 1)
export async function fetchProfile(): Promise<Profile> {
  if (!supabase) return defaultProfile;
  const { data, error } = await supabase.from('profile').select('*').eq('id', 1).single();
  if (error || !data) return defaultProfile;
  return data as Profile;
}

export async function upsertProfile(profile: Profile): Promise<void> {
  if (!supabase) return;
  await supabase.from('profile').upsert({ id: 1, ...profile });
}

// Projects
export async function fetchProjects(): Promise<Project[]> {
  if (!supabase) return defaultProjects;
  const { data, error } = await supabase.from('projects').select('*').order('year', { ascending: false });
  if (error || !data || data.length === 0) return defaultProjects;
  return data.map((row: any) => ({
    ...row,
    tags: Array.isArray(row.tags) ? row.tags : [],
    featured: !!row.featured,
  })) as Project[];
}

export async function upsertProject(project: Project): Promise<void> {
  if (!supabase) return;
  await supabase.from('projects').upsert(project);
}

export async function deleteProject(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.from('projects').delete().eq('id', id);
}

// Skills
export async function fetchSkills(): Promise<Skill[]> {
  if (!supabase) return defaultSkills;
  const { data, error } = await supabase.from('skills').select('*').order('level', { ascending: false });
  if (error || !data || data.length === 0) return defaultSkills;
  return data as Skill[];
}

export async function upsertSkills(skills: Skill[]): Promise<void> {
  if (!supabase) return;
  // Replace all skills: delete then insert
  await supabase.from('skills').delete().neq('name', '__never__');
  if (skills.length > 0) await supabase.from('skills').insert(skills);
}

// Experiences
export async function fetchExperiences(): Promise<Experience[]> {
  if (!supabase) return defaultExperiences;
  const { data, error } = await supabase.from('experiences').select('*').order('sort_order', { ascending: true });
  if (error || !data || data.length === 0) return defaultExperiences;
  return data.map((row: any) => ({
    ...row,
    description: Array.isArray(row.description) ? row.description : [],
    tech: Array.isArray(row.tech) ? row.tech : [],
  })) as Experience[];
}

export async function upsertExperience(exp: Experience & { sort_order?: number }): Promise<void> {
  if (!supabase) return;
  await supabase.from('experiences').upsert(exp);
}

export async function deleteExperience(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.from('experiences').delete().eq('id', id);
}

// Testimonials
export async function fetchTestimonials(): Promise<Testimonial[]> {
  if (!supabase) return defaultTestimonials;
  const { data, error } = await supabase.from('testimonials').select('*');
  if (error || !data || data.length === 0) return defaultTestimonials;
  return data as Testimonial[];
}

export async function upsertTestimonial(t: Testimonial): Promise<void> {
  if (!supabase) return;
  await supabase.from('testimonials').upsert(t);
}

export async function deleteTestimonial(id: string): Promise<void> {
  if (!supabase) return;
  await supabase.from('testimonials').delete().eq('id', id);
}

// Legacy sync exports (kept so old imports don't break)
export const projects = defaultProjects;
export const skills = defaultSkills;
export const experiences = defaultExperiences;

// Legacy sync helpers (no-op stubs — replaced by async above)
export function getProjects() { return defaultProjects; }
export function saveProjects(_p: Project[]) {}
export function getSkills() { return defaultSkills; }
export function saveSkills(_s: Skill[]) {}
export function getExperiences() { return defaultExperiences; }
export function saveExperiences(_e: Experience[]) {}
export function getProfile() { return defaultProfile; }
export function saveProfile(_p: Profile) {}
export function getTestimonials() { return defaultTestimonials; }
export function saveTestimonials(_t: Testimonial[]) {}
