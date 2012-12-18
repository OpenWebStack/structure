basePath = '../';

files = [
  MOCHA,
  MOCHA_ADAPTER,
  // 'app/lib/angular/angular.js',
  // 'app/lib/angular/angular-*.js',
  // 'test/lib/angular/angular-mocks.js',
  // 'app/js/**/*.js',
  // 'test/unit/**/*.js'
  // 'node_modules/expect.js/expect.js',
  'test/browser/**/*.js'
];
//TODO figure out how to parse the --require arg
files.push('node_modules/expect.js/expect.js');

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
