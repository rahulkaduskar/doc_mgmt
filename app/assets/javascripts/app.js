docMgmtApp = angular.module('docMgmtApp',['ngAnimate', 'ipCookie', 'ngRoute', 'ngResource', 'ng-token-auth',
  'ngCkeditor','ngSanitize'
]);
docMgmtApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'assets/index.html',
      controller: 'HomeCtrl'
    })
    .when('/sign_in', {
      templateUrl: 'assets/user_sessions/new.html',
      controller: 'UserSessionsCtrl'
    })
    .when('/sign_up', {
      templateUrl: 'assets/users/new.html',
      controller: 'UsersCtrl'
    })
    .when('/blogs', {
      templateUrl: 'assets/blogs/index.html',
      controller: 'BlogsListCtrl',
      requireLogin: true
    })
     .when('/blogs/new', {
      templateUrl: 'assets/blogs/new.html',
      controller: 'BlogsCreateCtrl',
      requireLogin: true
    })
    .when('/blogs/show/:id', {
      templateUrl: 'assets/blogs/show.html',
      controller: 'BlogsShowCtrl',
      requireLogin: true
    })
     .when('/blogs/edit/:id', {
      templateUrl: 'assets/blogs/edit.html',
      controller: 'BlogsEditCtrl',
      requireLogin: true
    })
    .otherwise({
      redirectTo: '/'
    });
});

docMgmtApp.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000'
  });

})
CKEDITOR.basePath = '/assets/ckeditor/';
