const path = require('path');
const express = require('express');
const ROOT_DIR = require('../util/root-dir');

const serveStaticFiles = express.static(path.join(ROOT_DIR, 'public'));

module.exports = serveStaticFiles;
