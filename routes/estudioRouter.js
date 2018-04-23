var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Estudio = mongoose.model('Estudio');
var Autenticacao = mongoose.model('Autenticacao');
 
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


router.get('/api/estudios/buscaPorLocalidade/:lng/:lat/:dist', function(req, res){

    var coords = [];
    coords[0] = req.params.lng;
    coords[1] = req.params.lat;

    Estudio.find({
        loc: {
            $near: coords,
            $maxDistance: req.params.dist
        }
    }).limit(30).exec(function(err, locations){

        if(err){
            res.json(err);
            console.log(err);
        }

        res.json(locations);
    });

});
 
// ROTA CRIAR
router.post('/api/estudios', function(req, res) {
   
    // Cria um contato, as informações são enviadas por uma requisição AJAX pelo Angular
    Estudio.create({

        nomeEstudio: req.body.nomeEstudio,
        enderecoComercial: req.body.enderecoComercial,
        telefoneComercial: req.body.telefoneComercial,
        autenticacao: req.body.autenticacao,
        loc: [req.body.lng,req.body.lat]

    }, function(err, estudio) {
        if (err)
            res.send(err);
                
        res.json(estudio);
    });

});

router.post('/api/autenticacao', function(req, res){
    Autenticacao.create({
        email: req.body.email,
        senha: req.body.senha
    }, function(err, auth){
        if (err)
            res.send(err);
    
        res.json(auth)
    });
})

 
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