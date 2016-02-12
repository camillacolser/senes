exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['appFeature.js'],
  capabilities: {
    browserName: 'chrome'
  },
  baseUrl: 'http://localhost:8100',
  jasmineNodeOpts: {
    isVerbose:true,
  },
  onPrepare: function() {
   var jasmineReporters = require('jasmine-reporters');
   jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
     verbosity: 10,
     color: true,
     showStack: true
   }));
 }
};
