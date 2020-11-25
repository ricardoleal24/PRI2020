var http = require('http')
var axios = require('axios')
var fs = require('fs')
var static = require('./static.js')
var {parse} = require('querystring')

// Funções auxilidares
function recuperaInfo(request, callback){
    if(request.headers['content-type'] == 'application/x-www-form-urlencoded'){
        let body = ''
        request.on('data', bloco => {
            body+= bloco.toString()
        })
        request.on('end', ()=>{
            console.log(body)
            callback(parse(body))
        })
    }
}

// POST Confirmation HTML Page Template -------------------------------------
function geraPostConfirm( aluno, d){
    return `
    <html>
    <head>
        <title>POST receipt: ${aluno.id}</title>
        <meta charset="utf-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
    </head>
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>Aluno ${aluno.id} inserido</h1>
            </header>

            <div class="w3-container">
                <p><a href="/alunos/${aluno.id}">Aceda aqui Ã  sua pÃ¡gina."</a></p>
            </div>

            <footer class="w3-container w3-teal">
                <address>Gerado por galuno::PRI2020 em ${d} - [<a href="/">Voltar</a>]</address>
            </footer>
        </div>
    </body>
    </html>
    `
}


function geraPagTarefas(tarefas){
    let pagHTML = `
        <html>
            <head>
                <title>Gestor de Tarefas</title>
                <meta charset="utf-8"/>
                <link rel="icon" href="favicon.png"/>
                <link rel="stylesheet" href="w3.css"/>
            </head>
            <body>
                <div class="w3-container w3-teal">
                    <h2>Nova Tarefa</h2>
                </div>

                <form class="w3-container" action="/tarefas" method="POST">
                    <label class="w3-text-teal"><b>Descrição</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="descricao">
          
                    <label class="w3-text-teal"><b>Responsável</b></label>
                    <input class="w3-input w3-border w3-light-grey" type="text" name="responsavel">

                    <label class="w3-text-teal"><b>Data Limite</b></label>
                    <input type="date" class="w3-input w3-border w3-light-grey" type="text" name="datalim" id="datemin" name="datemin" min="2020-01-01">
                    
                    <input class="w3-btn w3-blue-grey" type="submit" value="Registar"/>
                    <input class="w3-btn w3-blue-grey" type="reset" value="Limpar valores"/> 
                </form>
    
                <hr>

                <div class="w3-container w3-teal">
                    <h2>Lista de Tarefas Pendentes</h2>
                </div>
                <table class="w3-table w3-bordered">    
                    <tr>
                        <th>Data Limite</th>
                        <th>Responsável</th>
                        <th>Descrição</th>
                    </tr>
    `
    tarefas.forEach(tarefa => {
        if(tarefa.estado=="pendente"){
            pagHTML += `
                <tr>
                    <td>${tarefa.datalim}</td>
                    <td>${tarefa.responsavel}</td>
                    <td>${tarefa.descricao}</td>
                    <td>
                        <form action="/tarefas/resolver" method="POST"> <button class="w3-button w3-teal" type="submit" name="tarefa" value="${[tarefa.id,tarefa.descricao,tarefa.responsavel,tarefa.datalim, 'resol']}">+</button></form>
                        <form action="/tarefas/cancelar" method="POST"> <button class="w3-button w3-red" type="submit" name="tarefa" value="${[tarefa.id,tarefa.descricao,tarefa.responsavel,tarefa.datalim, 'cancel']}">x</button></form>
                    </td>
                </tr>
            `
        }
    });

    pagHTML += `
    </table>
    <hr>
    <div class="w3-container w3-teal">
        <h2>Lista de Tarefas Resolvidas/Canceladas</h2>
    </div>
        <table class="w3-table w3-bordered">
                <tr>
                    <th>Data Limite</th>
                    <th>Responsável</th>
                    <th>Descrição</th>
                </tr>
    
    `
    tarefas.forEach(tarefa => {
        if(tarefa.estado=="resolvido"){
            pagHTML += `
                <tr>
                    <td>${tarefa.datalim}</td>
                    <td>${tarefa.responsavel}</td>
                    <td>${tarefa.descricao}</td>
                    <td>
                        <button class="w3-button w3-teal">+</button>
                    </td>
                </tr>
            `
        }
        else if(tarefa.estado=="cancelado"){
            pagHTML += `
                <tr>
                    <td>${tarefa.datalim}</td>
                    <td>${tarefa.responsavel}</td>
                    <td>${tarefa.descricao}</td>
                    <td>
                         <button class="w3-button w3-red">x</button>
                    </td>
            </tr>
        `
        }
    });

    pagHTML += `
            </table>
        </body>
    </html>
   `
   return pagHTML
}


