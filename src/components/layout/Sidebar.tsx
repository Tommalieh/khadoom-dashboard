'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { dashboardHome, dashboardLogout, dashboardNav } from '@/lib/navigation';
import { stagger } from '@/components/motion/animations';

function isActive(pathname: string, href: string) {
  if (href === '/dashboard') return pathname === '/dashboard' || pathname.endsWith('/dashboard');
  return pathname === href || pathname.startsWith(href + '/') || pathname.includes(href);
}

function NavRow({
  href,
  label,
  icon: Icon,
  active,
  disabled,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  disabled?: boolean;
}) {
  const content = (
    <motion.div
      whileHover={disabled ? undefined : { x: -2 }}
      className={cn(
        'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm',
        'transition-colors',
        disabled ? 'cursor-not-allowed text-white/40' : 'text-white/85 hover:bg-white/10 hover:text-white'
      )}
    >
      {/* Active indicator (RTL: right side) */}
      {active ? (
        <motion.span
          layoutId='sidebar-active'
          className='absolute end-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-accent'
        />
      ) : null}

      <span className={cn('grid h-9 w-9 place-items-center rounded-xl', disabled ? 'bg-white/5' : 'bg-white/10')}>
        <Icon className='h-4.5 w-4.5' />
      </span>

      <span className='truncate'>{label}</span>
    </motion.div>
  );

  if (disabled) {
    return <div className='relative block'>{content}</div>;
  }

  return (
    <Link href={href} className='relative block'>
      {content}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <aside className='sticky top-0 h-dvh w-72 shrink-0 overflow-y-auto bg-primary text-primary-foreground'>
      {/* Brand */}
      <div className='px-4 pt-5'>
        <div className='rounded-2xl bg-white/10 px-4 py-3'>
          <Image src='/logo-dark-cropped.png' alt='Khadoom' width={60} height={16} className='h-auto w-auto' />
          <div className='mt-2 text-xs text-white/70'>{t('sidebar.subtitle')}</div>
        </div>
      </div>

      {/* Nav */}
      <nav className='px-3 py-3'>
        <motion.div variants={stagger} initial='hidden' animate='show' className='space-y-1'>
          <NavRow
            href={dashboardHome.href}
            label={t(dashboardHome.labelKey)}
            icon={dashboardHome.icon}
            active={isActive(pathname, dashboardHome.href)}
          />

          <div className='my-3 h-px bg-white/10' />

          {dashboardNav.map((item) => (
            <NavRow
              key={item.key}
              href={item.href}
              label={t(item.labelKey)}
              icon={item.icon}
              active={isActive(pathname, item.href)}
            />
          ))}

          <div className='my-3 h-px bg-white/10' />

          <NavRow
            href={dashboardLogout.href}
            label={t(dashboardLogout.labelKey)}
            icon={dashboardLogout.icon}
            active={false}
            disabled
          />
        </motion.div>
      </nav>

      {/* Footer hint */}
      <div className='mt-auto px-4 pb-5'>
        <div className='rounded-2xl bg-white/5 px-4 py-3 text-xs text-white/70'>
          <span className='font-en-body'>{t('sidebar.version')}</span> • {t('sidebar.experimental')}
        </div>
      </div>
    </aside>
  );
}
