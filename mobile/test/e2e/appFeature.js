var mock = require('protractor-http-mock');

describe('Senior Ionic', function() {
  var today = element(by.css('h1'));
  var week = element(by.linkText('Week'));
  var heartRate = element(by.css('.item'));

  beforeEach(function() {
    var response = {
      request: {
        path: 'https://senior-health.herokuapp.com/fitbit/heart',
        method: 'GET'
      },
      response: {
        data: {
          restingHeartRate: 70
        }
      }
    };
    var test = mock([response]);
    console.log(response);
    console.log(test);
    browser.get('http://localhost:8100');
  });

  afterEach(function() {
    mock.teardown();
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
