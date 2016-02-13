angular.module('seniorHealth.controllers', [])

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
    self.result = ApiFactory.query();
  };
})

.controller('AuthenticationController', function($scope) {
  $scope.Authenticated = false;
  $scope.needsAuthentication = true;
});
