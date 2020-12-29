const LINKS = require('../data/links');

module.exports.getNotFound = (req, res, next) => {
  res.render('pages/404', {
    page: {
      title: 'Page not found',
      navigation: LINKS,
      path: null,
    },
  });
}
