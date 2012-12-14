/* Configure RequireJS and load all JS files
  TODO: make a `grunt bootstrap` task that generates this thing
 */
require.config({
  shim: {
    'app': ['lib/angular/angular']
  },
  paths: {
    'templates': '../templates',
    'ng': 'lib/ng',
    'text': 'lib/text'
  }
});

require(['app'], function(){
  //now that the app module loaded
  require([
    'ng!templates/partial1.html',
    'ng!templates/partial2.html',
    'controllers/one-ctrl', 
    'controllers/two-ctrl',
    'services/version-service', 
    'filters/version-filter',
    'directives/version-directive'
  ], 
  function(){
    //now that all the module's files are loaded
    angular.bootstrap(document, ['app']);
  });
});