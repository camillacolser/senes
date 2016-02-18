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
  var self = this;


})

.controller('ApiController', function(ApiFactory, $scope, ApiFactoryPost) {
  var self = this;

  self.callApi = function() {
    ApiFactory.query()
    .then(function(response){
      self.result = response.data;
    });
  };

  self.setAlarms = function(pillAlarm) {
    console.log('number1');
    window.localStorage.pillAlarm = pillAlarm;
    ApiFactoryPost.query();
  };

  $scope.doRefresh =
   function() {
     self.callApi();
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply();
  };
})

.controller('AuthenticationController', function ($scope, $state) {
  // Check our local storage for the proper credentials to ensure we are logged in, this means users can't get past app unless they select a username
<<<<<<< HEAD
  if (window.localStorage.seniorId) {
<<<<<<< HEAD
    // ===== UNCOMMENT TWO LINES BELOW & comment 1 LINE ABOVE FOR STYLING =====
    // if (true) {
    // window.localStorage.seniorId = 1;
    // ==========
=======
>>>>>>> f21c8fb143a51445e8ca1d8b3f069107a110a57a
=======
  // if (window.localStorage.seniorId) {
    // ===== UNCOMMENT TWO LINES BELOW & comment 1 LINE ABOVE FOR STYLING =====
    if (true) {
    window.localStorage.seniorId = 1;
    // ==========
>>>>>>> 058eeb70fc43fc26d6b3bbd96daaee69dbcd86f8
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
<<<<<<< HEAD
<<<<<<< HEAD
  $scope.promise = window.localStorage.promise;
  $scope.url = window.localStorage.webUrl;
  $scope.seniorId = window.localStorage.seniorId;
=======
    $scope.promise = window.localStorage.promise;
    $scope.url = window.localStorage.webUrl;
    $scope.seniorId = window.localStorage.seniorId;
>>>>>>> f21c8fb143a51445e8ca1d8b3f069107a110a57a
=======
  $scope.promise = window.localStorage.promise;
  $scope.url = window.localStorage.webUrl;
  $scope.seniorId = window.localStorage.seniorId;
>>>>>>> 058eeb70fc43fc26d6b3bbd96daaee69dbcd86f8
});
