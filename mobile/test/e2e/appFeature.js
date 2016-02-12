var mock = require('protractor-http-mock');

describe('Senior Ionic', function() {
  var today = element(by.css('h1'));
  var week = element(by.linkText('Week'));
  var heartRate = element(by.css('.item'));

  myAppDev = angular.module('myAppDev', ['seniorHealth', 'ngMockE2E']);
  myAppDev.run(function($httpBackend) {
   heartRate = {restingHeartRate: 70};
 });
  beforeEach(function() {
    browser.get('http://localhost:8100');
    $httpBackend.whenGET('https://senior-health.herokuapp.com/fitbit/heart').respond(heartRate);
  });

  it('displays the \'today \' tab by default', function() {
    expect(browser.getTitle()).toEqual('Today');
  });

  it('displays the \'week\' tab when clicked on', function() {
    week.click();
    expect(browser.getTitle()).toEqual('Week');
  });

  it('displays heart rate on the \'today\' tab', function() {
    expect(heartRate.getText()).toContain('70');
  });
});
