angular.module('profile.controller', [])

.controller('profileCtrl',function($scope, $http, $ionicModal, $location, $window) {
    $scope.updateUser = {};
    console.log($window.localStorage['token']);
    
    $http.get(URL + 'user/' + $window.localStorage['token'])
    .success(function (data) {
        $scope.users = data;
    })
    .error(function (data) {
        console.log('Error:' + data);
    });

    $scope.getUser = function () {
        $http.get(URL + 'user/' + $window.localStorage['token'])
            .success(function (data) {
                $scope.users = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    };
    
    $ionicModal.fromTemplateUrl('update.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openModalUpdate = function () {
        $scope.modal.show();
    };

    $scope.okUpdate = function () {

        $http.put(URL + 'user/' + $window.localStorage['token'], $scope.updateUser)//+ cookie o token)
            .success(function (data) {
                $scope.modal.hide();
                $window.location.href='#/app/profile';
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

    $scope.closeModalUpdate = function () {
        $scope.modal.hide();
    };



    $ionicModal.fromTemplateUrl('delete.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal2) {
        $scope.modal2 = modal2;
    });
    $scope.openModalDelete = function () {
        $scope.modal2.show();
    };
    $scope.closeModalDelete = function () {
        $scope.modal2.hide();

    };

    $scope.okDelete = function () {
        $http.delete(URL + 'user/' + $window.localStorage['token'])//+ cookie o token)
            .success(function (data) {
                alert("acabas de borrar el usuario, le redigiremos al inicio");
                $window.localStorage['token'] = "";
                $window.location.href = '/';
            })
            .error(function (data) {
                console.log('Error: ' + data);
            });
    };

});