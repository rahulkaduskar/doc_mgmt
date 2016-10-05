(function () {
'use strict';

/**
 * @ngdoc function
 * @name docMgmtApp.controller:UserSessionsCtrl
 * @description
 * # UserSessionsCtrl
 * Controller of the docMgmtApp
 */
angular.module('docMgmtApp')
  .controller('UserSessionsCtrl', ['$rootScope', '$scope', '$auth', '$location', 'FlashService',
  	function ($rootScope, $scope,  $auth, $location, FlashService) {
		  

		 $scope.signout = function signout(){
		 	$auth.signOut()
        .then(function(resp) {
          FlashService.Success('User logged out successfully', true);
          $location.path('/');
        })
        .catch(function(resp) {
          FlashService.Error(resp.errors.toString());
        });
		 }

  	 $scope.submit = function register() {
      $auth.submitLogin({
        email: $scope.loginForm.email,
        password: $scope.loginForm.password,
      })
      .then(function(resp) {
        FlashService.Success('User registered successfully', true);
        $location.path('/');
      })
      .catch(function(resp) {
        FlashService.Error(resp.errors.toString());
      });
    }
  }]);


})();