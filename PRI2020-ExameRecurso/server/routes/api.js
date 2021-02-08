var express = require('express');
var router = express.Router();

const Team = require('../controllers/team')

//Devolve a lista de equipes, com os campos: _id, 
// team, pitch1, pitch2, techPitch, businessReport, techReport, e nmembers (número de membros da equipe);

router.get('/', function(req, res) {
  Team.listarAll()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});


router.get('/teams', function(req, res) {
  Team.listar()
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.get('/teams/:id', function(req, res) {
  Team.consultar(req.params.id)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});
// x
router.get('/teams/:id/members/:idMember', function(req, res) {
  Team.consultarT(req.params.id, req.params.idMember)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/teams', function(req, res) {
  Team.inserir(req.body)
    .then(dados => res.status(200).jsonp(dados) )
    .catch(e => res.status(500).jsonp({error: e}))
});

router.post('/teams/:id/members', function(req, res){
  Team.inserirNM(req.params.id, req.body)
    .then(dados => res.status(201).jsonp({dados: dados}))
    .catch(e => res.status(500).jsonp({error: e}))
})

router.delete('/teams/:id', function(req, res) {
  Team.remover(req.params.id)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

router.delete('/teams/:id/members/:idMember', function(req, res) {
  Team.removerTM(req.params.idC, req.params.idP)
    .then(dados => res.status(200).jsonp(dados))
    .catch(e => res.status(500).jsonp({error: e}))
});

module.exports = router;
