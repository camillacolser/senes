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

<<<<<<< HEAD
.controller('ApiController', function(ApiFactory, $scope, $ionicPopup, popupFactory, AlarmFactory) {
=======
.controller('ApiController', function(ApiFactory, $scope, ApiFactoryPost, deleteAlarm, $ionicPopup, updateAlarm) {
>>>>>>> 6dc61a75f6ec625c295391ebe4150eaf08de0aa1
  var self = this;

  self.callApi = function(period) {
    ApiFactory.query(period)
    .then(function(response){
      self.result = response.data;
    });
  };

<<<<<<< HEAD
  $scope.doRefresh = function(period) {
=======
  self.alarmDisplay = window.localStorage.alarmDisplay;


  self.deleteAlarm = function() {
    deleteAlarm.query(window.localStorage.pillAlarm);
  };

  self.updateAlarm = function() {
    updateAlarm.query(window.localStorage.pillAlarm);
  };

  self.setAlarms = function() {
    ApiFactoryPost.query(self.pillAlarm);
    self.pillAlarm = window.localStorage.pillAlarm;
  };

  $scope.doRefresh =
   function(period) {
>>>>>>> 6dc61a75f6ec625c295391ebe4150eaf08de0aa1
     self.callApi(period);
     $scope.$broadcast('scroll.refreshComplete');
     $scope.$apply();
  };

<<<<<<< HEAD
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
=======

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
>>>>>>> 6dc61a75f6ec625c295391ebe4150eaf08de0aa1
})

.controller('AuthenticationController', function ($scope) {
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

    window.localStorage.clear();
    location.href=location.pathname;
  };

})


.controller('LoginController', function($scope,FitbitLoginService) {
  $scope.fitbitlogin = FitbitLoginService.login;
});
