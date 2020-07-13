//postare noua

let express = require('express');
const DB = require("../database");
const { post } = require('../app');

let router = express.Router();


var postari = [];
var postare;

router.get('/', function(req, res, next) {
  res.render('postare');
});


// Tank.create({ size: 'small' }, function (err, small) {
//   if (err) return handleError(err);
//   // saved!
// });

router.post('/', function(req, res, next) {
  postare = req.body;
  console.log(postare);


  DB.getPostareModel().create({
      titlu: postare.titlu,
      continut: postare.descriere,
      autor: postare.autor
    },
      (err, data) => {
        if(err) console.log(err);  
      });

  res.render('confirmare');
});

module.exports = router;
