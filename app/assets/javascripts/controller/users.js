(function () {
  'use strict';

  angular
    .module('docMgmtApp')
    .controller('UsersCtrl', UsersCtrl);

  UsersCtrl.$inject = ['UserService','$rootScope', '$scope', '$auth', '$location', 'FlashService'];
  function UsersCtrl(UserService, $rootScope, $scope,  $auth, $location, FlashService) {
    $scope.submit = function register() {
      $auth.submitRegistration({
        name:                 $scope.user.name,
        email:                 $scope.user.email,
        password:              $scope.user.password,
        password_confirmation: $scope.user.passwordConfirmation,
      })
      .then(function(resp) {
        FlashService.Success('Registration successful', true);
        $location.path('/sign_in');
      })
      .catch(function(resp) {
        FlashService.Error(response.message);
      });
    }
  }

})();