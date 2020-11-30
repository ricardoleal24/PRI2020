var express = require('express');
var router = express.Router();

const Aluno = require('../controllers/aluno')


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Turma PRI de 2020' });
});


router.get('/alunos', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Aluno.listar()
    .then(dados => res.render('alunos', {lista: dados}))
    .catch(e => res.render('error', {error: e}))
    //res.render('index', { title: 'Turma PRI de 2020' });
});


router.get('/alunos/:id', (req,res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Aluno.consultar(req.params.id)
    .then(dados=> res.render('aluno', {aluno: dados}))
    .catch(e => res.render('error', {error: e}))
})


router.post('/alunos/registar', (req, res) => {
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  var al = {
      Número: req.body.Número,
      Nome: req.body.Nome,
      Git: req.body.Git
  }
  Aluno.inserir(al)
      .then(dados => res.redirect('/alunos'))
      .catch(e => res.render('error', {error: e}))
})

/*
router.post('/alunos/:id', (req,res) =>{
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);

})
*/

router.delete('/alunos/:id', (req,res) =>{
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Aluno.remover(req.params.id)
    .then(res => res.redirect('/alunos'))
    .catch(e => res.render('error', {error: e}))
})

router.get('/alunos/editar/:id', (req,res) =>{
  console.log('Info do pedido req.body: '+ JSON.stringify(req.body) + ' req.param.id: '+req.params.id);
  Aluno.consultar(req.params.id)
    .then(dados=> res.render('editar', {aluno: dados}))
    .catch(e => res.render('error', {error: e}))
})
module.exports = router;
