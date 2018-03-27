var express  = require('express');
var app      = express();
var mongoose = require('mongoose');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
 
// conexao ao banco
mongoose.connect('mongodb://localhost/tattoome');

// Cria entidades com base nos models
require('./model/Estudio');
require('./model/Comentario');
require('./model/Usuario');
 
 

// definindo local de arquivos públicos
app.use(express.static(__dirname + '/public'));
// logando todas as requisições no console
app.use(logger('dev'));
// parse application/x-www-form-urlencoded                                    
app.use(bodyParser.urlencoded({'extended':'true'}));
// parse application/json          
app.use(bodyParser.json());
// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride());
 
// Incluindo nossas rotas definidas no arquivo routes/index.js
var index = require('./routes/estudioRouter');

// definindo nossas rotas na aplicação
app.use('/', index);
 
 
// LISTEN (iniciando nossa aplicação em node) ==========
// Define a porta 8080 onde será executada nossa aplicação
app.listen(8080);
// Imprime uma mensagem no console
console.log("Aplicação executada na porta 8080");