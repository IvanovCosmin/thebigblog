//utilizatori

let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/:numeUtilizator', function(req, res, next) {
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({numeUtilizator:numeUtilizator}, function(err, utilizator){
    if(utilizator.length === 0) 
      res.sendStatus(404);
    else
        console.log(utilizator);
  })
  DB.getPostareModel().find({autor: numeUtilizator}, function(err, postari){
    res.render('utilizator', {postari: postari}); 
  })
})

router.get('/:numeUtilizator/editeazaprofil', function(req, res, next){
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({numeUtilizator:numeUtilizator}, function(err, utilizator){
    if(utilizator.length === 0) 
      res.sendStatus(404);
  })
  res.render('modifica profil', {numeUtilizator: numeUtilizator});
})

router.post('/:numeUtilizator/editeazaprofil', function(req, res, next){
  let numeUtilizator = req.params.numeUtilizator;
  let numeUtilizatorNou = req.body.numeUtilizatorNou;
  DB.getLoginModel().findOneAndUpdate({numeUtilizator: numeUtilizator},{numeUtilizator: numeUtilizatorNou}, {new: true}, function(err, utilizatorNou) {console.log(utilizatorNou)});
})

router.get('/:numeUtilizator/postarenoua', function(req, res, next){
  let numeUtilizator = req.params.numeUtilizator;
  DB.getLoginModel().find({numeUtilizator:numeUtilizator}, function(err, utilizator){
    if(utilizator.length === 0)
      res.sendStatus(404);
  })
  res.render('postare noua', {numeUtilizator: numeUtilizator});
})

router.post('/:numeUtilizator/postarenoua', function(req, res, next){
  let titlu = req.body.titlu;
  let continut = req.body.continut;
  let autor2 = req.params.numeUtilizator;
  let autori = req.body.autori.split(" ");
  if(!autori.includes(autor2))
    autori.push(autor2);
  let tags = req.body.tags;
  DB.getPostareModel().create({titlu: titlu, continut: continut, autori: autori, tags:tags}, function(err, postare){console.log(postare)});
})


module.exports = router;