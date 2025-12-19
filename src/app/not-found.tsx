import Link from 'next/link';
import { fontArabic, fontEnglishBody, fontEnglishHeading } from '@/lib/fonts';

// This is the global not-found page for routes that don't match any locale
// It doesn't have access to i18n, so we use hardcoded text and redirect to /ar/dashboard
export default function GlobalNotFound() {
  return (
    <html lang='ar' dir='rtl'>
      <body
        className={`
          ${fontArabic.variable}
          ${fontEnglishHeading.variable}
          ${fontEnglishBody.variable}
          min-h-dvh bg-background text-foreground antialiased
        `}
      >
        <div className='flex min-h-dvh items-center justify-center bg-background px-4 py-8'>
          <div className='w-full max-w-md text-center'>
            {/* 404 Code */}
            <div className='font-en-heading text-8xl font-bold text-primary/20'>404</div>

            {/* Title */}
            <h1 className='mt-4 text-2xl font-semibold tracking-tight'>الصفحة غير موجودة</h1>

            {/* Subtitle */}
            <p className='mt-2 text-sm text-muted-foreground'>عذراً، لم نتمكن من العثور على الصفحة التي تبحث عنها</p>

            {/* Back button */}
            <div className='mt-8 flex justify-center'>
              <Link
                href='/ar/dashboard'
                className='inline-flex h-10 items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90'
              >
                العودة إلى لوحة التحكم
              </Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
