const express = require('express');
const path = require('path');

const { VIEWS } = require('../utils/path');

const router = express.Router();

router.use('/', (req, res) => {
  res.status(404).sendFile(path.join(VIEWS, 'not-found.html'));
});

module.exports = router;
