'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { getWithdrawVsDepositData } from '@/features/dashboard/data/charts';
import { useDashboardStore } from '@/features/dashboard/store/dashboard.store';

export default function WithdrawVsDepositChart() {
  const range = useDashboardStore((s) => s.chartRange);
  const scope = useDashboardStore((s) => s.chartScope);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const tDays = useTranslations('days');
  const tCharts = useTranslations('charts');

  const rawData = getWithdrawVsDepositData(range, scope);

  // Transform data to include translated day names
  const data = useMemo(() => {
    return rawData.map((item) => ({
      day: tDays(item.dayKey),
      withdraw: item.withdraw,
      deposit: item.deposit,
    }));
  }, [rawData, tDays]);

  return (
    <div className='h-56'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
          <CartesianGrid stroke='hsl(var(--border))' strokeDasharray='4 4' />
          <XAxis
            dataKey='day'
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
            reversed={isRTL}
          />
          <YAxis
            orientation={isRTL ? 'right' : 'left'}
            tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12, textAnchor: 'end' }}
            axisLine={{ stroke: 'hsl(var(--border))' }}
            tickLine={{ stroke: 'hsl(var(--border))' }}
          />
          <Tooltip
            cursor={{ fill: 'hsl(var(--secondary))', opacity: 0.15 }}
            contentStyle={{
              background: 'hsl(var(--card))',
              border: '1px solid hsl(var(--border))',
              borderRadius: 12,
            }}
            labelStyle={{ color: 'hsl(var(--foreground))' }}
          />
          <Legend wrapperStyle={{ color: 'hsl(var(--muted-foreground))', fontSize: 12 }} />
          <Bar dataKey='withdraw' name={tCharts('withdraw')} fill='hsl(var(--chart-3))' radius={[10, 10, 0, 0]} />
          <Bar dataKey='deposit' name={tCharts('deposit')} fill='hsl(var(--chart-2))' radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
