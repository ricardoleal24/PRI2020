var express = require('express')
var bodyParser = require('body-parser')
var templates = require('./html-templates')
var jsonfile = require('jsonfile')
var logger = require('morgan')
var fs = require('fs')

var multer = require('multer')
var upload = multer({dest: 'uploads/'})

var app = express()

//set logger
app.use(logger('dev'))

app.use(bodyParser.urlencoded({extended: false})) 

app.use(bodyParser.json()) 

//server static files
app.use(express.static('public'))

app.get('/', function(req, res){
    var d = new Date().toISOString().substr(0, 16)
    var files = jsonfile.readFileSync('./dbFile.json')
    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileList(files, d))
    res.end()
})

app.get('/files/upload', function(req, res){
    var d = new Date().toISOString().substr(0, 16)
    res.writeHead(200, {'Content-Type' : 'text/html;charset=utf-8'})
    res.write(templates.fileForm(d))
    res.end()
})

app.get('/download/:filename', function(req,res){
    res.download(__dirname + '/public/fileStore/' + req.params.filename)
})
                 //upload.array
app.post('/files', upload.array('myFile'), function(req, res){
    req.files.forEach( f => {
        console.log(' > '+ f.originalname)

        let quarantinePath = __dirname + '/' + f.path
        let newPath = __dirname + '/public/fileStore/' + f.originalname
        
        fs.rename(quarantinePath, newPath, function(err){
            if(err){
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write('<p> Erro ao mover o ficheiro...' + err + '</p>')
                res.end()
            }else{
                var d = new Date().toISOString().substr(0, 16)
                var files = jsonfile.readFileSync('./dbFile.json')

                files.push({
                    date: d,
                    name: f.originalname,
                    mimetype: f.mimetype,
                    size: f.size
                })

                jsonfile.writeFileSync('./dbFile.json', files)


            }
        })
    })
    res.redirect('/')
})

app.listen(7777, ()=> console.log('Servidor está à escuta na porta 7777...'))
