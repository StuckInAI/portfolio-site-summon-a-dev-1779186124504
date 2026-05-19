import { useState, useCallback } from 'react';
import {
  getProjects, saveProjects,
  getSkills, saveSkills,
  getExperiences, saveExperiences,
  getProfile, saveProfile,
  getTestimonials, saveTestimonials,
} from '@/lib/data';
import type { Profile, Testimonial } from '@/lib/data';
import type { Project, Skill, Experience } from '@/types';

export function usePortfolioData() {
  const [projects, setProjectsState] = useState<Project[]>(getProjects);
  const [skills, setSkillsState] = useState<Skill[]>(getSkills);
  const [experiences, setExperiencesState] = useState<Experience[]>(getExperiences);
  const [profile, setProfileState] = useState<Profile>(getProfile);
  const [testimonials, setTestimonialsState] = useState<Testimonial[]>(getTestimonials);

  const setProjects = useCallback((p: Project[]) => {
    saveProjects(p);
    setProjectsState(p);
  }, []);

  const setSkills = useCallback((s: Skill[]) => {
    saveSkills(s);
    setSkillsState(s);
  }, []);

  const setExperiences = useCallback((e: Experience[]) => {
    saveExperiences(e);
    setExperiencesState(e);
  }, []);

  const setProfile = useCallback((p: Profile) => {
    saveProfile(p);
    setProfileState(p);
  }, []);

  const setTestimonials = useCallback((t: Testimonial[]) => {
    saveTestimonials(t);
    setTestimonialsState(t);
  }, []);

  return {
    projects, setProjects,
    skills, setSkills,
    experiences, setExperiences,
    profile, setProfile,
    testimonials, setTestimonials,
  };
}
