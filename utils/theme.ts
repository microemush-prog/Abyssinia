export type ThemeName = 'emerald' | 'rose' | 'amber' | 'blue';

export interface ThemeColors {
  primary: string;    // Main text/icon color (e.g., text-emerald-600)
  secondary: string;  // Darker shade for headings (e.g., text-emerald-800)
  bg: string;         // Solid background for buttons/cards (e.g., bg-emerald-600)
  bgLight: string;    // Very light background for containers (e.g., bg-emerald-50)
  bgSoft: string;     // Soft background for chips/highlights (e.g., bg-emerald-100)
  border: string;     // Border color (e.g., border-emerald-200)
  ring: string;       // Focus ring (e.g., focus:ring-emerald-500)
  hoverText: string;  // Hover text color
  hoverBorder: string;// Hover border color
  activeNav: string;  // Active navigation item color
}

export const THEMES: Record<ThemeName, { name: string, colors: ThemeColors }> = {
  emerald: {
    name: 'Abyssinia',
    colors: {
      primary: 'text-emerald-600',
      secondary: 'text-emerald-800',
      bg: 'bg-emerald-600',
      bgLight: 'bg-emerald-50',
      bgSoft: 'bg-emerald-100',
      border: 'border-emerald-200',
      ring: 'focus:ring-emerald-500',
      hoverText: 'hover:text-emerald-600',
      hoverBorder: 'hover:border-emerald-500',
      activeNav: 'text-emerald-600'
    }
  },
  rose: {
    name: 'Adwa',
    colors: {
      primary: 'text-rose-600',
      secondary: 'text-rose-900',
      bg: 'bg-rose-600',
      bgLight: 'bg-rose-50',
      bgSoft: 'bg-rose-100',
      border: 'border-rose-200',
      ring: 'focus:ring-rose-500',
      hoverText: 'hover:text-rose-600',
      hoverBorder: 'hover:border-rose-500',
      activeNav: 'text-rose-600'
    }
  },
  amber: {
    name: 'Sahara',
    colors: {
      primary: 'text-amber-600',
      secondary: 'text-amber-900',
      bg: 'bg-amber-500', 
      bgLight: 'bg-amber-50',
      bgSoft: 'bg-amber-100',
      border: 'border-amber-200',
      ring: 'focus:ring-amber-500',
      hoverText: 'hover:text-amber-600',
      hoverBorder: 'hover:border-amber-500',
      activeNav: 'text-amber-600'
    }
  },
  blue: {
    name: 'Nile',
    colors: {
      primary: 'text-blue-600',
      secondary: 'text-blue-900',
      bg: 'bg-blue-600',
      bgLight: 'bg-blue-50',
      bgSoft: 'bg-blue-100',
      border: 'border-blue-200',
      ring: 'focus:ring-blue-500',
      hoverText: 'hover:text-blue-600',
      hoverBorder: 'hover:border-blue-500',
      activeNav: 'text-blue-600'
    }
  }
};