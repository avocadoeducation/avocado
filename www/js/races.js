angular.module('races.controller', [])

.controller('RacesCtrl', function($scope, $ionicModal, $http, $window, $stateParams, $ionicLoading, $log) {

    $scope.ownraces = [];
    $scope.otherraces = [];
    $scope.rid = [];
    $scope.user = [];

	 $scope.getUser = function () {
        $http.get(URL + 'user/' + $window.localStorage['token'])
            .success(function (data) {
                $scope.user = data;
            })
            .error(function (data) {
                console.log('Error:' + data);
            });
    }; 
    
    $scope.loadRaces=function () {
        //Obtener carreras propias
        $http.get(URL+'race/user/'+window.localStorage.token).success(function(data) {
            $scope.ownraces = data;
            console.log('own Races:'+$scope.ownraces);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

        //Obtener otras carreras
        $http.get(URL+'race/no/'+window.localStorage.token).success(function(data) {
            $scope.otherraces = data;
            console.log('other Races:'+$scope.otherraces);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    };

    $scope.addUser = function (race) {
        $http({
            method: 'POST',
            url: URL+'race/'+race+'/user',
            data: {_id:window.localStorage.token},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
            $scope.loadRaces();
            console.log(data);

        })
        .error(function (data) {
            console.log('Error:' + data);
        });
    };

    $scope.deleteUser = function (race) {
        $http({
            method: 'DELETE',
            url: URL+'race/'+race+'/user',
            data: {_id:window.localStorage.token},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
            $scope.loadRaces();
            console.log(data);

        })
        .error(function (data) {
            console.log('Error:' + data);
        });
    };

  	$ionicModal.fromTemplateUrl('deleteRace.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openDeleteRaceModal = function (rid,admin) {
    	  $scope.rid=rid;
    	  $scope.getUser();
    	  console.log("rid "+ rid +" Admin "+admin + " Username "+$scope.user.Username)
    	  if (admin==$scope.user.Username) {
           $scope.modal.show(); 	  
    	  }else {
			$window.alert("No puedes elimirar un grupo si no eres su Administrador!")		  
		  }
    };
    
    $scope.deleteRace = function () {
    	
		$http({
			method: 'DELETE',
			url: URL+'race/'+$scope.rid,
			data: {_id:window.localStorage.token},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
				//window.location.href = '#/map/races/';
				console.log(data);
				$scope.loadRaces();
				$scope.modal.hide();
			})
			.error(function (data) {
				$window.alert(data);
				console.log('Error:' + data);
			});
	}; 

    $scope.closeModal = function () {
        $scope.modal.hide();
        //$scope.modal2.hide();
    };

    $scope.startRace = function (rid) {
		$window.localStorage['startRace']=rid;
		console.log("Starting Race: "+$window.localStorage['startRace']);
		$window.location.href = '#/map/crono';
		
    };

});
