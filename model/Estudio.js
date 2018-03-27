var mongoose = require('mongoose');
 

var EstudioSchema = new mongoose.Schema({
  nomeEstudio: String,
  emailComercial: String,
  enderecoComercial: String,
  avaliacao: {type: Number, default: 2.5},
  telefoneComercial: {type: Number, default: 0},
  comentarios : [{type: mongoose.Schema.Types.ObjectId, ref: 'Comentario'}]
});
 
mongoose.model('Estudio', EstudioSchema);