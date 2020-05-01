var express = require('express');
var router = express.Router();

/* GET hello page. */
router.get('/', function(req, res, next) {
  res.render('hello', { title: 'Hello' });
});

module.exports = router;
