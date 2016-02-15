var mock = require('protractor-http-mock');

describe('Senior Ionic', function() {
  var today = element(by.css('h1'));
  var todayTab = element(by.linkText('Today'));
  var weekTab = element(by.linkText('Week'));
  var settingsTab = element(by.linkText('Settings'));
  var heartRate = element(by.css('.heart-rate'));
  var heartRateWeek = element(by.css('#heart-rate-week'));
  var loginButton = element(by.css('.login-button'));
  var stepCount = element(by.css('#step-count'));
  var stepCountWeek = element(by.css('#step-count-week'));
  var sleep = element(by.css('#sleep'));
  var sleepWeek = element(by.css('#sleep-week'));
  var smileyIcon = element(by.css('.smiley-icon'));

 //  myAppDev = angular.module('myAppDev', ['seniorHealth', 'ngMockE2E']);
 //  myAppDev.run(function($httpBackend) {
 //   heartRate = {restingHeartRate: 70};
 // });
  beforeEach(function() {
    browser.get('http://localhost:8100');
    // $httpBackend.whenGET('https://senior-health.herokuapp.com/fitbit/heart').respond(heartRate);
  });
  describe('when logged out', function() {
    xit('user can view a log in button when logged out', function() {
      expect((loginButton).isPresent()).toBe(true);
    });

    xit('user can log in', function() {
      loginButton.click();
      expect(browser.getTitle()).toEqual('Today');
    });

    xit('user cannot view tabs', function() {
      expect(smileyIcon.isPresent()).toBe(false);
    });
  });

  describe('when logged in', function() {
    describe('\'Today\' tab', function(){
      it('displays the \'Today \' tab when clicked on', function() {
        todayTab.click();
        expect(browser.getTitle()).toEqual('Today');
      });

      it('displays heart rate', function() {
        expect(heartRate.getText()).toContain('70 bpm');
      });

      it('displays step count', function() {
        expect(stepCount.getText()).toContain('1000');
      });

      it('displays sleep', function() {
        expect(sleep.getText()).toContain('7 hours');
      });
    });

    describe('\'Week\' tab', function() {
      beforeEach(function() {
        browser.get('http://localhost:8100');
        weekTab.click();
      });

      it('displays the \'Week\' tab when clicked on', function() {
        expect(browser.getTitle()).toEqual('Weekly Summary');
      });

      it('displays heart rate', function() {
        expect(heartRateWeek.getText()).toContain('70 bpm');
      });

      it('displays step count', function() {
        expect(stepCountWeek.getText()).toContain('1000');
      });

      it('displays sleep', function() {
        expect(sleepWeek.getText()).toContain('7 hours');
      });
    });

    describe('\'Settings\' tab', function() {
      it('displays the \'Settings\' tab when clicked on', function() {
        settingsTab.click();
        expect(browser.getTitle()).toEqual('Settings');
      });
    });
  });

});
