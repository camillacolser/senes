angular.module('seniorHealth.services', [])

.factory('ApiFactory', ['$http', function($http) {
  return {
    query: function() {
      return $http({
        url: 'https://senior-health.herokuapp.com/fitbit/heart',
        method: 'GET'
      });
    }
  };
}]);
