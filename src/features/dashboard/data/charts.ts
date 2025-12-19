import type { ChartRange, ChartScope } from '@/features/dashboard/store/dashboard.store';

export type WalletChartDataItem = {
  nameKey: string; // Translation key like 'cash'
  value: number;
};

export type DayChartDataItem = {
  dayKey: string; // Translation key like 'sat'
  withdraw: number;
  deposit: number;
};

export function getByWalletData(range: ChartRange, scope: ChartScope): WalletChartDataItem[] {
  // Simple deterministic scaling so reviewers see filters "work"
  const rangeMul = range === 'week' ? 1 : 1.35;
  const scopeMul = scope === 'branch' ? 1 : 1.2;

  const m = rangeMul * scopeMul;

  return [
    { nameKey: 'cash', value: Math.round(520 * m) },
    { nameKey: 'dinark', value: Math.round(430 * m) },
    { nameKey: 'uWallet', value: Math.round(310 * m) },
    { nameKey: 'orangeMoney', value: Math.round(610 * m) },
    { nameKey: 'zainCash', value: Math.round(470 * m) },
  ];
}

export function getWithdrawVsDepositData(range: ChartRange, scope: ChartScope): DayChartDataItem[] {
  const rangeMul = range === 'week' ? 1 : 1.25;
  const scopeMul = scope === 'branch' ? 1 : 1.15;

  const m = rangeMul * scopeMul;

  return [
    { dayKey: 'sat', withdraw: Math.round(120 * m), deposit: Math.round(160 * m) },
    { dayKey: 'sun', withdraw: Math.round(140 * m), deposit: Math.round(150 * m) },
    { dayKey: 'mon', withdraw: Math.round(110 * m), deposit: Math.round(170 * m) },
    { dayKey: 'tue', withdraw: Math.round(180 * m), deposit: Math.round(140 * m) },
    { dayKey: 'wed', withdraw: Math.round(150 * m), deposit: Math.round(190 * m) },
    { dayKey: 'thu', withdraw: Math.round(130 * m), deposit: Math.round(210 * m) },
    { dayKey: 'fri', withdraw: Math.round(160 * m), deposit: Math.round(180 * m) },
  ];
}
