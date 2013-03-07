/* Declare app module that has dependency on ngResource */
angular.module('app', ['ngResource']).
  config(['$routeProvider', function($routeProvider) {
    //setup URL routes
    $routeProvider.when('/view1', {templateUrl: 'templates/partial1.html', controller: 'MyCtrl1'});
    $routeProvider.when('/view2', {templateUrl: 'templates/partial2.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/view1'});
  }]);
