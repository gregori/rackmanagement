angular.module('rackmanagement', ['ngRoute', 'rackmanagement.filters', 'rackmanagement.services', 'rackmanagement.directives', 'rackmanagement.controllers']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/painel-list', {templateUrl: 'partials/painel-list.html', controller: 'PainelListCtrl'});
        $routeProvider.when('/painel-detail/:id', {templateUrl: 'partials/painel-detail.html', controller: 'PainelDetailCtrl'});
        $routeProvider.when('/painel-creation', {templateUrl: 'partials/painel-creation.html', controller: 'PainelCreationCtrl'});
        $routeProvider.otherwise({redirectTo: '/painel-list'});
    }]);

