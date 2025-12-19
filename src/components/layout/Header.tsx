'use client';

import { Menu } from 'lucide-react';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useUiStore } from '@/store/ui.store';

export default function Header() {
  const t = useTranslations();
  const toggleMobileSidebar = useUiStore((s) => s.toggleMobileSidebar);

  return (
    <header className='h-14 border-b border-border bg-white/80 backdrop-blur sm:h-16'>
      <div className='flex h-full items-center px-4 sm:px-6'>
        {/* Hamburger menu for mobile */}
        <button
          onClick={toggleMobileSidebar}
          className='me-3 grid h-9 w-9 place-items-center rounded-lg hover:bg-muted lg:hidden'
          aria-label='Toggle menu'
        >
          <Menu className='h-5 w-5' />
        </button>

        <div className='flex min-w-0 flex-col leading-tight'>
          <h2 className='truncate font-medium'>{t('header.title')}</h2>
          <div className='truncate text-xs text-muted-foreground'>{t('header.subtitle')}</div>
        </div>

        <div className='ms-auto flex shrink-0 items-center gap-2'>
          <span className='hidden rounded-full bg-secondary/25 px-3 py-1 text-xs text-foreground sm:inline'>
            {t('header.role')}
          </span>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
