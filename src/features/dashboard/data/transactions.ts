import { Transaction } from '@/features/dashboard/types/transaction';

export const transactions: Transaction[] = [
  {
    id: 'TX-10241',
    date: '2024-03-18 14:32',
    wallet: 'cash',
    walletKey: 'cash',
    type: 'deposit',
    amount: 120,
    status: 'completed',
  },
  {
    id: 'TX-10242',
    date: '2024-03-18 14:21',
    wallet: 'orange-money',
    walletKey: 'orange-money',
    type: 'withdraw',
    amount: 75,
    status: 'pending',
  },
  {
    id: 'TX-10243',
    date: '2024-03-18 13:55',
    wallet: 'dinark',
    walletKey: 'dinark',
    type: 'deposit',
    amount: 220,
    status: 'completed',
  },
  {
    id: 'TX-10244',
    date: '2024-03-18 13:12',
    wallet: 'zain-cash',
    walletKey: 'zain-cash',
    type: 'withdraw',
    amount: 40,
    status: 'failed',
  },
  {
    id: 'TX-10245',
    date: '2024-03-18 12:48',
    wallet: 'u-wallet',
    walletKey: 'u-wallet',
    type: 'deposit',
    amount: 180,
    status: 'completed',
  },
];
