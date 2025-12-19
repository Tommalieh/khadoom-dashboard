import { Skeleton } from '@/components/ui/skeleton';

export function KpiStripSkeleton() {
  return (
    <section className='grid gap-4 sm:grid-cols-2 lg:grid-cols-5'>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className='rounded-2xl border bg-card p-4'>
          <div className='flex items-start gap-3'>
            <Skeleton className='h-10 w-10 rounded-2xl' />
            <div className='flex-1'>
              <Skeleton className='h-4 w-24' />
              <div className='mt-3 flex items-center gap-2'>
                <Skeleton className='h-7 w-24' />
                <Skeleton className='h-6 w-12 rounded-full' />
              </div>
              <Skeleton className='mt-3 h-3 w-28' />
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}

export function WalletDetailsSkeleton() {
  return (
    <div className='rounded-2xl border bg-card p-5'>
      <div className='flex items-start gap-4'>
        <Skeleton className='h-11 w-11 rounded-2xl' />
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-5 w-24' />
            <Skeleton className='h-6 w-14 rounded-full' />
          </div>
          <Skeleton className='mt-2 h-4 w-40' />
          <div className='mt-4 grid gap-3 sm:grid-cols-3'>
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className='rounded-2xl bg-muted p-4'>
                <Skeleton className='h-3 w-24' />
                <Skeleton className='mt-2 h-6 w-20' />
              </div>
            ))}
          </div>
          <Skeleton className='mt-4 h-4 w-64' />
        </div>
      </div>
    </div>
  );
}

export function ChartsCardSkeleton() {
  return (
    <div className='rounded-2xl border bg-card p-5'>
      <div className='flex flex-wrap items-start justify-between gap-4'>
        <div>
          <Skeleton className='h-5 w-28' />
          <Skeleton className='mt-2 h-4 w-56' />
        </div>
        <div className='flex gap-2 sm:gap-3'>
          <Skeleton className='h-10 w-24 rounded-2xl sm:h-11 sm:w-40' />
          <Skeleton className='h-10 w-24 rounded-2xl sm:h-11 sm:w-40' />
        </div>
      </div>

      <Skeleton className='mt-5 h-10 w-full max-w-[420px] rounded-2xl sm:h-11' />
      <div className='mt-4 rounded-2xl border bg-background p-4'>
        <div className='flex items-center justify-between'>
          <Skeleton className='h-4 w-44' />
          <Skeleton className='h-4 w-24' />
        </div>
        <Skeleton className='mt-4 h-56 w-full rounded-2xl' />
      </div>
    </div>
  );
}

export function TransactionsTableSkeleton() {
  return (
    <div className='rounded-2xl border bg-card'>
      <div className='border-b px-5 py-4'>
        <Skeleton className='h-5 w-28' />
        <Skeleton className='mt-2 h-4 w-48' />
      </div>

      <div className='p-5 space-y-3'>
        <Skeleton className='h-10 w-full rounded-xl' />
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className='h-12 w-full rounded-xl' />
        ))}
      </div>
    </div>
  );
}
