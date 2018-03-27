var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Estudio = mongoose.model('Estudio');
 
// ROTA BUSCAR 
router.get('/api/estudios', function(req, res) {

    Estudio.find(function(err, estudios) {
        // Em caso de erros, envia o erro na resposta
        if (err)
            res.send(err)
        // Retorna todos os estudios encontrados no BD
        res.json(estudios); 
    });
});
 
// ROTA CRIAR
router.post('/api/estudios', function(req, res) {
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Estudio.create({
        nomeEstudio: req.body.nomeEstudio,
        emailComercial: req.body.emailComercial,
        enderecoComercial: req.body.enderecoComercial,
        telefoneComercial: req.body.telefoneComercial
    }, function(err, estudio) {
        if (err)
            res.send(err);
        // Busca novamente todos os contatos após termos inserido um novo registro
        Estudio.find(function(err, estudios) {
            if (err)
                res.send(err)
            res.json(estudios);
        });
    });
 
});
 
// ROTA DELETAR
router.delete('/api/estudios/:estudio_id', function(req, res) {
    // Remove o estudio no Model pelo parâmetro _id
    Estudio.remove({
        _id : req.params.estudio_id
    }, function(err, estudio) {
        if (err)
            res.send(err);
        // Busca novamente todos os estudios após termos removido o registro
        Estudio.find(function(err, estudios) {
            if (err)
                res.send(err)
            res.json(estudios);
        });
    });
});
 
// ROTA EDITAR 
router.get('/api/estudios/:estudio_id', function(req, res) {
    // Busca o estudio no Model pelo parâmetro id
    Estudio.findOne({
        _id : req.params.estudio_id
    }, function(err, estudio) {
        if (err)
            res.send(err);
        res.json(estudio);
    });
});
 
// ROTA ATUALIZAR 
router.put('/api/estudios/:estudio_id', function(req, res) {
    // Busca o estudio no Model pelo parâmetro id
    var estudioData = req.body;
    var id = req.params.estudio_id;
 
    Estudio.update( 
        {_id: id }, 
        estudioData, 
        { upsert: true}, 
        function(err, estudio) {
            if (err) res.send(err);
            res.json(estudio);
    });
    
});
 
// DEFININDO NOSSA ROTA PARA O ANGULARJS/FRONT-END
router.get('*', function(req, res) {
    // Carrega nossa view index.html que será a única da nossa aplicação
    // O Angular irá lidar com as mudanças de páginas no front-end
    res.sendfile('./public/view/index.html');
});
 
module.exports = router;