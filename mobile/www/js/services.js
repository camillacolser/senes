var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;

angular.module('seniorHealth.services', ['LocalStorageModule', 'ionic'])

.factory('ApiFactory', ['$http', function($http) {
  window.localStorage['devise-id'] = '1';
  id = window.localStorage['devise-id'];
  return {
    query: function() {
      return $http({
        url: address+'/fitbit/overall?id=' + id ,
        method: 'GET'
      });
    }
  };
}])

.factory('FitbitLoginService', function(localStorageService, $rootScope, $cordovaInAppBrowser, $ionicPopup) {
  var url = address+"/users/auth/fitbit_oauth2";
  var loginWindow, token, hasToken, userId, hasUserId;

  return {
    login: function() {
      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
      win.addEventListener( "loadstart", function(event) {
        window.localStorage['event-url'] = event.url;
        token = event.url.match('oauth_token=(.*)&userId')[1];
        userId = event.url.match('&userId=(.*)')[1];
        id = event.url.match('&id=(.*)')[1];
        window.localStorage['fitbit-token'] = token;
        window.localStorage['token-date'] =  JSON.stringify(new Date());
        window.localStorage['user-id'] = userId;
        window.localStorage['devise-id'] = id;

        // localStorageService.set('fitbit-token', token);
        // localStorageService.set('',);
        // localStorageService.set('userId', userId);
      });
    }
  };
});
