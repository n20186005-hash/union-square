import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['zh', 'en'],
  defaultLocale: 'zh',
  localePrefix: {
    mode: 'as-needed',
  },
  pathnames: {
    '/': '/',
    '/privacy-policy': '/privacy-policy',
    '/terms-of-service': '/terms-of-service',
    '/cookie-settings': '/cookie-settings',
    '/letnapark': {
      zh: '/letnapark',
      en: '/letnapark',
    },
    '/sigismunds-column': {
      zh: '/sigismunds-column',
      en: '/sigismunds-column',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
