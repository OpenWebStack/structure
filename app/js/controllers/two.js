/*
 * Module dependencies
 */
var controllers = require("angular").module("app.controllers");

/*
 * User service will fetch the user information 
 */
module.exports = controllers.controller('MyCtrl2', [
  '$scope',
  'version',

  function($scope, version){
    $scope.people = ['Jim', 'Jimmies', 'Jummy'];

    //has a dependency on our version service, which we will mock out when testing this controller
    $scope.version = version + '!';

    //computed property
    $scope.longestName = function(){
      return $scope.people.reduce(function(prev, curr){
        return prev.length > curr.length ? prev : curr;
      });
    };
  }
]);
