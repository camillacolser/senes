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
  var self = this;


})

.controller('ApiController', function(ApiFactory, $scope, ApiFactoryPost, $ionicPopup) {
  var self = this;

  self.callApi = function(period) {
    ApiFactory.query(period)
    .then(function(response){
      self.result = response.data;
    });
  };

  self.alarmDisplay = window.localStorage.alarmDisplay;

  self.pillAlarm = undefined;

  self.deleteAlarm = function() {
    ApiFactoryPost.query(self.pillAlarm);
    self.alarmDisplay = window.localStorage.alarmDisplay;
    $scope.$apply();
  };

  self.setAlarms = function() {
    ApiFactoryPost.query(self.pillAlarm);
    self.alarmDisplay = window.localStorage.alarmDisplay;
    $scope.$apply();
  };

  $scope.doRefresh =
   function(period) {
     self.callApi(period);
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply();
  };


  // When button is clicked, the popup will be shown...
   $scope.showPopup = function() {
      $scope.data = {};

      // Custom popup
      var myPopup = $ionicPopup.show({
         template: '<input type = "time" ng-model = "data.model">',
         title: 'Pill reminder',
         subTitle: '',
         scope: $scope,

         buttons: [
            { text: 'Cancel' }, {
               text: '<b>Save</b>',
               type: 'button-positive',
                  onTap: function(e) {

                     if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                           e.preventDefault();
                     } else {
                       ApiFactoryPost.query($scope.data.model);
                       self.alarmDisplay = window.localStorage.alarmDisplay;
                       $scope.$apply();
                        return $scope.data.model;
                     }
                  }
            }
         ]
      });

      myPopup.then(function(res) {
         console.log('Tapped!', res);
      });
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
