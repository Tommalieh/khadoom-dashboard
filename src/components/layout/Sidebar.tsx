'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { dashboardHome, dashboardLogout, dashboardNav } from '@/lib/navigation';
import { stagger } from '@/components/motion/animations';
import { useUiStore } from '@/store/ui.store';

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
  onClick,
  collapsed,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  active: boolean;
  disabled?: boolean;
  onClick?: () => void;
  collapsed?: boolean;
}) {
  const content = (
    <motion.div
      whileHover={disabled ? undefined : { x: -2 }}
      className={cn(
        'relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm',
        'transition-colors',
        disabled ? 'cursor-not-allowed text-white/40' : 'text-white/85 hover:bg-white/10 hover:text-white',
        collapsed && 'justify-center px-0'
      )}
    >
      {/* Active indicator (RTL: right side) */}
      {active ? (
        <motion.span
          layoutId='sidebar-active'
          className='absolute end-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-full bg-accent'
        />
      ) : null}

      <span
        className={cn('grid h-9 w-9 shrink-0 place-items-center rounded-xl', disabled ? 'bg-white/5' : 'bg-white/10')}
      >
        <Icon className='h-4.5 w-4.5' />
      </span>

      {!collapsed && <span className='truncate'>{label}</span>}
    </motion.div>
  );

  if (disabled) {
    return <div className='relative block'>{content}</div>;
  }

  return (
    <Link href={href} className='relative block' onClick={onClick}>
      {content}
    </Link>
  );
}

function SidebarContent({ onNavClick, collapsed }: { onNavClick?: () => void; collapsed?: boolean }) {
  const pathname = usePathname();
  const t = useTranslations();

  return (
    <>
      {/* Brand */}
      <div className={cn('px-4 pt-5', collapsed && 'px-2')}>
        <div className={cn('rounded-2xl bg-white/10 px-4 py-3', collapsed && 'px-2 py-2')}>
          {collapsed ? (
            <div className='grid place-items-center'>
              <Image src='/logo-dark-cropped.png' alt='Khadoom' width={32} height={32} className='h-5 w-auto' />
            </div>
          ) : (
            <>
              <Image src='/logo-dark-cropped.png' alt='Khadoom' width={60} height={16} className='h-auto w-auto' />
              <div className='mt-2 text-xs text-white/70'>{t('sidebar.subtitle')}</div>
            </>
          )}
        </div>
      </div>

      {/* Nav */}
      <nav className={cn('px-3 py-3', collapsed && 'px-2')}>
        <motion.div variants={stagger} initial='hidden' animate='show' className='space-y-1'>
          <NavRow
            href={dashboardHome.href}
            label={t(dashboardHome.labelKey)}
            icon={dashboardHome.icon}
            active={isActive(pathname, dashboardHome.href)}
            onClick={onNavClick}
            collapsed={collapsed}
          />

          <div className='my-3 h-px bg-white/10' />

          {dashboardNav.map((item) => (
            <NavRow
              key={item.key}
              href={item.href}
              label={t(item.labelKey)}
              icon={item.icon}
              active={isActive(pathname, item.href)}
              onClick={onNavClick}
              collapsed={collapsed}
            />
          ))}

          <div className='my-3 h-px bg-white/10' />

          <NavRow
            href={dashboardLogout.href}
            label={t(dashboardLogout.labelKey)}
            icon={dashboardLogout.icon}
            active={false}
            disabled
            collapsed={collapsed}
          />
        </motion.div>
      </nav>

      {/* Footer hint */}
      {!collapsed && (
        <div className='mt-auto px-4 pb-5'>
          <div className='rounded-2xl bg-white/5 px-4 py-3 text-xs text-white/70'>
            <span className='font-en-body'>{t('sidebar.version')}</span> • {t('sidebar.experimental')}
          </div>
        </div>
      )}
    </>
  );
}

export default function Sidebar() {
  const mobileSidebarOpen = useUiStore((s) => s.mobileSidebarOpen);
  const setMobileSidebarOpen = useUiStore((s) => s.setMobileSidebarOpen);
  const sidebarCollapsed = useUiStore((s) => s.sidebarCollapsed);

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: sidebarCollapsed ? 72 : 288 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className='sticky top-0 hidden h-dvh shrink-0 overflow-y-auto overflow-x-hidden bg-sidebar text-sidebar-foreground border-e border-sidebar-border lg:block'
      >
        <SidebarContent collapsed={sidebarCollapsed} />
      </motion.aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className='fixed inset-0 z-40 bg-black/50 lg:hidden'
              onClick={() => setMobileSidebarOpen(false)}
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className='fixed inset-y-0 start-0 z-50 w-72 overflow-y-auto bg-primary text-primary-foreground lg:hidden'
            >
              {/* Close button */}
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className='absolute end-3 top-3 grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-white hover:bg-white/20'
              >
                <X className='h-4 w-4' />
              </button>
              <SidebarContent onNavClick={() => setMobileSidebarOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
