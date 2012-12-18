/* Declare templates module, used for pre-loading templates */
angular.module('templates', []);

/* Declare app module */
angular.module('app', ['templates']).
  config(['$routeProvider', function($routeProvider) {
    //setup URL routes
    $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
