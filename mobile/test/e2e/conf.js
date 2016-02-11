exports.config = {

  seleniumAddress: 'http://localhost:4444/wd/hub',

  specs: ['appFeature.js'],

  capabilities: { browserName: 'chrome' },

  baseUrl: 'http://localhost:8100',
  jasmineNodeOpts: {
    showColors: true,
    print: function() {}
  },

  onPrepare: function() {
    var SpecReporter = require('jasmine-spec-reporter');
    jasmine.getEnv().addReporter(new SpecReporter({displayStacktrace: 'all'}));
  }
};
