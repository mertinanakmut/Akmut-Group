
export const i18nConfig = {
  defaultLocale: 'tr',
  locales: ['tr', 'en'],
  localeDetection: true,
  prefixDefault: false,
  // Glossary: These terms will NEVER be translated by the AI
  glossary: [
    'Akmut Group',
    'Akmut Logistics',
    'Akmut Fintech',
    'Akmut Health',
    'Akmut Tech',
    'Akmut Pay'
  ]
} as const;

export type Locale = (typeof i18nConfig)['locales'][number];
