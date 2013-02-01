/*
 * This controller demonstrates computed properties
 */
  angular.module('open-web-stack-app').controller('MyCtrl2', ['$scope', 'version', function($scope, version){
    $scope.people = ['Jim', 'Jimmies', 'Jummy'];
    //has a dependency on our version service, which we will mock out when testing this controller
    $scope.version = version + '!';

    //computed property
    $scope.longestName = function(){
      return $scope.people.reduce(function(prev, curr){
        return prev.length > curr.length ? prev : curr;
      });
    };
  }]);