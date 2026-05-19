-- ============================================================
-- Portfolio Schema — run this in Supabase SQL Editor
-- or via Database → Run on Supabase in Summon
-- ============================================================

-- 1. PROFILE (single row)
create table if not exists profile (
  id integer primary key default 1,
  name text not null default 'Alex Rivera',
  initials text not null default 'AR',
  title text not null default 'Full-Stack Developer & Designer',
  bio1 text not null default '',
  bio2 text not null default '',
  location text not null default 'San Francisco, CA',
  timezone text not null default 'PST (UTC-8)',
  availability text not null default 'Available from March 2025',
  email text not null default 'alex@example.com',
  github text not null default 'https://github.com',
  linkedin text not null default 'https://linkedin.com',
  twitter text not null default 'https://twitter.com',
  "heroTagline" text not null default 'Available for work',
  "heroHeading" text not null default 'I craft digital experiences that matter',
  "heroSub" text not null default '',
  "statYears" text not null default '6+',
  "statProjects" text not null default '40+',
  "statClients" text not null default '15+',
  constraint profile_single_row check (id = 1)
);

-- 2. PROJECTS
create table if not exists projects (
  id text primary key,
  title text not null,
  description text not null default '',
  "longDescription" text not null default '',
  tags text[] not null default '{}',
  category text not null default 'web',
  image text not null default '',
  "liveUrl" text,
  "githubUrl" text,
  featured boolean not null default false,
  year integer not null default 2024
);

-- 3. SKILLS
create table if not exists skills (
  name text primary key,
  level integer not null default 80,
  category text not null default 'frontend'
);

-- 4. EXPERIENCES
create table if not exists experiences (
  id text primary key,
  company text not null,
  role text not null,
  period text not null,
  description text[] not null default '{}',
  tech text[] not null default '{}',
  sort_order integer not null default 0
);

-- 5. TESTIMONIALS
create table if not exists testimonials (
  id text primary key,
  quote text not null,
  name text not null,
  role text not null,
  company text not null,
  initials text not null,
  color text not null default '#6366f1'
);

-- ============================================================
-- RLS — allow public read on all tables (anon key)
-- ============================================================
alter table profile enable row level security;
alter table projects enable row level security;
alter table skills enable row level security;
alter table experiences enable row level security;
alter table testimonials enable row level security;

create policy "public read profile" on profile for select to anon using (true);
create policy "public read projects" on projects for select to anon using (true);
create policy "public read skills" on skills for select to anon using (true);
create policy "public read experiences" on experiences for select to anon using (true);
create policy "public read testimonials" on testimonials for select to anon using (true);

-- Allow all operations for authenticated users (admin)
create policy "auth full access profile" on profile for all to authenticated using (true) with check (true);
create policy "auth full access projects" on projects for all to authenticated using (true) with check (true);
create policy "auth full access skills" on skills for all to authenticated using (true) with check (true);
create policy "auth full access experiences" on experiences for all to authenticated using (true) with check (true);
create policy "auth full access testimonials" on testimonials for all to authenticated using (true) with check (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Profile
insert into profile (id, name, initials, title, bio1, bio2, location, timezone, availability, email, github, linkedin, twitter, "heroTagline", "heroHeading", "heroSub", "statYears", "statProjects", "statClients")
values (
  1,
  'Alex Rivera',
  'AR',
  'Full-Stack Developer & Designer',
  'I''m a full-stack developer and designer based in San Francisco. For over 6 years I''ve been helping startups, scale-ups, and product teams ship delightful digital experiences. I care deeply about performance, accessibility, and the little details that make the difference between good and great.',
  'When I''m not building things on a screen, you''ll find me trail running, obsessing over specialty coffee, or diving deep into typography rabbit holes. I believe the best products are built by people who love both the craft and the problem.',
  'San Francisco, CA',
  'PST (UTC-8)',
  'Available from March 2025',
  'alex@example.com',
  'https://github.com',
  'https://linkedin.com',
  'https://twitter.com',
  'Available for work',
  'I craft digital experiences that matter',
  'Full-stack developer & designer specialising in React, TypeScript, and beautiful interfaces. I turn complex problems into elegant, performant solutions.',
  '6+',
  '40+',
  '15+'
)
on conflict (id) do nothing;

-- Projects
insert into projects (id, title, description, "longDescription", tags, category, image, "liveUrl", "githubUrl", featured, year) values
  ('p1', 'Lumina Dashboard', 'A real-time analytics dashboard with beautiful data visualisations and team collaboration features.', 'Built with React and D3.js, Lumina provides real-time insights with a stunning dark-mode UI.', array['React','TypeScript','D3.js','WebSocket','Node.js'], 'web', 'lumina', 'https://example.com', 'https://github.com', true, 2024),
  ('p2', 'Flowstate — Task Manager', 'A minimalist productivity app with drag-and-drop boards, calendar sync, and focus mode.', 'Flowstate is designed around the philosophy that the best tool gets out of your way.', array['React Native','Expo','SQLite','Reanimated'], 'mobile', 'flowstate', 'https://example.com', 'https://github.com', true, 2024),
  ('p3', 'Aurora Design System', 'An open-source component library with 60+ accessible components, theming, and full Storybook docs.', 'Aurora provides a cohesive design language across web products.', array['React','TypeScript','Storybook','CSS Modules','Vitest'], 'oss', 'aurora', null, 'https://github.com', true, 2023)
on conflict (id) do nothing;

-- Skills
insert into skills (name, level, category) values
  ('React', 95, 'frontend'),
  ('TypeScript', 92, 'frontend'),
  ('CSS / Animations', 90, 'frontend'),
  ('Next.js', 85, 'frontend'),
  ('Node.js', 85, 'backend'),
  ('GraphQL', 78, 'backend'),
  ('PostgreSQL', 72, 'backend'),
  ('Docker', 75, 'tools'),
  ('Figma', 82, 'design')
on conflict (name) do nothing;

-- Experiences
insert into experiences (id, company, role, period, description, tech, sort_order) values
  ('e1', 'Vercel', 'Senior Frontend Engineer', '2022 — Present', array['Led the redesign of the analytics dashboard, increasing user engagement by 40%.','Architected a component library used across 6 internal products.'], array['React','TypeScript','Next.js','Turborepo'], 0),
  ('e2', 'Shopify', 'Frontend Developer', '2020 — 2022', array['Built and shipped the new Checkout UI Extensions framework used by 10,000+ merchants.','Improved Lighthouse performance scores from 68 to 97 across checkout flows.'], array['React','Liquid','GraphQL','Storybook'], 1)
on conflict (id) do nothing;

-- Testimonials
insert into testimonials (id, quote, name, role, company, initials, color) values
  ('t1', 'Alex is one of the most talented engineers I''ve worked with.', 'Sarah Chen', 'VP of Engineering', 'Vercel', 'SC', '#6366f1'),
  ('t2', 'Working with Alex transformed our product.', 'Marcus Williams', 'CEO', 'Luminary', 'MW', '#f472b6'),
  ('t3', 'I''ve seen a lot of developers over the years, but Alex''s combination of technical depth and design sensibility is genuinely rare.', 'Priya Patel', 'Product Lead', 'Shopify', 'PP', '#34d399')
on conflict (id) do nothing;
