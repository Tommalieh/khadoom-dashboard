import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Khadoom Dashboard',
  description: 'Assignment dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // This layout is only used for the root "/" redirect page
  // The [locale]/layout.tsx handles the actual HTML structure with proper lang/dir
  return children;
}
