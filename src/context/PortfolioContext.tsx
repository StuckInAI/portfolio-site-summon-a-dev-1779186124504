import { createContext, useContext, ReactNode } from 'react';
import { usePortfolioData } from '@/hooks/usePortfolioData';
import type { Profile, Testimonial } from '@/lib/data';
import type { Project, Skill, Experience } from '@/types';

type PortfolioContextType = ReturnType<typeof usePortfolioData>;

const PortfolioContext = createContext<PortfolioContextType | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const value = usePortfolioData();
  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio() {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
}

export type { Profile, Testimonial, Project, Skill, Experience };
