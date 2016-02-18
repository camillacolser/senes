describe('factory: Api', function() {
  var httpBackend;
  var apiFactory;
  var heartRate = {
    restingHeartRate: 72
  };

  beforeEach(module('seniorHealth.services'));

  beforeEach(inject(function(ApiFactory, $httpBackend){
    apiFactory = ApiFactory;
    httpBackend = $httpBackend;
    httpBackend.when("GET", "http://localhost:3000/fitbit/undefined?id=undefined")
                .respond(heartRate);
  }));


  it('returns heart rate', function() {
    apiFactory.query().then(function(response) {
      expect(response.data).toEqual(heartRate);
    });
    httpBackend.flush();
  });
});
