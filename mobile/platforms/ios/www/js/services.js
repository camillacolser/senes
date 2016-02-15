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

.factory('FitbitLoginService', function($window, localStorageService) {
  var url = address+"/users/auth/fitbit_oauth2";
  var loginWindow, token, hasToken, userId, hasUserId;

  return {
    login: function() {
        loginWindow = $window.open(url, '_blank', 'location=no,toolbar=no,hidden=yes');
        console.log("here");
        loginWindow.addEventListener("loadstop", function(e) {
            $ionicLoading.hide();
            loginWindow.show();
        });
        loginWindow.addEventListener('loadstart', function(event) {
          console.log(event.url);
          hasToken = event.url.indexOf('?oauth_token=');
          hasUserId = event.url.indexOf('&userId=');
        if (hasToken > -1 && hasUsedId > -1) {
          token = event.url.match('oauth_token=(.*)&userId')[1];
          userId = event.url.match('&userId=(.*)')[1];
          localStorageService.set('fitbit-token', token);
          localStorageService.set('token-date', JSON.stringify(new Date()));
          localStorageService.set('userId', userId);
          loginWindow.close();
          location.href=location.pathname;
        }
      });
    }
  };
});
