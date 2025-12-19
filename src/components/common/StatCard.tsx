'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useCountUp } from '@/components/motion/useCountUp';
import { formatMoney } from '@/lib/format';

export function StatCard({
  title,
  value,
  deltaPct,
  updatedMinutes,
  active,
  onClick,
  icon,
}: {
  title: string;
  value: number;
  deltaPct: number;
  updatedMinutes: number;
  active?: boolean;
  onClick?: () => void;
  icon?: React.ReactNode;
}) {
  const display = useCountUp(value);
  const t = useTranslations('kpi');

  const deltaPositive = deltaPct >= 0;

  return (
    <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}>
      <Card
        role='button'
        tabIndex={0}
        onClick={onClick}
        className={cn(
          'relative overflow-hidden rounded-2xl border bg-white p-4 shadow-sm transition',
          'hover:shadow-md cursor-pointer',
          active && 'ring-2 ring-primary/30'
        )}
      >
        {/* sheen */}
        <span className='pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity'>
          <span className='absolute -inset-x-20 -top-10 h-24 rotate-6 bg-gradient-to-r from-transparent via-secondary/25 to-transparent' />
        </span>

        <div className='flex items-start gap-3'>
          <div className='grid h-10 w-10 place-items-center rounded-2xl bg-secondary/25 text-primary'>{icon}</div>

          <div className='min-w-0 flex-1'>
            <div className='text-sm text-muted-foreground truncate'>{title}</div>

            <div className='mt-2 flex items-center gap-2'>
              <div className='font-en-body text-2xl leading-none text-foreground'>{formatMoney(display)}</div>
              <div
                className={cn(
                  'text-xs rounded-full px-2 py-1',
                  deltaPositive ? 'bg-secondary/25 text-primary' : 'bg-accent/20 text-foreground'
                )}
              >
                <span className='font-en-body'>
                  {deltaPositive ? '+' : ''}
                  {deltaPct.toFixed(1)}%
                </span>
              </div>
            </div>

            <div className='mt-2 text-[0.65rem] text-muted-foreground'>
              {updatedMinutes === 1 ? t('updatedAgoOne') : t('updatedAgo', { minutes: updatedMinutes })}
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
