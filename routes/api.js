let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/postari', function (req, res, next) {
  let bazaDeDate;
  DB.getPostareModel().find({}, function (err, postari) {
    bazaDeDate = postari;
    res.send(bazaDeDate);
  });
});

router.get('/:numeUtilizator/inasteptare', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({ numeUtilizator: numeUtilizator }, function (err, utilizator) {
    if (utilizator.length === 0)
      res.sendStatus(404);
    else {
      if (req.session.numeUtilizator != numeUtilizator)
        res.redirect('/');
      else {
        DB.getPostareModel().find({ autori: numeUtilizator }, function (err, postari) {
          let inAsteptare;
          DB.getLoginModel().find({ autor: false }, function (err, inAsteptare) {
            inAsteptare = inAsteptare;
            res.send(inAsteptare);
          })
        })
      }
    }
  })
})

router.get('/:numeUtilizator/postari', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({ numeUtilizator: numeUtilizator }, function (err, utilizator) {
    if (utilizator.length === 0)
      res.sendStatus(404);
    else {
      if (req.session.numeUtilizator != numeUtilizator)
        res.redirect('/');
      else {
        DB.getPostareModel().find({ autori: numeUtilizator }, function (err, postari) {
          res.send(postari);
        })
      }
    }
  })
})

module.exports = router;
