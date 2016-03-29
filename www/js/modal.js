// window.onload = listartodo();
//var app = angular.module("app", ['ui.bootstrap']);
/*var profileapp = angular.module('profileapp', []);
profileapp.controller('getctrl', function($scope, $http, $window) {
    $scope.formData = {};
    $scope.listartodo = function() {
        $http.get('https://localhost:3030/user/alex')//+ $window.localStorage.token)
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    }

});*/
//angular.module('ui.bootstrap.demo', ['ui.bootstrap'])
angular.module('profileapp', ['ui.bootstrap'])

    .controller("getctrl", function($scope, $http) {
        $http.get('https://localhost:3030/user/'+ window.localStorage.token)
            .success(function (data) {
                $scope.users = data;
                console.log(data);
            })
            .error(function (data) {
                console.log('Error:' + data);
            });

    });

angular.module('profileapp').controller('ModalDemoCtrl', function ($scope, $modal) {


    $scope.openUpdate = function () {

        var modalInstance = $modal.open({
            templateUrl: 'ModalUpdate',
            controller: "ModalInstanceCtrlUpdate" ///añadimos el controller que configuraremos update
        });
    };
    $scope.openDelete = function () {

        var modalInstance = $modal.open({
            templateUrl: 'ModalDelete',
            controller: 'ModalInstanceCtrlDelete' //añadimos el controller que configuraremos delete
        });
    };

});
// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.


angular.module('profileapp').controller('ModalInstanceCtrlUpdate', function ($scope, $modalInstance, $http) {


    $scope.okUpdate= function () {
        $http.put('user/' + window.localStorage.token,  $scope.updateUser)//+ cookie o token)
            .success(function(data) {
                // alert("acabas de actualizar el usuario")  //-cookie o token de usuario
                window.location.href='/profile';
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.cancelUpdate= function () {
        $modalInstance.dismiss('cancel');
    };


});
angular.module('profileapp').controller('ModalInstanceCtrlDelete', function ($scope, $modalInstance, $http) {

    $scope.okDelete= function () {
        $http.delete('user/' + window.localStorage.token )//+ cookie o token)
            .success(function(data) {
                alert("acabas de borrar el usuario, le redigiremos al inicio");  //-cookie o token de usuario
                window.location.href='/';
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    $scope.cancelDelete = function () {
        $modalInstance.dismiss('cancel');
    };
    $scope.cancelUpdate= function () {
        $modalInstance.dismiss('cancel');
    };
});
