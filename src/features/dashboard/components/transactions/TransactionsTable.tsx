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
    <Card className='rounded-2xl border bg-white p-5'>
      <div className='border-b px-5 py-4'>
        <h3 className='text-lg font-semibold'>{t('title')}</h3>
        <p className='text-sm text-muted-foreground'>{t('subtitle')}</p>
      </div>

      <div className='overflow-x-auto'>
        <table className='w-full text-sm'>
          <thead className='bg-muted/60 backdrop-blur'>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className='px-5 py-3 text-start font-medium cursor-pointer select-none'
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
                  <td key={cell.id} className='px-5 py-3'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
