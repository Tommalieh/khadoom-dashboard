export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex-1 overflow-auto'>
      <div className='mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-5'>{children}</div>
    </main>
  );
}
