// Sync object
/** @type {import('@jest/types').Config.InitialOptions} */
const config = {
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ]
};

module.exports = config;
