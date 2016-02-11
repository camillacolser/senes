angular.module('app.controllers', [])

.controller('ApiController', function(ApiFactory) {

  var self = this;

  self.callApi = function() {
    self.result = ApiFactory.query();
  };
});
