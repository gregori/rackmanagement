var rackModule = angular.module('rackmanagement', ["ngResource", "spring-data-rest"]);

/*rackModule.config(function(SpringDataRestAdapterProvider) {
    SpringDataRestAdapterProvider.config({
        'linkSelfLinkName' : 'self',
        'linksKey' : '_links'
    });
});*/

rackModule.controller('rackController', function ($scope, $http, SpringDataRestAdapter) {

    var urlBase = "";
    //$scope.toggle = true;
    $scope.numPortas = 24;
    $scope.portOptions = [16, 24, 48];
    
    $http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllPontos(url) {
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
    }

    findAllPaineis();

    //add a new task
    $scope.novoPainel = function novoPainel() {
        if ($scope.nome == "" || $scope.numPortas == "") {
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
                        //console.log("Painel " + newPainelUri + " adicionado.");
                        alert("Painel Adicionado");
                        // Refetching EVERYTHING every time can get expensive over time
                        // Better solution would be to $http.get(headers()["location"]) and add it to the list
                        findAllPaineis();
                    });
        }
    };
    
    function novoPonto(numero, painel) {
        $http.post(urlBase + '/pontos',{
            numero: numero,
            painel: painel
        }).
                success(function(data, status, headers) {
                    var newPontoUri = headers()["location"];
                    //console.log("Ponto " + newPontoUri + " adicionado.");
                });
    };

    // toggle selection for a given task by task id
    /* $scope.toggleSelection = function toggleSelection(taskUri) {
        var idx = $scope.selection.indexOf(taskUri);

        // is currently selected
        // HTTP PATCH to ACTIVE state
        if (idx > -1) {
            $http.patch(taskUri, {taskStatus: 'ACTIVE'}).
                    success(function (data) {
                        alert("Task unmarked");
                        findAllTasks();
                    });
            $scope.selection.splice(idx, 1);
        }

        // is newly selected
        // HTTP PATCH to COMPLETED state
        else {
            $http.patch(taskUri, {taskStatus: 'COMPLETED'}).
                    success(function (data) {
                        alert("Task marked completed");
                        findAllTasks();
                    });
            $scope.selection.push(taskUri);
        }
    }; */


    // Archive Completed Tasks
    /* $scope.archiveTasks = function archiveTasks() {
        $scope.selection.forEach(function (taskUri) {
            if (taskUri != undefined) {
                $http.patch(taskUri, {taskArchived: 1});
            }
        });
        alert("Successfully Archived");
        console.log("It's risky to run this without confirming all the patches are done. when.js is great for that");
        findAllTasks();
    }; */

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
