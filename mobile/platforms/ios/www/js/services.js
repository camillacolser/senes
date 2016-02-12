angular.module('starter.services', [])

.factory('ApiFactory', ['$http', function($http) {
  return {
    query: function() {
      return {
        heartRate : 72
      };
    }
  };
}]);
