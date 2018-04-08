var mongoose = require('mongoose');
 

var EstudioSchema = new mongoose.Schema({
  nomeEstudio: String,
  enderecoComercial: String,
  likes: Number,
  telefoneComercial: {type: Number, default: 0},
  comentarios : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comentario'}],
  autenticacao : {type: mongoose.Schema.Types.ObjectId, ref: 'Autenticacao'},
  loc: {
    type: [Number],
    index: '2d'
  }
 
});
 
mongoose.model('Estudio', EstudioSchema);