'use client';

import { useTranslations } from 'next-intl';
import { Card } from '@/components/ui/card';
import ChartsFilters from '@/features/dashboard/components/ChartsFilters';
import { useDashboardStore, ChartTab } from '@/features/dashboard/store/dashboard.store';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import ByWalletChart from '@/features/dashboard/components/charts/ByWalletChart';
import WithdrawVsDepositChart from '@/features/dashboard/components/charts/WithdrawVsDepositChart';

export default function ChartsCard() {
  const tab = useDashboardStore((s) => s.chartTab);
  const setTab = useDashboardStore((s) => s.setChartTab);
  const t = useTranslations('charts');

  const tabs: { value: ChartTab; label: string }[] = [
    { value: 'withdrawVsDeposit', label: t('tabWithdrawDeposit') },
    { value: 'byWallet', label: t('tabByWallet') },
  ];

  return (
    <Card className='rounded-2xl border bg-white p-4 sm:p-5'>
      <div className='flex flex-wrap items-start justify-between gap-3 sm:gap-4'>
        <div>
          <h3 className='text-base font-semibold sm:text-lg'>{t('title')}</h3>
          <p className='mt-1 text-xs text-muted-foreground sm:text-sm'>{t('subtitle')}</p>
        </div>

        <ChartsFilters />
      </div>

      <div className='mt-4 sm:mt-5'>
        {/* Animated Pill Tabs */}
        <div className='relative flex items-center rounded-2xl bg-muted p-1'>
          {tabs.map((tabItem) => {
            const isActive = tab === tabItem.value;
            return (
              <button
                key={tabItem.value}
                type='button'
                onClick={() => setTab(tabItem.value)}
                className={cn(
                  'relative z-10 h-10 flex-1 rounded-xl px-2 text-xs font-medium transition-colors sm:h-12 sm:px-4 sm:text-sm',
                  isActive ? 'text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId='chart-tab-pill'
                    className='absolute inset-0 rounded-xl bg-primary'
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <span className='relative z-10'>{tabItem.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className='mt-3 sm:mt-4'>
          <AnimatePresence mode='wait'>
            <motion.div
              key={tab}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className='rounded-2xl border bg-background p-3 sm:p-4'
            >
              {tab === 'byWallet' ? <ByWalletChart /> : <WithdrawVsDepositChart />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
