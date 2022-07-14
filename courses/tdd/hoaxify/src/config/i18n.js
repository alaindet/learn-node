module.exports = {
  fallbackLng: 'en',
  supportedLngs: ['en', 'it'],
  lng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: './locales/{{lng}}.json',
  },
  detection: {
    lookupHeader: 'accept-language',
  },
};
