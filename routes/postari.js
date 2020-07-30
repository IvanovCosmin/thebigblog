//postari

let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/:titluPostare', function(req, res, next) {
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({titlu: titluPostare}, function(err, postare){
    if(postare.length === 0)
      res.sendStatus(404);
    else{
      let titlu = postare[0].titlu;
      let continut = postare[0].continut;
      let autori = postare[0].autori;
      let tags = postare[0].tags;
      res.render('postare', {titluPostare: titluPostare, titlu: titlu, continut: continut, autori: autori, tags: tags});
    } 
  });
});


router.post('/:titluPostare/editeaza', function(req, res, next) {
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({titlu: titluPostare}, function(err, postare){
    if(postare.length === 0)
      res.sendStatus(404);
    else{
      let titlu = req.body.titlu;
      let continut = req.body.continut;
      let autori = req.body.autori.split(" ");
      let tags = req.body.tags.split(" ");
      DB.getPostareModel().findOneAndUpdate({titlu: titluPostare}, {titlu: titlu, continut: continut, autori: autori, tags: tags}, {new: true}, function(err, postareNoua){console.log(postareNoua);}); 
    } 
  });
});

router.post('/:titluPostare/sterge', function(req, res, next){
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({titlu: titluPostare}, function(err, postare){
    if(postare.length === 0)
      res.sendStatus(404);
  });
  DB.getPostareModel().findOneAndDelete({titlu: titluPostare}, function(err, postareStearsa){console.log(postareStearsa);});  
});

module.exports = router;
