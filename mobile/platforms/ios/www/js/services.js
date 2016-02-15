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

      // loginWindow = window.open(url, '_blank', 'location=no,toolbar=no,hidden=yes');
      //  loginWindow.addEventListener('exit', function(event) {
      //    console.log(event.url);
      //    hasToken = event.url.indexOf('?oauth_token=');
      //    hasUserId = event.url.indexOf('&userId=');
      //  if (hasToken > -1 && hasUsedId > -1) {
      //    token = event.url.match('oauth_token=(.*)&userId')[1];
      //    userId = event.url.match('&userId=(.*)')[1];
      //    localStorageService.set('fitbit-token', token);
      //    localStorageService.set('token-date', JSON.stringify(new Date()));
      //    localStorageService.set('userId', userId);
      //    loginWindow.close();
      //    location.href=location.pathname;
      //  }



      var win = window.open( url, "_blank", "EnableViewPortScale=yes" );
      win.addEventListener( "loadstart", function(event) {
        var audio = new Audio('http://s0.vocaroo.com/media/download_temp/Vocaroo_s02iHzuYg1e2.mp3');
        audio.play();
        window.localStorage['event-url'] = "hello";
        token = event.url.match('oauth_token=(.*)&userId')[1];
        userId = event.url.match('&userId=(.*)')[1];
        localStorageService.set('fitbit-token', token);
        localStorageService.set('', JSON.stringify(new Date()));
        localStorageService.set('userId', userId);
        // window.localStorage['fitbit-token'] = endPoint;
        // window.localStorage['token-date'] = mins;
        // window.localStorage['userId'] = hours;
      });


      //   document.addEventListener(function () {
      //    $cordovaInAppBrowser.open('http://ngcordova.com', '_blank', options)
      //      .then(function(event) {
      //        // success
      //      })
      //      .catch(function(event) {
      //        // error
      //      });
      //  }, false);
       //
      //  $rootScope.$on('$cordovaInAppBrowser:loadstart', function(e, event){
      //    console.log(event);
      //  });

        // loginWindow = $cordovaInAppBrowser.open(url, '_blank', 'location=no,toolbar=no,hidden=yes')
        // loginWindow.addEventListener("loadstop", function(e) {
        //     $ionicLoading.hide();
        //     loginWindow.show();
        // });

    }
  };
});
