/**
 * Protractor based e2e tests.
 * @author Nimmi
 */

var htmlReporter = require('protractor-jasmine2-html-reporter');

exports.config = {
  specs: ['test/server.js', 'test/client.js', 'test/utils_test.js'],
  framework: 'jasmine2',
  type: 'node',
  directConnect: true,
  multiCapabilities: [{
    browserName: 'chrome',
    chromeOptions: { args: ['--no-sandbox'] },
    count: 1
  }],

  onPrepare: function ()
  {
    jasmine.getEnv().addReporter (
      new htmlReporter ({
       savePath : '/var/reports/e2e'
      })
    );
    browser.get('http://localhost:8000');
  },

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000,
  }
}