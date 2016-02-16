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
  var loginWindow, token, hasToken, userId, hasUserId;

  return {
    login: function() {
      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
      win.addEventListener("loadstart", function(event) {
      hasToken = event.url.indexOf('oauth_token=');
      hasUserId = event.url.indexOf('userId=');
      if (hasToken > -1 && hasUserId > -1) {
        window.localStorage.webUrl = event.url;
        window.localStorage.token = event.url.match('oauth_token=(.*)&userId')[1];
        window.localStorage.userId = event.url.match('&userId=(.*)')[1];
        win.close();
        location.href=location.pathname;
        }
      });
    }
  };
});
