const express = require('express');
const { body } = require('express-validator/check');
const feedController = require('../controllers/feed');

const router = express.Router();

router.get('/posts', feedController.readPosts);
router.post('/posts', [
  body('title').trim().isLength({ min: 5 }),
  body('content').trim().isLength({ min: 5 }),
], feedController.createPost);

module.exports = router;
