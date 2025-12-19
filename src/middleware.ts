import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  locales: ['ar', 'en'],
  defaultLocale: 'ar',
  localePrefix: 'always', // URLs always include /ar or /en
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
