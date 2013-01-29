/*
 * This controller demonstrates computed properties
 */
var VersionFilter = require("../filters/version")
  , VersionService = require("../services/version");

module.exports = function(app, name){
  app.controller(name, ['$scope', VersionService, function($scope, version){
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
};