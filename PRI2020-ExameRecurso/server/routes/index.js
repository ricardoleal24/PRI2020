var express = require('express');
var router = express.Router();

const Team = require('../controllers/team')

router.get('/', function(req, res) {
    Team.listar()
      .then(dados => res.render('index', {dados}) )
      .catch(e => res.status(500).jsonp({error: e}))
  });
  
  
  router.get('/team/:id', function(req, res) {
    Team.consultar(req.params.id)
    .then(dados => res.render('teams', {dados}) )
    .catch(e => res.status(500).jsonp({error: e}))
  });


module.exports = router;
