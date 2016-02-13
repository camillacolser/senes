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
    httpBackend.when("GET", "https://senior-health.herokuapp.com/fitbit/heart")
                .respond(heartRate);
  }));


  it('returns heart rate', function() {
    apiFactory.query().then(function(response) {
      expect(response.data).toEqual(heartRate);
    });
    httpBackend.flush();
  });
});
