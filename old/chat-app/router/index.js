const router = require('express').Router();

const authRouter = require('./auth.router');

router.get('/', (req, res) => {
  return res.status(200).send({
    message: 'Oki doki!',
  });
});

router.use('/', authRouter);

module.exports = router;
