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
    '/union-square-timisoara': {
      zh: '/union-square-timisoara',
      en: '/union-square-timisoara',
    },
  },
});

export type Locale = (typeof routing.locales)[number];
