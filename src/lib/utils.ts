import { clsx, type ClassValue } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function getProjectGradient(image: string): string {
  const gradients: Record<string, string> = {
    lumina: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #4c1d95 100%)',
    flowstate: 'linear-gradient(135deg, #0c4a6e 0%, #075985 50%, #0e7490 100%)',
    aurora: 'linear-gradient(135deg, #134e4a 0%, #0f766e 50%, #0d9488 100%)',
    horizon: 'linear-gradient(135deg, #1c1917 0%, #44403c 50%, #78716c 100%)',
    sonic: 'linear-gradient(135deg, #4a044e 0%, #86198f 50%, #c026d3 100%)',
    devpulse: 'linear-gradient(135deg, #1e3a5f 0%, #1e40af 50%, #1d4ed8 100%)',
  };
  return gradients[image] || 'linear-gradient(135deg, #1e1e2e 0%, #2e2e4e 100%)';
}

export function getProjectAccent(image: string): string {
  const accents: Record<string, string> = {
    lumina: '#818cf8',
    flowstate: '#38bdf8',
    aurora: '#2dd4bf',
    horizon: '#d6d3d1',
    sonic: '#e879f9',
    devpulse: '#60a5fa',
  };
  return accents[image] || '#6366f1';
}
