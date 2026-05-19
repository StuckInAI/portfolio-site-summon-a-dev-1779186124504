import { Project, Skill, Experience } from '@/types';

// ─── Default seed data ───────────────────────────────────────────────────────

const defaultProjects: Project[] = [
  {
    id: 'p1',
    title: 'Lumina Dashboard',
    description: 'A real-time analytics dashboard with beautiful data visualisations and team collaboration features.',
    longDescription: 'Built with React and D3.js, Lumina provides real-time insights with a stunning dark-mode UI. Features include live charts, customisable widgets, role-based access, and WebSocket-powered updates.',
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
    longDescription: 'Flowstate is designed around the philosophy that the best tool gets out of your way. Smooth DnD interactions, a clean visual hierarchy, and intelligent reminders make staying focused effortless.',
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
    longDescription: 'Aurora provides a cohesive design language across web products. Built with accessibility at the core (WCAG AA), it includes design tokens, CSS variables, and React components that are fully tested.',
    tags: ['React', 'TypeScript', 'Storybook', 'CSS Modules', 'Vitest'],
    category: 'oss',
    image: 'aurora',
    githubUrl: 'https://github.com',
    featured: true,
    year: 2023,
  },
  {
    id: 'p4',
    title: 'Shopify Theme — Horizon',
    description: 'A performance-first Shopify 2.0 theme with a 99 Lighthouse score and dynamic product sections.',
    longDescription: 'Horizon redefines Shopify storefronts with zero-CLS transitions, lazy-loaded media, and a modular section architecture that empowers merchants to customise without code.',
    tags: ['Liquid', 'JavaScript', 'CSS', 'Shopify CLI'],
    category: 'web',
    image: 'horizon',
    liveUrl: 'https://example.com',
    featured: false,
    year: 2023,
  },
  {
    id: 'p5',
    title: 'Sonic — Music Player UI',
    description: 'A concept music player with fluid animations, waveform visualisations, and gesture controls.',
    longDescription: 'Sonic explores what a modern music interface could feel like — springy gesture-based navigation, real-time audio waveform rendering via the Web Audio API, and delightful micro-animations throughout.',
    tags: ['React', 'Framer Motion', 'Web Audio API', 'Canvas'],
    category: 'design',
    image: 'sonic',
    githubUrl: 'https://github.com',
    featured: false,
    year: 2023,
  },
  {
    id: 'p6',
    title: 'DevPulse — GitHub Tracker',
    description: 'Track your open-source contributions, visualise commit history, and set coding goals.',
    longDescription: 'DevPulse wraps the GitHub GraphQL API in a clean developer-focused dashboard. See your contribution heatmap, top languages, PR review stats, and set personal goals with streak tracking.',
    tags: ['Next.js', 'GraphQL', 'GitHub API', 'Recharts'],
    category: 'web',
    image: 'devpulse',
    liveUrl: 'https://example.com',
    githubUrl: 'https://github.com',
    featured: false,
    year: 2022,
  },
];

const defaultSkills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 92, category: 'frontend' },
  { name: 'CSS / Animations', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'React Native', level: 80, category: 'frontend' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'GraphQL', level: 78, category: 'backend' },
  { name: 'PostgreSQL', level: 72, category: 'backend' },
  { name: 'Redis', level: 68, category: 'backend' },
  { name: 'Docker', level: 75, category: 'tools' },
  { name: 'Git / CI-CD', level: 88, category: 'tools' },
  { name: 'Figma', level: 82, category: 'design' },
  { name: 'Motion Design', level: 76, category: 'design' },
];

const defaultExperiences: Experience[] = [
  {
    id: 'e1',
    company: 'Vercel',
    role: 'Senior Frontend Engineer',
    period: '2022 — Present',
    description: [
      'Led the redesign of the analytics dashboard, increasing user engagement by 40%.',
      'Architected a component library used across 6 internal products, cutting UI dev time by 30%.',
      'Mentored 3 junior engineers and drove the adoption of TypeScript strict mode across the team.',
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
      'Collaborated with design teams to create and document the Polaris design system updates.',
    ],
    tech: ['React', 'Liquid', 'GraphQL', 'Storybook'],
  },
  {
    id: 'e3',
    company: 'Freelance',
    role: 'Full-Stack Developer & Designer',
    period: '2018 — 2020',
    description: [
      'Delivered 20+ projects for startups and agencies across e-commerce, SaaS, and media.',
      'Specialised in high-performance landing pages and interactive marketing sites.',
      'Provided UX audits and design system consulting for early-stage companies.',
    ],
    tech: ['React', 'Node.js', 'WordPress', 'Figma'],
  },
];

const defaultProfile = {
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

// ─── localStorage helpers ─────────────────────────────────────────────────────

const KEYS = {
  projects: 'portfolio_projects',
  skills: 'portfolio_skills',
  experiences: 'portfolio_experiences',
  profile: 'portfolio_profile',
  testimonials: 'portfolio_testimonials',
};

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw) return JSON.parse(raw) as T;
  } catch {}
  return fallback;
}

function save<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getProjects(): Project[] {
  return load(KEYS.projects, defaultProjects);
}
export function saveProjects(p: Project[]): void {
  save(KEYS.projects, p);
}

export function getSkills(): Skill[] {
  return load(KEYS.skills, defaultSkills);
}
export function saveSkills(s: Skill[]): void {
  save(KEYS.skills, s);
}

export function getExperiences(): Experience[] {
  return load(KEYS.experiences, defaultExperiences);
}
export function saveExperiences(e: Experience[]): void {
  save(KEYS.experiences, e);
}

export type Profile = typeof defaultProfile;
export function getProfile(): Profile {
  return load(KEYS.profile, defaultProfile);
}
export function saveProfile(p: Profile): void {
  save(KEYS.profile, p);
}

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  color: string;
};

const defaultTestimonials: Testimonial[] = [
  {
    id: 't1',
    quote: "Alex is one of the most talented engineers I've worked with. Their attention to detail and ability to translate complex requirements into elegant code is remarkable.",
    name: 'Sarah Chen',
    role: 'VP of Engineering',
    company: 'Vercel',
    initials: 'SC',
    color: '#6366f1',
  },
  {
    id: 't2',
    quote: 'Working with Alex transformed our product. They delivered not just what we asked for, but something far better — and on time. The UX improvements alone doubled our conversion rate.',
    name: 'Marcus Williams',
    role: 'CEO',
    company: 'Luminary',
    initials: 'MW',
    color: '#f472b6',
  },
  {
    id: 't3',
    quote: "I've seen a lot of developers over the years, but Alex's combination of technical depth and design sensibility is genuinely rare. Would work with them again without hesitation.",
    name: 'Priya Patel',
    role: 'Product Lead',
    company: 'Shopify',
    initials: 'PP',
    color: '#34d399',
  },
];

export function getTestimonials(): Testimonial[] {
  return load(KEYS.testimonials, defaultTestimonials);
}
export function saveTestimonials(t: Testimonial[]): void {
  save(KEYS.testimonials, t);
}

// Legacy named exports so existing imports still compile
export const projects = getProjects();
export const skills = getSkills();
export const experiences = getExperiences();
