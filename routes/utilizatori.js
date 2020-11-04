let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/:numeUtilizator', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({ numeUtilizator: numeUtilizator }, function (err, utilizator) {
    if (utilizator.length === 0)
      res.sendStatus(404);
    else {
      if (req.session.numeUtilizator !== numeUtilizator)
        res.redirect('/');
      else {
        DB.getPostareModel().find({ autori: numeUtilizator }, function (err, postari) {
          DB.getLoginModel().find({ autor: false }, function (err, inAsteptare) {
            res.render('utilizator', { postari: postari, inAsteptare: inAsteptare, numeUtilizator: numeUtilizator });
          })
        })
      }
    }
  })
})

router.get('/:numeUtilizator/editeazaprofil', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({ numeUtilizator: numeUtilizator }, function (err, utilizator) {
    if (utilizator.length === 0)
      res.sendStatus(404);
    else if (req.session.numeUtilizator != numeUtilizator)
      res.redirect('/');
    res.render('modifica profil', { numeUtilizator: numeUtilizator });
  })
})

router.post('/:numeUtilizator/editeazaprofil', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  let numeUtilizatorNou = req.body.numeUtilizatorNou;
  if (req.session.numeUtilizator !== numeUtilizator)
    res.redirect('/');
  else
    DB.getLoginModel().findOneAndUpdate({ numeUtilizator: numeUtilizator }, { numeUtilizator: numeUtilizatorNou }, { new: true }, function (err, utilizatorNou) { });
})

router.get('/:numeUtilizator/postarenoua', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({ numeUtilizator: numeUtilizator }, function (err, utilizator) {
    if (utilizator.length === 0)
      res.sendStatus(404);
    else if (req.session.numeUtilizator != numeUtilizator)
      res.redirect('/');
    res.render('postare noua', { numeUtilizator: numeUtilizator });
  })
})

router.post('/:numeUtilizator/postarenoua', function (req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  if (req.session.numeUtilizator !== numeUtilizator)
    res.redirect('/');
  else {
    let titlu = req.body.titlu;
    let continut = req.body.continut;
    let autor2 = req.params.numeUtilizator;
    let autori = req.body.autori.split(" ");
    if (!autori.includes(autor2))
      autori.push(autor2);
    let tags = req.body.tags.split(" ");
    DB.getPostareModel().create({ titlu: titlu, continut: continut, autori: autori, tags: tags }, function (err, postare) { });
  }

})

router.post('/:numeUtilizator/aprobare', function (req, res, next) {
  let contAprobat = req.body.contAprobat;
  let numeUtilizator = req.params.numeUtilizator;
  if (req.session.numeUtilizator !== numeUtilizator)
    res.redirect('/');
  else
    DB.getLoginModel().findOneAndUpdate({ numeUtilizator: contAprobat }, { autor: true }, function (err, contAprobat) { });
})

module.exports = router;