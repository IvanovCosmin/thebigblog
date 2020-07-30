//homepage

let express = require('express');
let router = express.Router();
const DB = require('../database');

let bazaDeDate;

//tot db
DB.getPostareModel().find({}, function (err, postari) {
  bazaDeDate = postari;
});

router.get('/', function(req, res, next) {
  res.render('homepage', {postari: bazaDeDate});
});

//cautare
router.post('/', function(req, res, next){
  let cautare = req.body.cautare;
  if(cautare === "")
    console.log(bazaDeDate);
  else{
    let cautareDupa = req.body.cautareDupa;
    switch(cautareDupa){
      case "titlu":
        DB.getPostareModel().find({titlu: cautare}, function (err, bazaDeDateFiltrata) {console.log(bazaDeDateFiltrata)});
        break;
      case "continut":
        DB.getPostareModel().find({continut: cautare}, function (err, bazaDeDateFiltrata) {console.log(bazaDeDateFiltrata)});
        break;
      case "autor":
        DB.getPostareModel().find({autor: cautare}, function (err, bazaDeDateFiltrata) {console.log(bazaDeDateFiltrata)});
        break;
      case "tag":
        DB.getPostareModel().find({tags: cautare}, function (err, bazaDeDateFiltrata) {console.log(bazaDeDateFiltrata)});
  }
  }

});

module.exports = router;
