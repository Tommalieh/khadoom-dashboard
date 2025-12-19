'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Wallet, Banknote } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useDashboardStore, WalletKpi } from '@/features/dashboard/store/dashboard.store';
import { formatMoney } from '@/lib/format';

function iconFor(k: WalletKpi['key']) {
  if (k === 'cash') return <Banknote className='h-5 w-5' />;
  return <Wallet className='h-5 w-5' />;
}

export default function WalletDetails() {
  const selected = useDashboardStore((s) => s.selectedWallet);
  const kpis = useDashboardStore((s) => s.kpis);
  const t = useTranslations('walletDetails');
  const tKpi = useTranslations('kpi');

  const wallet = kpis.find((x) => x.key === selected) ?? null;

  // Map wallet key to translation key
  const walletLabelKey: Record<string, string> = {
    cash: 'cash',
    dinark: 'dinark',
    'u-wallet': 'uWallet',
    'orange-money': 'orangeMoney',
    'zain-cash': 'zainCash',
  };

  return (
    <AnimatePresence mode='wait'>
      {wallet ? (
        <motion.div
          key={wallet.key}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        >
          <Card className='rounded-2xl border bg-card p-4 sm:p-5'>
            <div className='flex items-start gap-3 sm:gap-4'>
              <div className='grid h-10 w-10 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary sm:h-11 sm:w-11'>
                {iconFor(wallet.key)}
              </div>

              <div className='min-w-0 flex-1'>
                <div className='flex flex-wrap items-center gap-2'>
                  <h3 className='truncate text-base font-semibold sm:text-lg'>{tKpi(walletLabelKey[wallet.key])}</h3>
                  <span
                    className={cn(
                      'shrink-0 rounded-full px-2 py-0.5 text-xs sm:py-1',
                      wallet.deltaPct >= 0 ? 'bg-secondary/25 text-primary' : 'bg-accent/20 text-foreground'
                    )}
                  >
                    <span className='font-en-body'>
                      {wallet.deltaPct >= 0 ? '+' : ''}
                      {wallet.deltaPct.toFixed(1)}%
                    </span>
                  </span>
                </div>

                <div className='mt-1.5 text-xs text-muted-foreground sm:mt-2 sm:text-sm'>
                  {wallet.updatedMinutes === 1
                    ? tKpi('updatedAgoOne')
                    : tKpi('updatedAgo', { minutes: wallet.updatedMinutes })}
                </div>
                <div className='mt-3 grid gap-2 sm:mt-4 sm:gap-3 sm:grid-cols-3'>
                  <div className='rounded-2xl bg-muted p-3 sm:p-4'>
                    <div className='text-[0.65rem] text-muted-foreground sm:text-xs'>{t('currentBalance')}</div>
                    <div className='mt-1 font-en-body text-lg sm:text-xl'>{formatMoney(wallet.balance)}</div>
                  </div>

                  <div className='rounded-2xl bg-muted p-3 sm:p-4'>
                    <div className='text-[0.65rem] text-muted-foreground sm:text-xs'>{t('todayTransactions')}</div>
                    <div className='mt-1 font-en-body text-lg sm:text-xl'>124</div>
                  </div>

                  <div className='rounded-2xl bg-muted p-3 sm:p-4'>
                    <div className='text-[0.65rem] text-muted-foreground sm:text-xs'>{t('avgTransaction')}</div>
                    <div className='mt-1 font-en-body text-lg sm:text-xl'>38</div>
                  </div>
                </div>

                <p className='mt-3 text-xs text-muted-foreground sm:mt-4 sm:text-sm'>{t('selectWalletHint')}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div key='empty' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Card className='rounded-2xl border bg-card p-4 sm:p-5'>
            <div className='text-xs text-muted-foreground sm:text-sm'>{t('noSelection')}</div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
