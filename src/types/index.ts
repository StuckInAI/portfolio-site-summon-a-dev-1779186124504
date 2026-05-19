export type Project = {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  category: 'web' | 'mobile' | 'design' | 'oss';
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  year: number;
};

export type Skill = {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'tools' | 'design';
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string[];
  tech: string[];
};

export type NavItem = {
  label: string;
  path: string;
};
