'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

export function StatusBadge({ status }: { status: string }) {
  const t = useTranslations('badges');
  const map = {
    completed: 'bg-secondary/25 text-primary',
    pending: 'bg-accent/20 text-foreground',
    failed: 'bg-destructive/15 text-destructive',
  };

  const statusLabels: Record<string, string> = {
    completed: t('completed'),
    pending: t('pending'),
    failed: t('failed'),
  };

  return (
    <span className={cn('rounded-full px-2 py-1 text-xs', map[status as keyof typeof map])}>
      {statusLabels[status] || status}
    </span>
  );
}

export function TypeBadge({ type }: { type: string }) {
  const t = useTranslations('badges');
  return (
    <span className='rounded-full bg-muted px-2 py-1 text-xs'>{type === 'deposit' ? t('deposit') : t('withdraw')}</span>
  );
}
