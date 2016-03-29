angular.module('userlist.controller', [])

.controller('UserListCtrl', function ($scope, $http, $stateParams , $window, $ionicLoading, $log) {
    $scope.users = [];
    $scope.parent = [];
    console.log('Type: '+$stateParams.parent+' ParentId: '+$stateParams.parentId);
    $scope.parentId=$stateParams.parentId;

    $scope.loadUsers=function () {
        $http.get(URL+$stateParams.parent+'/'+$stateParams.parentId).success(function(data) {
            $scope.parent = data;
            $scope.users = data.Users;
            console.log('Rx Info: ' + data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });

    };

    $scope.deleteUser = function (delID) {
        $http({
            method: 'DELETE',
            url: URL+$stateParams.parent+'/'+$stateParams.parentId+'/user',
            data: {
                _id:window.localStorage.token,
                delete:delID
            },
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
            $scope.loadUsers();
            console.log(data);

        })
            .error(function (data) {
                $window.alert(data+' No estas autorizado a expulsar a este usuario!');
                console.log('Error: ' + data);
            });
    };
});