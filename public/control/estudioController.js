var listaEstudios = angular.module('listaEstudios', []);
 
function mainController($scope, $http, $window, $q) {    
    $scope.defer = null;

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


    $scope.buscarEstudios = function () {
        //0.1 = 1km??????
        var dist = 0.1;
        var deferred = $q.defer();

        $http.get('/api/estudios/buscaPorLocalidade/'+$scope.formEstudio.lng+'/'+$scope.formEstudio.lat+'/'+dist)
        .success(function(data) {
            $scope.estudios = data;
            $scope.formEstudio = {};
            console.log("estudios: ", data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };
 
    // Quando clicar no botão Criar, envia informações para a API Node
    $scope.criarEstudio = function() {
        //TODO pesquisa endereço no maps e retorna a lat e long

        $http.post('/api/autenticacao',$scope.formAuth)
            .success(function(data){
                $scope.formEstudio.autenticacao = data;

                $http.post('/api/estudios', $scope.formEstudio)
                .success(function(data) {
                    // Limpa o formulário para criação de outros estudios
                    $scope.formEstudio = {};
                    console.log(data);
                    // $window.location.href = '../view/paginaEstudio.html';
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });

            })
            .error(function(data){
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

    $scope.getLatLong = function() {
        var deferred = $q.defer();
        var geo = new google.maps.Geocoder;
        //valor vindo da caixa de texto chamada location
        var address = $scope.formEstudio.enderecoComercial;
        //var user = $('#user').val();
        console.log(address);

        geo.geocode({'address':address},function(results, status){
        if (status == google.maps.GeocoderStatus.OK) {
            console.log("Status geocoder OK");
              $scope.formEstudio.lat = results[0].geometry.location.lat();
              $scope.formEstudio.lng = results[0].geometry.location.lng();
   
              var latlng = new google.maps.LatLng($scope.formEstudio.lat,$scope.formEstudio.lng);
   
              var mapProp = {
                    center:latlng,
                    zoom:18,
                    mapTypeId:google.maps.MapTypeId.ROADMAP,
                    mapTypeControl: false
              };
               
              var map=new google.maps.Map(document.getElementById("map"),mapProp);
              var marker = new google.maps.Marker({
                    position: latlng,
                    map: map,
                    title:name
              });

             // console.log(lat+" "+lng);
             // $.get( "http://localhost:1346?nome="+user+"&lat="+lat+"&lon="+lng, null);   
        } else {
              alert("O Geocoder falhou: " + status);
        }

        deferred.promise.then(function(resolve){
            return resolve;
        }, function(reject){
            alert('Erro: ' + reject);
        });

    });
  } 
 
}