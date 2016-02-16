angular.module('seniorHealth.controllers', ['LocalStorageModule'])

.controller('TodayCtrl', function($scope) {})

.controller('WeekCtrl', function($scope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
})

.controller('SettingsCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})

.controller('ApiController', function(ApiFactory) {
  var self = this;

  self.callApi = function() {
    ApiFactory.query()
    .then(function(response){
      
      self.result = response.data;
    });
  };
})

.controller('AuthenticationController', function($scope) {
  $scope.Authenticated = false;
  $scope.needsAuthentication = true;
})

.controller('LoginController', function($scope,FitbitLoginService) {
  message = "not yet clicked on login";
  $scope.response = message;
  $scope.fitbitlogin = FitbitLoginService.login;
});
