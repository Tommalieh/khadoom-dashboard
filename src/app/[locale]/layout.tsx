import '@/app/globals.css';
import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { dirForLocale, isLocale } from '@/i18n/routing';
import { redirect } from 'next/navigation';
import { fontArabic, fontEnglishBody, fontEnglishHeading } from '@/lib/fonts';

export const metadata: Metadata = {
  title: 'Khadoom Dashboard',
  description: 'Assignment dashboard',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    redirect('/ar');
  }

  const messages = await getMessages();
  const dir = dirForLocale(locale);

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`
          ${fontArabic.variable}
          ${fontEnglishHeading.variable}
          ${fontEnglishBody.variable}
          min-h-dvh bg-background text-foreground antialiased
        `}
      >
        <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
