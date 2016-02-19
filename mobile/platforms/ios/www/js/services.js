var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;
var seniorIdTest = 2;
var seniorIdProduction = window.localStorage.seniorId;
var seniorId = seniorIdProduction;

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
  var id = seniorId;
  return {
    getAll: function() {
      return $http({
        url: address+'/users/'+id+'/fitbit/alarms',
        method: 'GET'
      });
    },
    createAlarm: function(time) {
      parseTime = new Date(time);
      formatTime = parseTime.getHours()+":"+parseTime.getMinutes();
      return $http({
        url: address+'/users/'+id+'/fitbit/alarms/?time='+formatTime,
        method: 'POST'
      });
    },
    deleteAlarm: function(alarm_id) {
      return $http({
        url: address+'/users/'+id+'/fitbit/alarms/'+alarm_id,
        method: 'DELETE'
      });
    },
    updateAlarm: function(alarm_id, new_time) {
      return $http({
        url: address+'/users/'+id+'/fitbit/alarms/'+alarm_id+'?time='+new_time,
        method: 'PUT'
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

.factory('popupFactory', ['$ionicPopup', function($ionicPopup) {
  function getPopup($scope,  AlarmFactory) {
    return $ionicPopup.show({
      template: '<input type = "time" ng-model="data.tempPillAlarm">',
      title: 'Pill reminder',
      subTitle: '',
      scope: $scope,

      buttons: [
        { text: 'Cancel' }, {
          text: '<b>Save</b>',
          type: 'button-calm',
          onTap: function(e) {

            if (!$scope.data.tempPillAlarm) {
              //don't allow the user to close unless he enters model...
              e.preventDefault();
            } else {
              console.log($scope.data.tempPillAlarm);
              AlarmFactory.createAlarm($scope.data.tempPillAlarm);
              return $scope.data.tempPillAlarm;
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

.factory('popupFactoryUpdate', ['$ionicPopup', function($ionicPopup) {
  function getPopup($scope,  AlarmFactory, alarm_id) {
    return $ionicPopup.show({
      template: '<input type = "time" ng-model="data.tempPillAlarm">',
      title: 'Pill reminder',
      subTitle: '',
      cssClass: 'update-popup',
      scope: $scope,

      buttons: [
        { text: 'Cancel' }, {
          text: '<b>Save</b>',
          type: 'button-calm',
          onTap: function(e) {

            if (!$scope.data.tempPillAlarm) {
              e.preventDefault();
            } else {
              AlarmFactory.updateAlarm(alarm_id, $scope.data.tempPillAlarm);
              return $scope.data.tempPillAlarm;
            }
          }
        }, { text: 'X Remove alarm',
        onTap: function(e) {

          if (!$scope.data.tempPillAlarm) {
            e.preventDefault();
          } else {
            AlarmFactory.deleteAlarm(alarm_id);
            return $scope.data.tempPillAlarm;
          }
        } }
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
