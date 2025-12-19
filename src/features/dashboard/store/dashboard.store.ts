import { create } from 'zustand';

export type WalletKey = 'cash' | 'dinark' | 'u-wallet' | 'orange-money' | 'zain-cash';

export type WalletKpi = {
  key: WalletKey;
  label: string; // Arabic label shown in UI
  balance: number; // main number
  deltaPct: number; // +/- percent vs last period
  updatedMinutes: number; // minutes since last update
};

export type ChartRange = 'week' | 'last';
export type ChartScope = 'branch' | 'all';
export type ChartTab = 'byWallet' | 'withdrawVsDeposit';

type DashboardState = {
  selectedWallet: WalletKey | null;
  setSelectedWallet: (k: WalletKey | null) => void;

  kpis: WalletKpi[];
  setKpis: (kpis: WalletKpi[]) => void;

  chartTab: ChartTab;
  setChartTab: (t: ChartTab) => void;

  chartRange: ChartRange;
  setChartRange: (r: ChartRange) => void;

  chartScope: ChartScope;
  setChartScope: (s: ChartScope) => void;

  isLoading: boolean;
  setIsLoading: (v: boolean) => void;
};

export const useDashboardStore = create<DashboardState>((set) => ({
  selectedWallet: null,
  setSelectedWallet: (k) => set({ selectedWallet: k }),

  chartTab: 'withdrawVsDeposit',
  setChartTab: (t) => set({ chartTab: t }),

  chartRange: 'week',
  setChartRange: (r) => set({ chartRange: r }),

  chartScope: 'branch',
  setChartScope: (s) => set({ chartScope: s }),

  isLoading: true,
  setIsLoading: (v) => set({ isLoading: v }),

  // Mock values (replace later with API)
  kpis: [
    { key: 'cash', label: 'cash', balance: 12850, deltaPct: 4.2, updatedMinutes: 5 },
    { key: 'dinark', label: 'dinark', balance: 9840, deltaPct: -1.3, updatedMinutes: 12 },
    { key: 'u-wallet', label: 'u-wallet', balance: 6240, deltaPct: 2.1, updatedMinutes: 3 },
    { key: 'orange-money', label: 'orange-money', balance: 15220, deltaPct: 6.8, updatedMinutes: 1 },
    { key: 'zain-cash', label: 'zain-cash', balance: 11030, deltaPct: 0.6, updatedMinutes: 8 },
  ],
  setKpis: (kpis) => set({ kpis }),
}));
