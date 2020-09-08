let express = require('express');
let router = express.Router();
const DB = require('../database');

router.get('/:titluPostare', function(req, res, next) {
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({titlu: titluPostare}, function(err, postare){
    if(postare.length === 0)
      res.sendStatus(404);
    else
    {
        let titlu = postare[0].titlu;
        let continut = postare[0].continut;
        let autori = postare[0].autori;
        let tags = postare[0].tags;
        let autor = true;
        let numeUtilizator = req.session.numeUtilizator;
        if(!postare[0].autori.includes(numeUtilizator))
          autor = false;
        res.render('postare', {titluPostare: titluPostare, titlu: titlu, continut: continut,
        autori: autori, tags: tags, autor: autor});
    }
  });
});


router.post('/:titluPostare/editeaza', function(req, res, next) {
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().find({titlu: titluPostare}, function(err, postare){
    let titlu = req.body.titlu;
    let continut = req.body.continut;
    let autori = req.body.autori.split(" ");
    let tags = req.body.tags.split(" ");
    DB.getPostareModel().findOneAndUpdate({titlu: titluPostare}, {titlu: titlu, continut: continut, autori: autori, tags: tags}, {new: true}, function(err, postareNoua){}); 
    } 
  );
});

router.post('/:titluPostare/sterge', function(req, res, next){
  let titluPostare = req.params.titluPostare;
  DB.getPostareModel().findOneAndDelete({titlu: titluPostare}, function(err, postareStearsa){});  
});

module.exports = router;
