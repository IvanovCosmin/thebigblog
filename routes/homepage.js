let express = require('express');
let router = express.Router();
const DB = require('../database');


router.get('/', function(req, res, next){
  let bazaDeDate;
  DB.getPostareModel().find({}, function (err, postari) {
    bazaDeDate = postari;
    let numeUtilizator = req.session.numeUtilizator;
    let logat;
    if(numeUtilizator)
      logat = true;
    else
      logat = false;
    res.render('homepage', {postari: bazaDeDate, logat: logat});
  });
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

router.post('/logout', function(req, res, next){
  req.session.destroy(function(err){});
  res.clearCookie("sid");
  res.redirect('/login');
})
module.exports = router;
