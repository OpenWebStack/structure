/* Declare templates module, used for pre-loading templates */
angular.module('templates', []);

/* Declare app module that has dependencies on the templates and ngResource modules */
angular.module('app', ['templates', 'ngResource']).
  config(['$routeProvider', function($routeProvider) {
    //setup URL routes
    $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
