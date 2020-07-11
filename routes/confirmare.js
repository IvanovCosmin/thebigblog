//confirmare pt primirea postarii

var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('confirmare');
});

module.exports = router;
