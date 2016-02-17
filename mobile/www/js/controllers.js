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
    console.log(pillAlarm);
    pillTimeDate = new Date(pillAlarm);
    console.log(pillTimeDate);
    dateText = pillTimeDate.getHours()+":"+pillTimeDate.getMinutes();
    console.log(dateText);
    window.localStorage.pillAlarm = dateText;
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
  if (window.localStorage.seniorId) {
    // ===== UNCOMMENT TWO LINES BELOW & comment 1 LINE ABOVE FOR STYLING =====
    // if (true) {
    // window.localStorage.seniorId = 1;
    // ==========
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
