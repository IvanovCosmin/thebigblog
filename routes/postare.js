//postare noua

var express = require('express');
var router = express.Router();

var postari = [];
var postare;

router.get('/', function(req, res, next) {
  res.render('postare');
});


router.post('/', function(req, res, next) {
  postare = req.body;
  postari.push(postare);
  console.log(postari);
  res.render('confirmare');
});

module.exports = router;
