var rackModule = angular.module('rackmanagement', ["angular-hal"]);

rackModule.run(function($rootScope, halClient) {
    $rootScope.apiRoot = halClient.$get('/', {
        linksAttribute : "_links"
    });
});

rackModule.controller('rackController',
    function ($window, $scope, $timeout, halClient) {

    var searchTimeout;
    $scope.$watch('search', function(value) {
        $timeout.cancel(searchTimeout);
        searchTimeout = $timeout(load, 300);
    });
    
    $scope.numPortas = 24;
    $scope.portOptions = [16, 24, 48];
    
    $scope.root = function() {
        halClient.$get("/", {
            linksAttribute : "_links"
        }).then(function(resource) {
            $rootScope.resource = resource;
        });
    };
    
    $scope.root();
    
    /*function findAllPontos(url) {
        if ($rootScope.resource)
            return 
        var httpPromise = $http.get('/pontos').success(function(response) {
            //console.log(angular.toJson(response,true));
        });
        SpringDataRestAdapter.process(httpPromise, 'painel', true).then(function(processedResponse) {
            if (processedResponse._embeddedItems != undefined) {
                $scope.pontos = processedResponse._embeddedItems.pontos;
            } else {
                $scope.pontos = [];
            }
        });
    } 

    function findAllPaineis() {
        
        var httpPromise = $http.get('/paineis').success(function(response) {
            //console.log(angular.toJson(response,true));
        });
        SpringDataRestAdapter.process(httpPromise, 'pontos').then(function(processedResponse) {
            if (processedResponse._embeddedItems != undefined) {
                $scope.paineis = processedResponse._embeddedItems;
                //console.log(processedResponse);
            } else {
                $scope.paineis = [];
            }
        });
    }*/

    //findAllPaineis();

    //add a new task
    $scope.novoPainel = function () {
        if ($scope.nome == "" || $scope.numPortas == "") {
            alert("Dados Insuficientes! Por favor, informe o numero de portas e o nome do painel");
        }
        else {
            return $scope.apiRoot.then(function(apiRoot) {
                return apiRoot.$post('paineis', null, {
                    nome : $scope.nome
                }).then(load);
            });
/*            $http.post(urlBase + '/paineis', {
                nome: $scope.nome
            }).
                    success(function (data, status, headers) {
                        var newPainelUri = headers()["location"];
                        for (var i = 1; i <= $scope.numPortas; i++) {
                            novoPonto(i, newPainelUri);
                        }
                        //console.log("Painel " + newPainelUri + " adicionado.");
                        alert("Painel Adicionado");
                        // Refetching EVERYTHING every time can get expensive over time
                        // Better solution would be to $http.get(headers()["location"]) and add it to the list
                        findAllPaineis();
                    }); */
        } 
    }; 
    
/*    function novoPonto(numero, painel) {
        $http.post(urlBase + '/pontos',{
            numero: numero,
            painel: painel
        }).
                success(function(data, status, headers) {
                    var newPontoUri = headers()["location"];
                    //console.log("Ponto " + newPontoUri + " adicionado.");
                });
    }; */

    function load() {
        var search = $scope.search;
        var promise;
        if (search) {
            promise = $scope.apiRoot.then(function(apiRoot) {
                return apiRoot.$get('paineis', {
                    search: search
                });
            });
        } else {
            promise = $scope.apiRoot.then(function(apiRoot) {
                return apiRoot.$get('paineis');
            });
        }
        return promise.then(function(paineis) {
            $scope.paineis = paineis;
        });
    }


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
