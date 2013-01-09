basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  //source files
  'app/js/lib/angular/angular.js',
  'app/js/lib/angular/angular-*.js',
  //test assertion lib and mocks
  'node_modules/expect.js/expect.js',
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

browsers = ['Chrome'];
require = 'expect';
reporters = ['dots'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
