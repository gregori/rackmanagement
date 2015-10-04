var services = angular.module('rackmanagement.services', ['ngResource']);

services.factory('PaineisFactory', function ($resource) {
    return $resource('/paineis', {}, {
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
});

services.factory('PainelFactory', function ($resource) {
    return $resource('/paineis/:id', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    })
});
