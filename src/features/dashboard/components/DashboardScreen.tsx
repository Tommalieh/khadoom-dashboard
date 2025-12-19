'use client';

import { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import WalletKpis from '@/features/dashboard/components/WalletKpis';
import WalletDetails from '@/features/dashboard/components/WalletDetails';
import ChartsCard from '@/features/dashboard/components/ChartsCard';
import TransactionsTable from '@/features/dashboard/components/transactions/TransactionsTable';
import { useDashboardStore } from '@/features/dashboard/store/dashboard.store';
import {
  KpiStripSkeleton,
  WalletDetailsSkeleton,
  ChartsCardSkeleton,
  TransactionsTableSkeleton,
} from '@/features/dashboard/components/skeletons/DashboardSkeletons';

export default function DashboardScreen() {
  const isLoading = useDashboardStore((s) => s.isLoading);
  const setIsLoading = useDashboardStore((s) => s.setIsLoading);
  const t = useTranslations('dashboard');

  useEffect(() => {
    // Simulate initial load (replace with real fetch later)
    const timer = setTimeout(() => setIsLoading(false), 650);
    return () => clearTimeout(timer);
  }, [setIsLoading]);

  return (
    <div className='space-y-6'>
      <div>
        <h1 className='text-2xl font-semibold'>{t('title')}</h1>
        <p className='mt-1 text-sm text-muted-foreground'>{t('subtitle')}</p>
      </div>

      {isLoading ? <KpiStripSkeleton /> : <WalletKpis />}
      {isLoading ? <WalletDetailsSkeleton /> : <WalletDetails />}
      {isLoading ? <ChartsCardSkeleton /> : <ChartsCard />}
      {isLoading ? <TransactionsTableSkeleton /> : <TransactionsTable />}
    </div>
  );
}
