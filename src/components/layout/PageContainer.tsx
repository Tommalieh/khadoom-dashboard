export default function PageContainer({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex-1 overflow-auto'>
      <div className='mx-auto w-full max-w-6xl px-6 py-5'>{children}</div>
    </main>
  );
}
