'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { Transaction } from '@/features/dashboard/types/transaction';
import { StatusBadge, TypeBadge } from '../TransactionBadge';

// Map wallet key to translation key
const walletKeyMap: Record<string, string> = {
  cash: 'cash',
  dinark: 'dinark',
  'u-wallet': 'uWallet',
  'orange-money': 'orangeMoney',
  'zain-cash': 'zainCash',
};

export function useColumns(): ColumnDef<Transaction>[] {
  const t = useTranslations('table');
  const tKpi = useTranslations('kpi');

  return [
    {
      accessorKey: 'id',
      header: t('id'),
      cell: ({ row }) => <span className='font-en-body text-sm'>{row.original.id}</span>,
    },
    {
      accessorKey: 'date',
      header: t('date'),
      cell: ({ row }) => <span className='font-en-body text-sm text-muted-foreground'>{row.original.date}</span>,
    },
    {
      accessorKey: 'wallet',
      header: t('wallet'),
      cell: ({ row }) => {
        const walletKey = row.original.walletKey;
        return <span>{tKpi(walletKeyMap[walletKey] || walletKey)}</span>;
      },
    },
    {
      accessorKey: 'type',
      header: t('type'),
      cell: ({ row }) => <TypeBadge type={row.original.type} />,
    },
    {
      accessorKey: 'amount',
      header: t('amount'),
      cell: ({ row }) => <span className='font-en-body font-medium'>{row.original.amount}</span>,
    },
    {
      accessorKey: 'status',
      header: t('status'),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ];
}
