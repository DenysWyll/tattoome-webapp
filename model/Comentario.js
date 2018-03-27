var mongoose = require('mongoose');

var ComentarioSchema = new mongoose.Schema({
  //autor tipo usuario
  autor: {type: mongoose.Schema.Types.ObjectId, ref: 'Usuario'},
  comentario: String,
  data: Date,
  like: Boolean
});
 
mongoose.model('Comentario', ComentarioSchema);