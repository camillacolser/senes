var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;

angular.module('seniorHealth.services', ['ionic'])

.factory('ApiFactory', ['$http', function($http) {
  var id;
  id = window.localStorage.seniorId;
  return {
    query: function() {
      return $http({
        url: address+'/fitbit/overall?id=' + id ,
        method: 'GET'
      });
    }
  };
}])



.factory('ApiFactoryPost', ['$http', function($http) {
  var pillTime;
  var id;
  id = window.localStorage.seniorId;
  return {
    query: function(pillAlarm) {
      pillTime = pillAlarm;
      pillTimeDate = new Date(pillTime);
      dateText = pillTimeDate.getHours()+":"+pillTimeDate.getMinutes();
      return $http({
        url: address+'/fitbit/set_alarm/?id=' + id + '&time=' + dateText ,
        method: 'GET'
      });
    }
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
