'use client';

import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, SortingState } from '@tanstack/react-table';
import { useTranslations } from 'next-intl';
import { useColumns } from './columns';
import { transactions } from '@/features/dashboard/data/transactions';
import { useState } from 'react';
import { Card } from '@/components/ui/card';

export default function TransactionsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const t = useTranslations('table');
  const columns = useColumns();

  const table = useReactTable({
    data: transactions,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Card className='rounded-2xl border bg-card p-4 sm:p-5'>
      <div className='border-b px-3 py-3 sm:px-5 sm:py-4'>
        <h3 className='text-base font-semibold sm:text-lg'>{t('title')}</h3>
        <p className='text-xs text-muted-foreground sm:text-sm'>{t('subtitle')}</p>
      </div>

      <div className='relative'>
        <div className='overflow-x-auto'>
          <table className='w-full text-xs sm:text-sm'>
            <thead className='bg-muted/60 backdrop-blur'>
              {table.getHeaderGroups().map((hg) => (
                <tr key={hg.id}>
                  {hg.headers.map((header) => (
                    <th
                      key={header.id}
                      className='cursor-pointer select-none whitespace-nowrap px-3 py-2 text-start font-medium sm:px-5 sm:py-3'
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className='border-t transition-colors hover:bg-muted/40'>
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className='whitespace-nowrap px-3 py-2 sm:px-5 sm:py-3'>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Scroll indicator for mobile */}
        <div className='pointer-events-none absolute inset-y-0 end-0 w-6 bg-gradient-to-l from-card sm:hidden rtl:rotate-180' />
      </div>
    </Card>
  );
}
