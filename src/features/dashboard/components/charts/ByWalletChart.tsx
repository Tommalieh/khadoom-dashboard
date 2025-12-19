'use client';

import { useMemo } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { getByWalletData } from '@/features/dashboard/data/charts';
import { useDashboardStore } from '@/features/dashboard/store/dashboard.store';

export default function ByWalletChart() {
  const range = useDashboardStore((s) => s.chartRange);
  const scope = useDashboardStore((s) => s.chartScope);
  const locale = useLocale();
  const isRTL = locale === 'ar';
  const tKpi = useTranslations('kpi');
  const tCharts = useTranslations('charts');

  const rawData = getByWalletData(range, scope);

  // Transform data to include translated names
  const data = useMemo(() => {
    return rawData.map((item) => ({
      name: tKpi(item.nameKey),
      value: item.value,
    }));
  }, [rawData, tKpi]);

  return (
    <div className='h-56'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data} margin={{ top: 8, right: isRTL ? 40 : 0, left: isRTL ? 0 : 40, bottom: 0 }}>
          <CartesianGrid stroke='hsl(var(--border))' strokeDasharray='4 4' />
          <XAxis
            dataKey='name'
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
            formatter={(value: number | undefined) => [value ?? 0, tCharts('value')]}
          />
          <Bar dataKey='value' radius={[12, 12, 0, 0]} fill='hsl(var(--chart-1))' />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
