import { notFound } from 'next/navigation';

// This catch-all route handles any unknown paths under /[locale]/dashboard/...
// It triggers the not-found page
export default function CatchAllPage() {
  notFound();
}
