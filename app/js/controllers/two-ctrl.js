/* Example controller that has a dependency to be injected */

angular.module('app').controller('MyCtrl2', ['$timeout', function($timeout){
  //use $timeout
}]);