angular.module('seniorHealth.controllers', ['LocalStorageModule'])

.controller('TodayCtrl', function($scope) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.$apply();
  });
})

.controller('WeekCtrl', function($scope) {
  $scope.$on('$ionicView.enter', function(e) {
    $scope.$apply();
  });
})

.controller('SettingsCtrl', function($scope) {
})

.controller('ApiController', function(ApiFactory, $scope, $ionicPopup, popupFactory, AlarmFactory) {
  var self = this;

  self.callApi = function(period) {
    ApiFactory.query(period)
    .then(function(response){
      self.result = response.data;
    });
  };

  $scope.doRefresh = function(period) {
     self.callApi(period);
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply();
  };

 $scope.showPopup = function() {
   $scope.data = {};
   var myPopup = popupFactory.getPopup($scope, AlarmFactory);
   myPopup.then(function(res) {
     console.log('Tapped!', res);
   });
  };
})

.controller('AlarmController', function(ApiFactory, AlarmFactory, $scope, $ionicPopup, popupFactory) {
  var self = this;
  self.allAlarms = [];

  self.getAlarms = function() {
    AlarmFactory.getAll().then(function(response){
      self.allAlarms = response.data.trackerAlarms;
    });
  };

  // self.deleteAlarm = function() {
  //   deleteAlarm.query(window.localStorage.pillAlarm);
  // };

  // self.updateAlarm = function() {
  //   updateAlarm.query(window.localStorage.pillAlarm);
  // };
  //
  // self.setAlarms = function() {
  //   ApiFactoryPost.query(self.pillAlarm);
  //   self.pillAlarm = window.localStorage.pillAlarm;
  // };
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
});
