var mongoose = require('mongoose');
 

var UsuarioSchema = new mongoose.Schema({
  nome: String,
  email: String,
  endereco: String,
  telefone: Number
});
 
mongoose.model('Usuario', UsuarioSchema);