let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/', function (req, res, next) {
  let bazaDeDate;
  DB.getPostareModel().find({}, function (err, postari) {
    bazaDeDate = postari;
    res.send(bazaDeDate);
  });
});

router.get('/:titluPostare', function (req, res, next) {
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({ titlu: titluPostare }, function (err, postare_temp) {
    if (postare_temp.length === 0)
      res.sendStatus(404);
    else {
      let titlu = postare_temp[0].titlu;
      let continut = postare_temp[0].continut;
      let autori = postare_temp[0].autori;
      let tags = postare_temp[0].tags;
      let esteAutorPostare = true;
      let numeUtilizator = req.session.numeUtilizator;
      if (!postare_temp[0].autori.includes(numeUtilizator))
        esteAutorPostare = false;
      let postare = { titlu, continut, autori, tags, esteAutorPostare };
      res.send(postare);
    }
  });
});


router.post('/:titluPostare/editeaza', function (req, res, next) {
  let numeUtilizator = req.session.numeUtilizator;
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({ titlu: titluPostare }, function (err, postare) {
    if (!postare[0].autori.includes(numeUtilizator))
      res.redirect('/');
    else {
      let titlu = req.body.titlu;
      let continut = req.body.continut;
      let autori = req.body.autori.split(" ");
      let tags = req.body.tags.split(" ");
      DB.getPostareModel().findOneAndUpdate({ titlu: titluPostare }, { titlu: titlu, continut: continut, autori: autori, tags: tags }, { new: true }, function (err, postareNoua) { });
    }
  }
  );
});

router.post('/:titluPostare/sterge', function (req, res, next) {
  let titluPostare = req.params.titluPostare;
  let numeUtilizator = req.session.numeUtilizator
  DB.getPostareModel().find({ titlu: titluPostare }, function (err, postare) {
    if (!postare[0].autori.includes(numeUtilizator))
      res.redirect('/');
    else
      DB.getPostareModel().findOneAndDelete({ titlu: titluPostare }, function (err, postareStearsa) { });
  })
});

module.exports = router;
