import { LayoutDashboard, Search, Banknote, Wallet, FileText, LogOut } from 'lucide-react';

export type NavItem = {
  key: string;
  labelKey: string; // Translation key for the label
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

export const dashboardNav: NavItem[] = [
  {
    key: 'customer-lookup',
    labelKey: 'nav.customer',
    href: '/dashboard/customer',
    icon: Search,
  },
  {
    key: 'cash',
    labelKey: 'nav.cash',
    href: '/dashboard/cash',
    icon: Banknote,
  },
  {
    key: 'zain-cash',
    labelKey: 'nav.zainCash',
    href: '/dashboard/zain-cash',
    icon: Wallet,
  },
  {
    key: 'orange-money',
    labelKey: 'nav.orangeMoney',
    href: '/dashboard/orange-money',
    icon: Wallet,
  },
  {
    key: 'u-wallet',
    labelKey: 'nav.uWallet',
    href: '/dashboard/u-wallet',
    icon: Wallet,
  },
  {
    key: 'dinark',
    labelKey: 'nav.dinark',
    href: '/dashboard/dinark',
    icon: Wallet,
  },
  {
    key: 'reports',
    labelKey: 'nav.reports',
    href: '/dashboard/reports',
    icon: FileText,
  },
];

export const dashboardHome = {
  key: 'dashboard',
  labelKey: 'nav.dashboard',
  href: '/dashboard',
  icon: LayoutDashboard,
};

export const dashboardLogout = {
  key: 'logout',
  labelKey: 'nav.logout',
  href: '/logout',
  icon: LogOut,
};
