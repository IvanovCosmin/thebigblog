//login

let express = require('express');
let router = express.Router();
const DB = require('../database');
const bcrypt = require('bcrypt');

router.get('/', function(req, res, next) {
  res.render('login');
})

router.get('/contnou', function(req, res, next){
  res.render('cont nou');
})

router.post('/contnou',async function(req, res, next){
  let numeUtilizator = req.body.numeUtilizator;
  let parola = req.body.parola;
  parola = await bcrypt.hash(parola, 10);
  DB.getLoginModel().create({
    numeUtilizator: numeUtilizator,
    parola: parola,
    autor: false
  },
    (err, data) => {
      if(err) console.log(err);  
    });
  res.render('aprobare');
})

router.post('/', function(req, res, next){
  let numeUtilizator = req.body.numeUtilizator;
  let parola = req.body.parola;
  DB.getLoginModel().find({numeUtilizator: numeUtilizator}, async function(err, numeUtilizatorLogat){
    if(numeUtilizatorLogat.length == 0)
      console.log("logare esuata");
    else
      if(await bcrypt.compare(parola, numeUtilizatorLogat[0].parola))
        console.log("te-ai logat");
      else
        console.log("logare esuata");
  })
})

module.exports = router;
