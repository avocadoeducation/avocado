// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//var URL='https://192.168.1.130:3030/';
var URL='https://147.83.7.203:3030/';
//var URL='https://10.189.28.117:3030/';
//var URL='https://localhost:3030/';

angular.module('starter', ['ionic', 'starter.controllers', 'login.controller', 'profile.controller',
                'maps.controller', 'logout.controller', 'crono.controller', 'groups.controller',
                'races.controller', 'userlist.controller', 'messages.controller','groupraces.controller'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('map', {
      url: "/map",
      abstract: true,
      templateUrl: "templates/menuapk.html",
      controller: 'AppCtrl'
    })
    .state('map.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: "templates/map.html",
          controller: 'GpsCtrl'
        }
      }
    })
    .state('login', {
      url: "/login",
      templateUrl: "templates/loginapk.html",
      controller: 'loginCtrl'
    })
    .state('map.profile', {
      url: '/profile',
      views: {
        'menuContent': {
          templateUrl: "templates/profile3.html",
          controller: 'profileCtrl'
        }
      }
    })
    .state('map.races', {
      url: '/races',
      views: {
        'menuContent': {
          templateUrl: "templates/racesapk.html",
          controller: 'RacesCtrl'
        }
      }
    })
    .state('map.race', {
      url: "/race/:parentId",
      views: {
        'menuContent': {
          templateUrl: "templates/messages.html",
          controller: 'MessagesCtrl'
        }
      }
    })
    .state('map.groups', {
      url: '/groups',
      views: {
        'menuContent': {
          templateUrl: "templates/groupsapk.html",
          controller: 'GroupsCtrl'
        }
      }
    })
    .state('map.group', {
      url: "/group/:parentId",
      views: {
        'menuContent': {
          templateUrl: "templates/messages.html",
          controller: 'MessagesCtrl'
        }
      }
    })
    .state('map.groupraces', {
      url: "/groupraces/:id",
      views: {
        'menuContent': {
          templateUrl: "templates/groupraces.html",
          controller: 'groupRacesCtrl'
        }
      }
    })
    .state('map.userlist', {
      url: "/users/:parent/:parentId",
      views: {
        'menuContent': {
          templateUrl: "templates/userlist.html",
          controller: 'UserListCtrl'
        }
      }
    })
    .state('map.crono', {
      url: '/crono',
      views: {
        'menuContent': {
          templateUrl: "templates/crono.html",
          controller:"cronoCtrl"
        }
      }
    })
    .state('map.logout', {
      url: '/logout',
      views: {
        'menuContent': {
          templateUrl: "templates/logout.html",
          controller: 'logoutCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
