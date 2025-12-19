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
          <Card className='rounded-2xl border bg-white p-5'>
            <div className='flex items-start gap-4'>
              <div className='grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary'>
                {iconFor(wallet.key)}
              </div>

              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <h3 className='text-lg font-semibold'>{tKpi(walletLabelKey[wallet.key])}</h3>
                  <span
                    className={cn(
                      'rounded-full px-2 py-1 text-xs',
                      wallet.deltaPct >= 0 ? 'bg-secondary/25 text-primary' : 'bg-accent/20 text-foreground'
                    )}
                  >
                    <span className='font-en-body'>
                      {wallet.deltaPct >= 0 ? '+' : ''}
                      {wallet.deltaPct.toFixed(1)}%
                    </span>
                  </span>
                </div>

                <div className='mt-2 text-sm text-muted-foreground'>
                  {wallet.updatedMinutes === 1
                    ? tKpi('updatedAgoOne')
                    : tKpi('updatedAgo', { minutes: wallet.updatedMinutes })}
                </div>
                <div className='mt-4 grid gap-3 sm:grid-cols-3'>
                  <div className='rounded-2xl bg-muted p-4'>
                    <div className='text-xs text-muted-foreground'>{t('currentBalance')}</div>
                    <div className='mt-1 font-en-body text-xl'>{formatMoney(wallet.balance)}</div>
                  </div>

                  <div className='rounded-2xl bg-muted p-4'>
                    <div className='text-xs text-muted-foreground'>{t('todayTransactions')}</div>
                    <div className='mt-1 font-en-body text-xl'>124</div>
                  </div>

                  <div className='rounded-2xl bg-muted p-4'>
                    <div className='text-xs text-muted-foreground'>{t('avgTransaction')}</div>
                    <div className='mt-1 font-en-body text-xl'>38</div>
                  </div>
                </div>

                <p className='mt-4 text-sm text-muted-foreground'>{t('selectWalletHint')}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      ) : (
        <motion.div key='empty' initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Card className='rounded-2xl border bg-white p-5'>
            <div className='text-sm text-muted-foreground'>{t('noSelection')}</div>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
