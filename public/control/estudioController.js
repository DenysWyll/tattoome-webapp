var listaEstudios = angular.module('listaEstudios', []);
 
function mainController($scope, $http) {    
 
    // Quando acessar a página, carrega todos os estudios e envia para a view($scope)
    var refresh = function (){
        $http.get('/api/estudios')
            .success(function(data) {
                $scope.estudios = data;
                $scope.formEstudio = {};
                console.log("estudios: ", data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    refresh();
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarEstudio = function() {
        $http.post('/api/estudios', $scope.formEstudio)
            .success(function(data) {
                // Limpa o formulário para criação de outros estudios
                $scope.formEstudio = {};
                $scope.estudios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Ao clicar no botão Remover, deleta o estudio
    $scope.deletarEstudio = function(id) {
        $http.delete('/api/estudios/' + id)
            .success(function(data) {
                $scope.estudios = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Ao clicar no botão Editar, edita o estudio
    $scope.editarEstudio = function(id) {
        $http.get('/api/estudios/' + id)
            .success(function(data) {
                $scope.formEstudio = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
 
    // Recebe o JSON do estudio para edição e atualiza
    $scope.atualizarEstudio = function() {        
        $http.put('/api/estudios/' + $scope.formEstudio._id, $scope.formEstudio)
        .success( function(response){
            refresh();
        });
    };
 
}