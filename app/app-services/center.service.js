(function () {
    'use strict';

    angular
        .module('app')
        .factory('CenterService', Service);

    function Service($http, $q) {
        var service = {};

        service.GetCurrent = GetCurrent;
        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;

        return service;

        function GetCurrent() {
            return $http.get('/api/centers/current').then(handleSuccess, handleError);
        }

        function GetAll() {
            return $http.get('/api/centers').then(handleSuccess, handleError);
        }

        function GetById(_id) {
            return $http.get('/api/centers/' + _id).then(handleSuccess, handleError);
        }

        function GetByUsername(name) {
            return $http.get('/api/centers/' + name).then(handleSuccess, handleError);
        }

        function Create(center) {
            return $http.post('/api/centers', center).then(handleSuccess, handleError);
        }

        function Update(center) {
            return $http.put('/api/centers/' + center._id, user).then(handleSuccess, handleError);
        }

        function Delete(_id) {
            return $http.delete('/api/centers/' + _id).then(handleSuccess, handleError);
        }

        // private functions

        function handleSuccess(res) {
            return res.data;
        }

        function handleError(res) {
            return $q.reject(res.data);
        }
    }

})();
