/**
 * Configure RequireJS and load all project files
 */
require.config({
  glob: 'app/js/',
  shim: {
    'app': ['lib/angular/angular']
  },
  paths: {
    'templates': '../templates',
    'ng': 'lib/ng',
    'text': 'lib/text',
    'glob': '../components/requirejs-glob/lib/glob'
  }
});

require(['app'], function(){
  //now that the app module is loaded
  require([
    'lib/angular/angular-resource',
    'ng!templates/partial1.html',
    'ng!templates/partial2.html',
    // 'ng!templates/**/*.html', //TODO
    'glob!controllers/**/*.js',
    'glob!services/**/*.js',
    'glob!filters/**/*.js',
    'glob!directives/**/*.js',
  ], 
  function(){
    //now that all the module's files are loaded
    angular.bootstrap(document, ['app']);
  });
});