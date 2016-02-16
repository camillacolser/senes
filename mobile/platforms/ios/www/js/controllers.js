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

.controller('ApiController', function(ApiFactory, $scope) {
  var self = this;

  self.callApi = function() {
    ApiFactory.query()
    .then(function(response){
      self.result = response.data;
    });
  };

<<<<<<< HEAD
  $scope.doRefresh = function() {
     self.callApi();
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply();
  };

  $scope.$on('$ionicView.enter', function(e) {
    self.callApi();
    $scope.$apply();
  });
=======
  // self.doRefresh = function() {
  //   $scope.callApi();
  //   $scope.$broadcast('scroll.refreshComplete');
  //   $scope.$apply();
  // };
>>>>>>> d983e2c41f21c1c6b8478a9dda6ae3b425f2da18
})

.controller('AuthenticationController', function ($scope, $state) {
  // Check our local storage for the proper credentials to ensure we are logged in, this means users can't get past app unless they select a username
  if (window.localStorage.seniorId) {
    $scope.Authenticated = true;
  } else {
    $scope.needsAuthentication = true;
  }
  $scope.logout = function () {
    window.localStorage.clearAll();
    location.href=location.pathname;
  };

})


.controller('LoginController', function($scope,FitbitLoginService) {
  $scope.fitbitlogin = FitbitLoginService.login;
    $scope.promise = window.localStorage.promise;
    $scope.url = window.localStorage.webUrl;
    $scope.seniorId = window.localStorage.seniorId;
});
