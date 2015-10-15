var rackModule = angular.module('rackmanagement', []);

rackModule.controller('rackController', function ($scope, $http) {

    var urlBase = "";
    $scope.pts = [];
    $scope.pontos = [];
    //$scope.toggle = true;
    $scope.numPortas = 24;
    $scope.portOptions = [16, 24, 48];

    $http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllPontosByPainel(url) {
        console.log(url);
        if (url !== undefined) {
            return $http.get(url);
        }
    }
    
    function findAllPaineis() {
        //get all tasks and display initially
        $http.get(urlBase + '/paineis').
                success(function (data) {
                    if (data._embedded !== undefined) {
                        $scope.paineis = data._embedded.paineis;
                        angular.forEach(data._embedded.paineis, function(painel) {
                            angular.forEach(painel._links, function(value, key) {
                                if (key === 'pontos') {
                                    var promiss = findAllPontosByPainel(value.href);
                                    promiss.success(function (data) {
                                        console.log(data);
                                        if (data._embedded !== undefined) {
                                            $scope.pontos[painel.id] = data._embedded.pontos;
                                        } else {
                                            $scope.pontos[painel.id] = [];
                                        }
                                    });
                                }
                            });                           
                        });
                    } else {
                        $scope.paineis = [];
                        $scope.pontos = {};
                    }
                    //$scope.toggle = '!toggle';
                });
    }

    findAllPaineis();

    //add a new task
    $scope.novoPainel = function novoPainel() {
        if ($scope.nome === "" || $scope.numPortas === "") {
            alert("Dados Insuficientes! Por favor, informe o numero de portas e o nome do painel");
        }
        else {
            $http.post(urlBase + '/paineis', {
                nome: $scope.nome
            }).
                    success(function (data, status, headers) {
                        var newPainelUri = headers()["location"];
                        for (var i = 1; i <= $scope.numPortas; i++) {
                            novoPonto(i, newPainelUri);
                        }
                        console.log("Painel " + newPainelUri + " adicionado.");
                        alert("Painel Adicionado");
                        // Refetching EVERYTHING every time can get expensive over time
                        // Better solution would be to $http.get(headers()["location"]) and add it to the list
                        findAllPaineis();
                    });
        }
    };

    function novoPonto(numero, painel) {
        $http.post(urlBase + '/pontos', {
            numero: numero,
            painel: painel
        }).
                success(function (data, status, headers) {
                    var newPontoUri = headers()["location"];
                    console.log("Ponto " + newPontoUri + " adicionado.");
                });
    }
    ;


});

//Angularjs Directive for confirm dialog box
/* taskManagerModule.directive('ngConfirmClick', [
 function () {
 return {
 link: function (scope, element, attr) {
 var msg = attr.ngConfirmClick || "Are you sure?";
 var clickAction = attr.confirmedClick;
 element.bind('click', function (event) {
 if (window.confirm(msg)) {
 scope.$eval(clickAction);
 }
 });
 }
 };
 }]); */
