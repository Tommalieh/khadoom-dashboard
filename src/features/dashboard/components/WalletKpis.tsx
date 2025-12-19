'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Wallet, Banknote } from 'lucide-react';
import { StatCard } from '@/components/common/StatCard';
import { useDashboardStore, WalletKpi } from '@/features/dashboard/store/dashboard.store';
import { stagger, fadeUp } from '@/components/motion/animations';

function iconFor(k: WalletKpi['key']) {
  if (k === 'cash') return <Banknote className='h-5 w-5' />;
  return <Wallet className='h-5 w-5' />;
}

// Map wallet key to translation key
const walletLabelKey: Record<string, string> = {
  cash: 'cash',
  dinark: 'dinark',
  'u-wallet': 'uWallet',
  'orange-money': 'orangeMoney',
  'zain-cash': 'zainCash',
};

export default function WalletKpis() {
  const kpis = useDashboardStore((s) => s.kpis);
  const selected = useDashboardStore((s) => s.selectedWallet);
  const setSelected = useDashboardStore((s) => s.setSelectedWallet);
  const t = useTranslations('kpi');

  return (
    <motion.section
      variants={stagger}
      initial='hidden'
      animate='show'
      className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'
    >
      {kpis.map((kpi) => (
        <motion.div key={kpi.key} variants={fadeUp}>
          <StatCard
            title={t(walletLabelKey[kpi.key])}
            value={kpi.balance}
            deltaPct={kpi.deltaPct}
            updatedMinutes={kpi.updatedMinutes}
            icon={iconFor(kpi.key)}
            active={selected === kpi.key}
            onClick={() => setSelected(selected === kpi.key ? null : kpi.key)}
          />
        </motion.div>
      ))}
    </motion.section>
  );
}
