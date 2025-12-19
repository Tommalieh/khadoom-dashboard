'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useDashboardStore, ChartRange, ChartScope } from '@/features/dashboard/store/dashboard.store';

type PillTabsProps<T extends string> = {
  options: { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
  layoutId: string;
};

function PillTabs<T extends string>({ options, value, onChange, layoutId }: PillTabsProps<T>) {
  return (
    <div className='relative flex items-center rounded-2xl bg-muted p-1'>
      {options.map((option) => {
        const isActive = value === option.value;
        return (
          <button
            key={option.value}
            type='button'
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 h-8 rounded-xl px-3 text-xs font-medium transition-colors sm:px-4 sm:text-sm',
              isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {isActive && (
              <motion.span
                layoutId={layoutId}
                className='absolute inset-0 rounded-xl bg-primary'
                transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
              />
            )}
            <span className='relative z-10'>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default function ChartsFilters() {
  const range = useDashboardStore((s) => s.chartRange);
  const scope = useDashboardStore((s) => s.chartScope);
  const setRange = useDashboardStore((s) => s.setChartRange);
  const setScope = useDashboardStore((s) => s.setChartScope);
  const t = useTranslations('filters');

  const rangeOptions: { value: ChartRange; label: string }[] = [
    { value: 'week', label: t('week') },
    { value: 'last', label: t('last') },
  ];

  const scopeOptions: { value: ChartScope; label: string }[] = [
    { value: 'branch', label: t('branch') },
    { value: 'all', label: t('all') },
  ];

  return (
    <div className='flex flex-wrap items-center gap-2 sm:gap-3'>
      <PillTabs options={rangeOptions} value={range} onChange={setRange} layoutId='chart-range-pill' />
      <PillTabs options={scopeOptions} value={scope} onChange={setScope} layoutId='chart-scope-pill' />
    </div>
  );
}
