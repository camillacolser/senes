var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;
var seniorIdTest = 2;
var seniorIdProduction = window.localStorage.seniorId;
var seniorId = seniorIdTest;

angular.module('seniorHealth.services', ['ionic'])

.factory('ApiFactory', ['$http', function($http) {
  var id = seniorId;
  return {
    query: function(period) {
      return $http({
        url: address+'/users/'+id+'/fitbit/' + period,
        method: 'GET'
      });
    }
  };
}])

.factory('AlarmFactory', ['$http', function($http) {
  // var id = window.localStorage.seniorId;
  var id = seniorId;
  return {
    getAll: function() {
      return $http({
        url: address+'/users/'+id+'/fitbit/alarms',
        method: 'GET'
      });
    }
  };
}])


.factory('ApiFactoryPost', ['$http', function($http) {
  var pillTime;
  var id = seniorId;
  return {
    query: function(pillAlarm) {
      pillTime = pillAlarm;
      pillTimeDate = new Date(pillTime);
      dateText = pillTimeDate.getHours()+":"+pillTimeDate.getMinutes();
      window.localStorage.pillAlarm = dateText;
      console.log(window.localStorage.pillAlarm);
      return $http({
        url: address+'/fitbit/set_alarm/?id=' + id + '&time=' + dateText ,
        method: 'GET'
      });
    }
  };
}])

.factory('deleteAlarm', ['$http', function($http) {
  var id;
  id = window.localStorage.seniorId;
  return {
    query: function(pillAlarm) {
      console.log(pillAlarm);
      return $http({
        url: address+'/fitbit/delete_alarm/?id=' + id + '&time=' + pillAlarm ,
        method: 'GET'
      });
    }
  };
}])

.factory('updateAlarm', ['$http', function($http) {
  var id;
  id = window.localStorage.seniorId;
  return {
    query: function(pillAlarm) {
      console.log(pillAlarm);
      return $http({
        url: address+'/fitbit/update_alarm/?id=' + id + '&time=' + pillAlarm ,
        method: 'GET'
      });
    }
  };
}])


.factory('popupFactory', ['$ionicPopup', function($ionicPopup, $scope) {
  function getPopup(scope) {
    return $ionicPopup.show({
      template: '<input type = "time" ng-model="data.model">',
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
  }

  return {
    getPopup: getPopup
  };
}])





.factory('FitbitLoginService', function($q) {
  var url = address+"/users/auth/fitbit_oauth2";
  var loginWindow, token, hasToken, userId, hasUserId, hasSeniorId;

  return {
    login: function() {
      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
        win.addEventListener("loadstart", function(event) {
        hasSeniorId = event.url.indexOf('seniorId=');
        if (hasSeniorId > -1) {
          window.localStorage.webUrl = event.url;
          window.localStorage.seniorId = event.url.match('&seniorId=(.*)')[1];
          window.localStorage.promise = 'promise resolved';
          win.close();
          location.href=location.pathname;
        }
      });
    }
  };
});
