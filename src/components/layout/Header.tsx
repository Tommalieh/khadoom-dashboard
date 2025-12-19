import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations();

  return (
    <header className='h-16 border-b border-border bg-white/80 backdrop-blur'>
      <div className='h-full flex items-center px-6'>
        <div className='flex flex-col leading-tight'>
          <h2 className='font-medium'>{t('header.title')}</h2>
          <div className='text-xs text-muted-foreground'>{t('header.subtitle')}</div>
        </div>

        <div className='ms-auto flex items-center gap-2'>
          <span className='rounded-full bg-secondary/25 px-3 py-1 text-xs text-foreground'>{t('header.role')}</span>
          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
