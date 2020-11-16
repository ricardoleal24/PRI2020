var http= require("http");
var fs= require("fs");
const PORT= 3001;

const server= http.createServer(function(req,res) {

    //var partes = req.url.split('/')
    //var pag = partes[partes.length-1]
    console.log("request method: " + req.method + ' request url:' + req.url);
    var url = req.url.split('/')[1];
    console.log( 'url1 ' + url[1] + ' url2 ' + url[2] + ' url3 ' + url[3]);

    if(url == "" || url == "/" || url == "index" || url == "/index.html"){
        fs.readFile('index.html', function(err, data){
            if(err){
                console.log("Erro a ler Index: " + err);
                res.writeHead(200, 
                    {'Content-Type': 'text/html; charset=utf-8'});
                res.write("<p>Ficheiro inexistente.</p>");
                res.end();
            }
            else{
            res.write(data);
            res.end;
            }
        })

    } else if (req.url.match(/\/[1-222]+$/)) {
        fs.readFile('./arqfiles/' + req.url + '.html', function (err, data) {
            if(err){
                console.log("Erro a ler ficheiro: " + err);
                res.writeHead(200, 
                    {'Content-Type': 'text/html; charset=utf-8'})
                res.write("<p>Ficheiro inexistente.</p>");
                res.end();
            }
            else{
                res.writeHead(200, 
                    {'Content-Type': 'text/html; charset=utf-8'})
                res.write(data);
                res.end();
            }
        })
    
    } else {
        res.writeHead(200, {
            'Content-Type': 'text/html; charset=utf-8'
        })
        res.write('<p>Pedido não suportado </p>');
        res.end();
    }

});

server.listen(PORT);

console.log("Servidor á escuta na porta " + PORT);
