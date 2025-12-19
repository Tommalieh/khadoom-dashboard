export type TransactionType = 'deposit' | 'withdraw';

export type TransactionStatus = 'completed' | 'pending' | 'failed';

export type WalletKey = 'cash' | 'dinark' | 'u-wallet' | 'orange-money' | 'zain-cash';

export type Transaction = {
  id: string;
  date: string;
  wallet: string; // deprecated, use walletKey
  walletKey: WalletKey;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
};
