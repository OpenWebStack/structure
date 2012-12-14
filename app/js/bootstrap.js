/* Configure RequireJS and load all JS files */
require.config({
  shim: {
    'app': ['lib/angular/angular']
  }
});

require(['app'], function(){
  //now that the app module loaded
  require([
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