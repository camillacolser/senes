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
  mocks: {
    default: ['heartrate'], // default value: []
    dir: 'mocks' // default value: 'mocks'
  },
  onPrepare: function() {
   var jasmineReporters = require('jasmine-reporters');
   jasmine.getEnv().addReporter(new jasmineReporters.TerminalReporter({
     verbosity: 10,
     color: true,
     showStack: true
   }));
   require('protractor-http-mock').config = {
     rootDirectory: (__dirname), // default value: process.cwd()
     protractorConfig: 'conf.js' // default value: 'protractor.conf'
   };
 }
};
