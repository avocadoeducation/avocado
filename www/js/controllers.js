'use strict';

var MapApp = angular.module('MapApp', ['ionic','chart.js', 'races.controller','groups.controller',
							'groupraces.controller','userlist.controller','messages.controller',
							'backoffice.controller']);

var URL='https://127.0.0.1:3030/';

MapApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
	$stateProvider
		.state('menu', 			{url: "/map", abstract: true, templateUrl: "/templates/menu.html", controller: 'mainCtrl'})
		.state('login', 		{url: '/login', templateUrl: '/templates/login.html', controller: 'loginCtrl'})
		.state('menu.home', 	{url: '/home', views: {'menuContent': 				{templateUrl: '/templates/map.html', controller: 'GpsCtrl'}}})
		.state('menu.groups', 	{url: '/groups', views: {'menuContent': 			{templateUrl: '/templates/groups.html', controller: 'GroupsCtrl'}}})
		.state('menu.races', 	{url: '/races', views: {'menuContent': 			{templateUrl: '/templates/races.html', controller: 'RacesCtrl'}}})
		.state('menu.group', 	{url: "/group/:parentId",views: {'menuContent': {templateUrl: "templates/messages.html",controller: 'MessagesCtrl'}}})
		.state('menu.race', 	{url: "/race/:parentId",views: {'menuContent':  {templateUrl: "templates/messages.html",controller: 'MessagesCtrl'}}})
		.state('menu.userlist', {url: "/users/:parent/:parentId",views: {'menuContent': {templateUrl: "templates/userlist.html",controller: 'UserListCtrl'}}})
		.state('menu.racegroup', {url: "/groupraces/:id",views: {'menuContent': {templateUrl: "templates/groupraces.html",controller: 'groupRacesCtrl'}}})
		.state('menu.profile', 	{url: '/profile', views: {'menuContent': 			{templateUrl: '/templates/profile3.html', controller: 'profileCtrl'}}})
		.state('menu.logout', 	{url: '/logout', views: {'menuContent': 			{templateUrl: '/templates/logout.html', controller: 'logOutCtrl'}}})
		.state('menu.stats', 	{url: '/stats', views: {'menuContent': 			{templateUrl: '/templates/stats.html', controller: 'statsCtrl'}}})
		.state('menu.backoffice', {url: '/backoffice', views: {'menuContent': {templateUrl: "templates/backoffice.html", controller: 'backofficeCtrl'}}});
	// if none of the above states are matched, use this as the fallback
	$urlRouterProvider.otherwise('/login');
}]);

MapApp.controller('loginCtrl',['$http', '$scope', '$location', '$window', function ($http, $scope,$location, $window){
	$scope.users = [];
	console.log($window.localStorage['token']);
	if(($window.localStorage['token'] != undefined && $window.localStorage['token'] != "") || $window.location.search != ""){
		console.log("Entra");
		if($window.location.search != ""){
			$window.localStorage['token'] = $window.location.search.substring(1);
		}
		$window.location.href='#/map/home';
	}

	$scope.addUser = function(){
		$scope.users.push(this.user);
		var urlsignin = URL+"user";
		$http({
			method: 'POST',
			url: urlsignin,
			data: this.user,
			headers: {'Content-Type': 'application/json'}
		}).success(function(data) {
			console.log(data);
			$window.localStorage['token']=data;
			console.log($window.localStorage['token']);
			$window.location.href='#/map/home';
		}).error(function(data) {
			$window.alert("ERROR - POST");
		});
		this.user = {};
	};

	$scope.loginUser = function(){
		var urlauth = URL+"user/auth";
		$http({
			method: 'POST',
			url: urlauth,
			data: this.user,
			headers: {'Content-Type': 'application/json'}
		}).success(function(data) {
			$window.localStorage['token']=data;
			$window.location.href='#/map/home';
		}).error(function(data) {
			$window.alert("ERROR - AUTH");
		});
		this.user = {};
	};

	$scope.loginFacebook = function(){
		console.log('facebook');
		$window.location.href='/auth/facebook';
	};
}]);

MapApp.controller('tabCtrl', function(){
	this.tab = 1;

	this.setTab = function(setTab){
		this.tab = setTab;
	};
	this.isSet = function(isSet){
		return this.tab === isSet;
	};
});

/**
 * LOG OUT CONTROLLER - handle inapp browser
 */
MapApp.controller('logOutCtrl', ['$scope','$window', function($scope,$window) {
	alert("Vas a salir");
	$window.localStorage['token'] = "";
	$window.location.href = '/';
}]);
