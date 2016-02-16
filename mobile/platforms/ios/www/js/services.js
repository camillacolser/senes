var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;

angular.module('seniorHealth.services', ['ionic'])

.factory('ApiFactory', ['$http', function($http) {
  return {
    query: function() {
      return $http({
        url: address+'/fitbit/heart',
        method: 'GET'
      });
    }
  };
}])

.factory('FitbitLoginService', function($q) {
  var url = address+"/users/auth/fitbit_oauth2";
  var loginWindow, hasUserId;

  return {
    login: function() {
      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
      win.addEventListener("loadstart", function(event) {
      hasUserId = event.url.indexOf('id=');
      if (hasUserId > -1) {
        window.localStorage.webUrl = event.url;
        window.localStorage.userId = event.url.match('id=(.*)')[1];
        win.close();
        location.href=location.pathname;
        }
      });
    }
  };
});
