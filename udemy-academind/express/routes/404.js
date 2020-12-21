const express = require('express');
const path = require('path');

const { VIEWS_DIR } = require('../utils/path');

const router = express.Router();

router.use('/', (req, res) => {
  res.status(404).sendFile(path.join(VIEWS_DIR, 'not-found.html'));
});

module.exports = router;
