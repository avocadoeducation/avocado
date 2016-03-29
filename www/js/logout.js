angular.module('logout.controller', [])

.controller('logoutCtrl', function($window) {
    alert("Vas a salir");
    $window.localStorage['token'] = "";
    $window.location.href = '#/login';
});