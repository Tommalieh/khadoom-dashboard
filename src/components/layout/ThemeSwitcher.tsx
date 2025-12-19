'use client';

import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useUiStore } from '@/store/ui.store';

export default function ThemeSwitcher() {
  const theme = useUiStore((s) => s.theme);
  const setTheme = useUiStore((s) => s.setTheme);
  const t = useTranslations('theme');
  const [mounted, setMounted] = useState(typeof window !== 'undefined');

  // Apply theme class to document
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;

    if (theme === 'system') {
      const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemDark);
    } else {
      root.classList.toggle('dark', theme === 'dark');
    }
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      document.documentElement.classList.toggle('dark', e.matches);
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [theme, mounted]);

  const toggleTheme = () => {
    // Simple toggle between light and dark (skip system for simplicity)
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return (
      <button className='grid h-9 w-9 place-items-center rounded-lg hover:bg-muted' aria-label={t('toggle')}>
        <Sun className='h-4.5 w-4.5' />
      </button>
    );
  }

  const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);

  return (
    <button
      onClick={toggleTheme}
      className='grid h-9 w-9 place-items-center rounded-lg hover:bg-muted'
      aria-label={t('toggle')}
    >
      {isDark ? <Sun className='h-4.5 w-4.5' /> : <Moon className='h-4.5 w-4.5' />}
    </button>
  );
}
