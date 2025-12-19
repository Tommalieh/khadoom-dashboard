import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import PageContainer from '@/components/layout/PageContainer';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='min-h-dvh flex bg-background text-foreground'>
      <Sidebar />
      <div className='flex min-w-0 flex-1 flex-col'>
        <Header />
        <PageContainer>{children}</PageContainer>
      </div>
    </div>
  );
}
