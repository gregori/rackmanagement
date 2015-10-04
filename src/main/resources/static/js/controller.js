var app = angular.module('rackmanagement.controllers', []);

app.controller('PainelListCtrl', ['$scope', 'PaineisFactory', 'PainelFactory', '$location',
    function ($scope, PaineissFactory, PainelFactory, $location) {

        // callback for ng-click 'editPainel':
        $scope.editPainel = function (id) {
            $location.path('/painel-detail/' + id);
        };

        // callback for ng-click 'deletePainel':
        $scope.deletePainel = function (id) {
            PainelFactory.delete({ id: id });
            $scope.users = PaineissFactory.query();
        };

        // callback for ng-click 'createPainel':
        $scope.createNewPainel = function () {
            $location.path('/painel-creation');
        };

        $scope.paineis = PaineisFactory.query();
    }]);


app.controller('PainelDetailCtrl', ['$scope', '$routeParams', 'PainelFactory', '$location',
    function ($scope, $routeParams, PainelFactory, $location) {

        // callback for ng-click 'updatePainel':
        $scope.updatePainel = function () {
            PainelFactory.update($scope.painel);
            $location.path('/painel-list');
        };

        // callback for ng-click 'cancel':
        $scope.cancel = function () {
            $location.path('/painel-list');
        };

        $scope.painel = PainelFactory.show({id: $routeParams.id});
    }]);

app.controller('PainelCreationCtrl', ['$scope', 'PaineisFactory', '$location',
    function ($scope, PaineisFactory, $location) {

        // callback for ng-click 'createNewPainel':
        $scope.createNewPainel = function () {
            PaineisFactory.create($scope.painel);
            $location.path('/painel-list');
        }
    }]);
