module.exports = {
  fallback: 'en',
  lng: 'en',
  ns: ['translation'],
  defaultNS: 'translation',
  backend: {
    loadPath: './locales/{{lng}}.json',
  },
  detection: {
    lookupHaeder: 'accept-language',
  },
};
