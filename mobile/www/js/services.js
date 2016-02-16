var remoteUrl = 'https://senior-health.herokuapp.com';
var localUrl = 'http://localhost:3000';
var address = localUrl;

angular.module('seniorHealth.services', ['LocalStorageModule', 'ionic'])

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

.factory('FitbitLoginService', function(localStorageService, $rootScope, $cordovaInAppBrowser, $ionicPopup) {
  var url = address+"/users/auth/fitbit_oauth2";
  var loginWindow, token, hasToken, userId, hasUserId;

  return {
    login: function() {
      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
      win.addEventListener( "loadstart", function(event) {
        var audio = new Audio('http://s0.vocaroo.com/media/download_temp/Vocaroo_s02iHzuYg1e2.mp3');
        audio.play();
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
