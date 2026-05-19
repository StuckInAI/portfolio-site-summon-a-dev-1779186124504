import { useState, useCallback, useEffect } from 'react';
import {
  fetchProjects, upsertProject, deleteProject,
  fetchSkills, upsertSkills,
  fetchExperiences, upsertExperience, deleteExperience,
  fetchProfile, upsertProfile,
  fetchTestimonials, upsertTestimonial, deleteTestimonial,
  defaultProjects, defaultSkills, defaultExperiences, defaultProfile, defaultTestimonials,
} from '@/lib/data';
import type { Profile, Testimonial } from '@/lib/data';
import type { Project, Skill, Experience } from '@/types';

export function usePortfolioData() {
  const [projects, setProjectsState] = useState<Project[]>(defaultProjects);
  const [skills, setSkillsState] = useState<Skill[]>(defaultSkills);
  const [experiences, setExperiencesState] = useState<Experience[]>(defaultExperiences);
  const [profile, setProfileState] = useState<Profile>(defaultProfile);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(defaultTestimonials);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const [p, s, e, pr, t] = await Promise.all([
          fetchProjects(),
          fetchSkills(),
          fetchExperiences(),
          fetchProfile(),
          fetchTestimonials(),
        ]);
        if (!cancelled) {
          setProjectsState(p);
          setSkillsState(s);
          setExperiencesState(e);
          setProfileState(pr);
          setTestimonialsState(t);
        }
      } catch (err) {
        console.error('[usePortfolioData] load failed:', err);
        if (!cancelled) setError('Failed to load portfolio data — using defaults.');
        // defaults remain in state, nothing to do
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Projects
  const setProjects = useCallback(async (p: Project[]) => {
    setProjectsState(p);
    for (const project of p) await upsertProject(project);
  }, []);

  const addProject = useCallback(async (project: Project) => {
    await upsertProject(project);
    setProjectsState((prev) => [project, ...prev]);
  }, []);

  const updateProject = useCallback(async (project: Project) => {
    await upsertProject(project);
    setProjectsState((prev) => prev.map((p) => p.id === project.id ? project : p));
  }, []);

  const removeProject = useCallback(async (id: string) => {
    await deleteProject(id);
    setProjectsState((prev) => prev.filter((p) => p.id !== id));
  }, []);

  // Skills
  const setSkills = useCallback(async (s: Skill[]) => {
    setSkillsState(s);
    await upsertSkills(s);
  }, []);

  // Experiences
  const setExperiences = useCallback(async (e: Experience[]) => {
    setExperiencesState(e);
    for (let i = 0; i < e.length; i++) await upsertExperience({ ...e[i], sort_order: i });
  }, []);

  const addExperience = useCallback(async (exp: Experience) => {
    await upsertExperience({ ...exp, sort_order: 0 });
    setExperiencesState((prev) => [exp, ...prev]);
  }, []);

  const updateExperience = useCallback(async (exp: Experience) => {
    await upsertExperience(exp);
    setExperiencesState((prev) => prev.map((e) => e.id === exp.id ? exp : e));
  }, []);

  const removeExperience = useCallback(async (id: string) => {
    await deleteExperience(id);
    setExperiencesState((prev) => prev.filter((e) => e.id !== id));
  }, []);

  // Profile
  const setProfile = useCallback(async (p: Profile) => {
    setProfileState(p);
    await upsertProfile(p);
  }, []);

  // Testimonials
  const setTestimonials = useCallback(async (t: Testimonial[]) => {
    setTestimonialsState(t);
    for (const testimonial of t) await upsertTestimonial(testimonial);
  }, []);

  const addTestimonial = useCallback(async (t: Testimonial) => {
    await upsertTestimonial(t);
    setTestimonialsState((prev) => [...prev, t]);
  }, []);

  const updateTestimonial = useCallback(async (t: Testimonial) => {
    await upsertTestimonial(t);
    setTestimonialsState((prev) => prev.map((x) => x.id === t.id ? t : x));
  }, []);

  const removeTestimonial = useCallback(async (id: string) => {
    await deleteTestimonial(id);
    setTestimonialsState((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return {
    loading,
    error,
    projects, setProjects, addProject, updateProject, removeProject,
    skills, setSkills,
    experiences, setExperiences, addExperience, updateExperience, removeExperience,
    profile, setProfile,
    testimonials, setTestimonials, addTestimonial, updateTestimonial, removeTestimonial,
  };
}
