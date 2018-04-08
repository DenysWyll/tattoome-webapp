var mongoose = require('mongoose');
 

var UsuarioSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  telefone: Number,
  autenticacao : {type: mongoose.Schema.Types.ObjectId, ref: 'Autenticacao'}
});
 
mongoose.model('Usuario', UsuarioSchema);