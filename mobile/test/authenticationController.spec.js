describe('AuthenticationController', function() {
  var scope;
  beforeEach(module('seniorHealth.controllers'));

  beforeEach(inject(function($rootScope, $controller){
    scope = $rootScope.$new();
    $controller('AuthenticationController', {$scope: scope});
  }));

  describe('initializes', function() {
    it('with authenticated set to false', function() {
      expect(scope.Authenticated).toBeUndefined();
    });

    it('with needsAuthentication set to true', function() {
      expect(scope.needsAuthentication).toBeTruthy();
    });
  });
});
