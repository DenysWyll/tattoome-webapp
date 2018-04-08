var mongoose = require('mongoose');
 

var AutenticacaoSchema = new mongoose.Schema({
  email: String,
  senha: String
});
 
mongoose.model('Autenticacao', AutenticacaoSchema);