// Criação do servidor
var gtarefas = http.createServer(function (req, res) {
    // Logger: que pedido chegou e quando
    var d = new Date().toISOString().substr(0, 16)
    console.log('Novo Pedido :' + req.method + " " + req.url + " " + d)

    // Tratamento do pedido

    if(static.recursoEstatico(req)){
        static.sirvoRecursoEstatico(req,res)
    }
    else{

    switch(req.method){
        case "GET": 
            if((req.url == "/") || (req.url == "/tarefas") || (req.url == "/tarefas/")){
                axios.get("http://localhost:3000/tarefas?_sort=datalim,responsavel,descricao&_order=asc") //?_sort=responsavel
                    .then(response => {
                        var tarefas = response.data
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(geraPagTarefas(tarefas))
                        res.end()
                    })
                    .catch(function(erro){
                        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                        res.write(erro + "<p>Não foi possível obter a lista tarefas")
                        res.end()
                    })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " " + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        case "POST":
            if(req.url == '/tarefas'){
                recuperaInfo(req, info => {
                    console.log('case POST de tarefa:' + JSON.stringify(info))
                    info.estado = "pendente"
                    axios.post('http://localhost:3000/tarefas', info)
                        .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')                            
                            res.end()
                    })   
                })
            }
            else if(req.url == '/tarefas/resolver'){
                recuperaInfo(req, info => {
                    console.log('pedido + POST:' + JSON.stringify(info))
                    //info.estado = "resolvido"
                    console.log("resolver pedido: tarefa id --------")
                    console.log(info.tarefa['0']) // button name="tarefa" value={[tarefa.id,tarefa.des...]} 
                    var tarefa = info.tarefa.split(',');
                    console.log(tarefa[2])
                    axios.put('http://localhost:3000/tarefas/'+ tarefa[0], { //info.tarefa[0]
                        descricao: tarefa[1],
                        responsavel: tarefa[2],
                        datalim: tarefa[3],
                        estado : 'resolvido'
                    })
                     .then(resp => {
                            
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<h2></h2></p>')
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()

                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')                            
                            res.end()
                    }) 
                })
            }
            else if(req.url == '/tarefas/cancelar'){
                recuperaInfo(req, info => {
                    console.log('cancelar pedido pedido + POST:' + JSON.stringify(info))
                    console.log("tarefa id --------")
                    console.log(info.tarefa['0']) // button name="tarefa" value={[tarefa.id,tarefa.des...]} 
                    var tarefa = info.tarefa.split(',');
                    console.log(tarefa[2])
                    axios.put('http://localhost:3000/tarefas/'+ tarefa[0], { //info.tarefa[0]
                        descricao: tarefa[1],
                        responsavel: tarefa[2],
                        datalim: tarefa[3],
                        estado : 'cancelado'
                    })
                     .then(resp => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p><a href="/">Voltar</a></p>')
                            res.end()
                        })
                        .catch(erro => {
                            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write('<p>Erro no POST: ' + erro + '</p>')                            
                            res.end()
                    }) 
                })
            }
            else{
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p> POST" + req.url + " não suportado neste serviço.</p>")
                res.end()
            }
            break
        default: 
            res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>" + req.method + " não suportado neste serviço.</p>")
            res.end();
    }
}
})


gtarefas.listen(7778)
console.log('Servidor à escuta na porta 7778...')


//<button class="w3-button w3-red">x</button>

/*
const axios= require('axios');

axios.put('http://localhost:3000/instrumentos/X1', {
    "#text": "Kazoo"
}).then(resp => {
    console.log(resp.data);
}).catch(error => {
    console.log('Erro: ' + error);
});
*/