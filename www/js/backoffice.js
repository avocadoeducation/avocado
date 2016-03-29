angular.module('backoffice.controller', [])

.controller('backofficeCtrl', function($scope, $ionicModal, $timeout, $http, $window, filterFilter) {
    $scope.users = [];
    $scope.search = {};
    $scope.newObject = {};
    $scope.objects = {};
    $scope.newMessage = {};
    $scope.messages = {};
    $scope.selected = false;

    var urlrace = URL + 'race';
    var urluser = URL + 'user';
    //------------------------
    //Controller user
    //------------------------
    $http.get(urluser).success(function (data) {
        $scope.users = data;
        $scope.currentPage = 1;
        $scope.totalItems = $scope.users.length;
        console.log($scope.totalItems);
        $scope.entryLimit = 3;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
    }).error(function(data) {
        window.alert("ERROR - Fallo al realizar el GET");
    });

    this.addUser = function(){
        $scope.users.push(this.user);
        $http({
            method: 'POST',
            url: urluser,
            data: this.user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            window.alert("Se ha realizado el POST");
        }).error(function(data) {
            window.alert("ERROR - Fallo al realizar el POST");
        });
        this.user = {};
    };

    this.updateUser = function(username, name, surname, email){
        user.Username = username;
        user.Name = name;
        user.Surname = surname;
        user.Email = email;
        var urluserupdate = urluser+username;
        console.log(url);
        $http({
            method: 'PUT',
            url: urluserupdate,
            data: user,
            headers: {'Content-Type': 'application/json'}
        }).success(function(data) {
            console.log("put");
            window.alert(data);
        }).error(function(data) {
            window.alert("ERROR - Fallo al realizar el POST");
        });
        this.user = {};
    };

    $scope.clickToView = function (data) {
        window.alert("Se vera " + data);
        var urlview = urluser+data;

        ngDialog.open({
            template: 'updateUser',
            scope: $scope
        });
        $scope.Username = this.user.Username;
        $scope.Name = this.user.Name;
        $scope.Surname = this.user.Surname;
        $scope.Email = this.user.Email;

    };

    $scope.clickToDelete = function (data) {
        window.alert("Se borrara " + data);

        var id = {_id: $window.localStorage['token']};
        var remove = {'delete':data};
        $http
        ({
            method: 'DELETE',
            url: URL+'/user/' + id,
            data: remove,
            headers: {'Content-Type': 'application/json'}
        })

            .success(function (data) {
            window.alert(data);
        }).error(function(data) {
            window.alert("ERROR - Fallo al realizar el DELETE");
        });
    };

    $scope.resetFilters = function () {
        $scope.search = {};
    };

    // $watch search to update pagination
    $scope.$watch('search', function (newVal, oldVal) {
        $scope.filtered = filterFilter($scope.users, newVal);
        $scope.totalItems = $scope.filtered.length;
        $scope.noOfPages = Math.ceil($scope.totalItems / $scope.entryLimit);
        $scope.currentPage = 1;
    }, true);

    //------------------------
    //Controller race
    //------------------------
    $http.get(urlrace).success(function(data) {

        $scope.objects = data;
        console.log(data);
    })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    $scope.deleteObjectRace = function(newObject) {
        console.log(newObject);
        var id = {_id: $window.localStorage['token']};
        $http
        ({
            method: 'DELETE',
            url: URL+'/race/' + $scope.newObject._id,
            data: id,
            headers: {'Content-Type': 'application/json'}
        })
            .success(function(data) {
                $scope.newObject = {};
                $scope.selected = false;
                $scope.objects = null;

                $http.get('https://localhost:3030/race/').success(function(data) {
                    $scope.objects = data;
                })
                    .error(function(data) {
                        console.log('Error: ' + data);
                    });

            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error:' + data);
            });
    };

    $scope.createObjectRace = function() {
        $http.post('https://localhost:3030/race/', $scope.newObject)
            .success(function(data) {
                $scope.newObject = {};
                $scope.objects.push(data);
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error: ' + data);
            });
    };

    $scope.updateObjectRace = function(newObject) {
        console.log(newObject);
        $http.put('https://localhost:3030/race/' + $scope.newObject._id, newObject)
            .success(function(data) {
                $scope.newObject = {}; // Borramos los datos del formulario

                //  $scope.objects = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
                window.alert('Error:' + data);
            });
    };

    $scope.selectObjectRace = function(object) {
        $http.get('https://localhost:3030/race/name/'+ object.Name).success(function(data) {
            $scope.newObject = data;
            console.log(data);
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $scope.newObject = object;
        $scope.selected = true;
        console.log($scope.newObject, $scope.selected);
    };

    //------------------------
    //Controller race
    //------------------------
    // Obtenemos todos los datos de la base de datos
    $http.get(URL+'message').success(function(data) {
        $scope.messages = data;
        $scope.nMsg=$scope.messages.length;

    })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    // Funci�n para registrar un message
    $scope.registrarMessage = function() {
        $http.post(URL+'message', $scope.newMessage)
            .success(function(data) {
                $scope.newMessage = {}; // Borramos los datos del formulario
                $scope.messages = data;

            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $http.get(URL+'/message').success(function(data) {
            $scope.messages = data;
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Funci�n para editar los datos de una message
    $scope.modificarMessage = function(newMessage) {
        $http.put(URL+'/message/' + $scope.newMessage._id, $scope.newMessage)
            .success(function(data) {
                $scope.newMessage = {}; // Borramos los datos del formulario
                $scope.messages = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $http.get(URL+'/message').success(function(data) {
            $scope.messages = data;
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Funci�n que borra un message message conocido su id
    $scope.borrarMessage = function(newMessage) {
        console.log('Borrar: '+newMessage);
        var id = {_id: $window.localStorage['token']};
        $http
        ({
            method: 'DELETE',
            url: URL+'/message/' + $scope.newMessage._id,
            data: id,
            headers: {'Content-Type': 'application/json'}
        })
            .success(function(data) {
                $scope.newMessage = {};
                $scope.messages = data;
                $scope.selected = false;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
        $http.get(URL+'/message').success(function(data) {
            $scope.messages = data;
        })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // Funci�n para coger el message seleccionado en la tabla
    $scope.selectObjectMessage = function(message) {
        $scope.newMessage = message;
        $scope.selected = true;
        console.log($scope.newMessage, $scope.selected);
    };
})

.controller('tabCtrlBackoffice', function(){
    this.tab = 1;

    this.setTab = function(setTab){
        this.tab = setTab;
    };
    this.isSet = function(isSet){
        return this.tab === isSet;
    };
})

.filter('startFrom', function () {
    return function (input, start) {
        if (input) {
            start = +start;
            return input.slice(start);
        }
        return [];
    };
});