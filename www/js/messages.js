angular.module('messages.controller', [])

.controller("MessagesCtrl", function ($scope, $stateParams, $http, $ionicLoading, $ionicModal,$log, $window) {
    $scope.messages = [];
    console.log('sP: '+$stateParams.parentId);
    $scope.postMessage=[];
    $scope.postAnswer=[];
	 $scope.mid=[];

	$scope.loadMessage = function () {
		$http.get(URL+'message/parent/'+$stateParams.parentId).success(function(data) {
			$scope.messages = data;
			})
		.error(function(data) {
			console.log('Error: ' + data);
		});
	
	};
	
	$scope.addMessage = function () {
		if(($scope.postMessage.text==null)||($scope.postMessage.text=="")){
		console.log("Mensaje vacio no se postea");
		$window.alert("Debes escribir algo!");
		}else{
		$http({
			method: 'POST',
			url: URL+'message',
			data: {
					UserID:window.localStorage.token,
					Text:$scope.postMessage.text,
					ParentID:$stateParams.parentId
					},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
				console.log(data);
				
				$scope.loadMessage();
				$scope.postMessage.text="";
			})
			.error(function (data) {
				console.log('Error:' + data);
			});
	
	}
	};
	
	$scope.deleteMessage = function (id) {
		$http({
			method: 'DELETE',
			url: URL+'message/'+id,
			data: {UserID:window.localStorage.token},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
				//window.location.href = '#/map/races/';
				console.log(data);
				$scope.loadMessage();
			})
			.error(function (data) {
				$window.alert("No estas autorizado a eliminar mensajes de otros.");
				console.log('Error:' + data);
			});
	};
	
	//AnswerModal
	$ionicModal.fromTemplateUrl('answer.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });

    $scope.openAnswerModal = function (mid) {
    	  $scope.mid=mid;
    	  console.log("mid "+ mid);
        $scope.modal.show();
    };

	$scope.postAnswer = function () {
		console.log("answer: "+$scope.postAnswer.text);
		if(($scope.postAnswer.text==null)||($scope.postAnswer.text=="")){
		console.log("Mensaje vacio no se postea");
		$window.alert("Debes escribir algo!");
		}else{
		$http({
			method: 'PUT',
			url: URL+'message/'+$scope.mid,
			data: {
					UserID:window.localStorage.token,
					Answer:$scope.postAnswer.text
					},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
				console.log(data);
				
				$scope.loadMessage();
				$scope.postAnswer.text="";
				$scope.modal.hide();
			})
			.error(function (data) {
				console.log('Error:' + data);
			});
	
	}
	};


    $scope.closeAnswerModal = function () {
        $scope.modal.hide();
    };
    
    $scope.deleteAnswer = function (aid,mid) {
		$http({
			method: 'DELETE',
			url: URL+'message/answer/'+mid,
			data: {UserID:window.localStorage.token,
					 AnswerID:aid			
			},
			headers: {'Content-Type': 'application/json'}
		}).success(function (data) {
				//window.location.href = '#/map/races/';
				console.log(data);
				$scope.loadMessage();
			})
			.error(function (data) {
				$window.alert(data);
				console.log('Error:' + data);
			});
	};
});
