var express = require('express');
var router = express.Router();
const usersRouter = require('./users');
const urlsRouter = require('./urls');
const storesRouter = require('./stores');
const User = require('../model/User');

router.get('/home', (req, res) => {
  res.render('home', { err: '', msg: '' });
});
router.use('/users', usersRouter);
router.use('/urls', urlsRouter);
router.use('/stores', storesRouter);

module.exports = router;
