/* 
TODO 
  actually test the controllers to make sure we have things setup right
*/

var argv = require('optimist').argv;
var assertion = argv.require;

var assertionLibs = {
  'expect': 'node_modules/expect.js/expect.js',
  'should': null //can't use should in browser
}

basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  //source files
  'app/js/lib/angular/angular.js',
  'app/js/lib/angular/angular-*.js',
  'test/lib/angular/angular-mocks.js',
  //main app module
  'app/js/app.js',
  //everything else
  'app/js/**/*.js',
  //tests to run
  'test/browser/**/*.js'
];

//keep it simple: exclude any AMD/bootstrapping stuff
exclude = [
  'app/js/bootstrap.js',
  'app/js/lib/ng.js'
];

if(assertion){
  if(assertion === 'should'){
    console.log("WARNING: should.js is intented for Node tests, not browsers."+
      "Please use expect.js for browser tests.");
  }
  if(!assertionLibs[assertion]) console.log('WARNING: the only current option for browser assertion is "expect". Please update your Gruntfile.js');
  files.push(assertionLibs[assertion]);
}

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
