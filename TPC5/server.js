/*
    Servidor node localhost:3001
     pedidos:
      -index.html
            Lista de alunos (link para o json-server)
                - Responde com uma lista HTML com a lista de alunos
                - Cada item é um link para o nosso servidor solicitando a info do aluno

            Lista de cursos (link para o json-server)

            Lista de instrumentos (link para o json-server)
*/

const http = require('http');
const axios = require('axios');

const PORT=3001;

var server = http.createServer(function(req, res) {
    console.log('request method: ' + req.method + ' request url: ' + req.url);
    
    var url = req.url.split('/');
    //console.log( 'url1 ' + url[1] + ' url2 ' + url[2] + ' url3 ' + url[3]);
    if(req.method == 'GET'){
        if(req.url == '/'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })    
            res.write('<h2>Escola de Música</h2>');
            res.write('<ul>');
            res.write('<li><a href=\"http://localhost:3001/alunos\">Lista de alunos</a></li>');
            res.write('<li><a href=\"http://localhost:3001/cursos\">Lista de cursos</a></li>');
            res.write('<li><a href=\"http://localhost:3001/instrumentos\">Lista de instrumentos</a></li>');
            res.write('<ul>');
            res.end();
        }

        else if(req.url == '/alunos' || req.url == '/alunos/'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos')
                .then(resp =>{
                    alunos = resp.data;
                    res.write('<h2>Lista de alunos</h2>');
                    res.write('<ul>');
                    alunos.forEach(aluno => {
                        res.write(`<li><a href=\"http://localhost:3001/alunos/${aluno.id}\">${aluno.id}, ${aluno.nome}, ${aluno.instrumento}</a></li>`); //têm de ser link tambem
                    });
                    res.write('</ul>');
                    res.write(`<p><a href=\"http://localhost:3001/\">Voltar ao Índice</a></p>`);
                    res.end();
                })
                .catch(error =>{
                    console.log("ERROR: " + error);
                    res.write('<p>Não foi possível obter a lista de alunos ERROR: ' + error +'</p>');
                    res.end();
                });

        }
        else if(req.url == '/cursos' || req.url == '/cursos/'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/cursos')
                .then(resp =>{
                    cursos = resp.data;
                    res.write('<h2>Lista de cursos</h2>');
                    res.write('<ul>');
                    cursos.forEach(curso => {
                        res.write(`<li>${curso.id}, ${curso.designacao}, ${curso.instrumento['#text']}</li>`); //têm de ser link tambem
                    });
                    res.write('</ul>');
                    res.write(`<p><a href=\"http://localhost:3001/\">Voltar ao Índice</a></p>`);

                    res.end();
                })
                .catch(error =>{
                    console.log("ERROR: " + error);
                    res.write('<p>Não foi possível obter a lista de cursos ERROR: ' + error +'</p>');
                    res.end();
                });

        }
        else if(req.url == '/instrumentos' || req.url == '/instrumentos/'){
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/instrumentos')
                .then(resp =>{
                    instrumentos = resp.data;
                    res.write('<h2>Lista de instrumentos</h2>');
                    res.write('<ul>');
                    instrumentos.forEach(instrumento => {
                        //instrumento.text
                        res.write(`<li>${instrumento.id}, ${instrumento['#text']}</li>`); //têm de ser link tambem
                    });
                    res.write('</ul>');
                    res.write(`<p><a href=\"http://localhost:3001/\">Voltar ao Índice</a></p>`);

                    res.end();
                })
                .catch(error =>{
                    console.log("ERROR: " + error);
                    res.write('<p>Não foi possível obter a lista de instrumentos ERROR: ' + error +'</p>');
                    res.end();
                });

        }
        else if(url[1] == 'alunos' && url[2] && !url[3]){
            console.log(' request aluno');
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            axios.get('http://localhost:3000/alunos/'+url[2])
                .then(resp =>{
                    aluno = resp.data;

                    res.write('<h2>Informações sobre o aluno</h2>');
                    res.write(`<p><b>Identificador:</b> ${aluno.id}</p>`);
                    res.write(`<p><b>Nome:</b> ${aluno.nome}</p>`);
                    res.write(`<p><b>Data de Nascimento:</b> ${aluno.datNasc}</p>`);
                    res.write(`<p><b>Curso:</b> ${aluno.curso}</p>`);
                    res.write(`<p><b>Ano:</b> ${aluno.anoCurso}</p>`);
                    res.write(`<p><b>Instrumento:</b> ${aluno.instrumento}</p>`);
                    res.write(`<p><a href=\"http://localhost:3001/alunos\">Voltar à lista de alunos</a></p>`);                 
                    res.end();
                })
                .catch(error =>{
                    console.log("ERROR: " + error);
                    res.write('<p>Não foi possível obter este aluno ERROR: ' + error +'</p>');
                    res.end();
                });
        }
        else{
            res.writeHead(200, {
                'Content-Type': 'text/html; charset=utf-8'
            })
            res.write('<p>Pedido não suportado</p>');
            res.end();
        }
    }else{
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.write('<p>Pedido não suportado ' + req.method + '</p>');
        res.end();
    }


})

server.listen(PORT);
console.log('Servidor à escuta na porta ' + PORT);


