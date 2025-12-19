'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('language');

  const nextLocale = locale === 'ar' ? 'en' : 'ar';

  const handleSwitch = () => {
    // Remove the current locale prefix and add the new one
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, '') || '/';
    const newPath = `/${nextLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <Button variant='ghost' className='h-9 rounded-xl cursor-pointer' onClick={handleSwitch}>
      {nextLocale === 'ar' ? t('ar') : t('en')}
    </Button>
  );
}
