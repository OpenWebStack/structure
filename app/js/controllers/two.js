/*
 * Module dependencies
 */
var app = require("..")
  , VersionFilter = require("../filters/version")
  , VersionService = require("../services/version");

/*
 * MyCtrl2
 *
 * Demonstrates computed properties
 */
function MyCtrl2($scope, version) {
  $scope.people = ['Jim', 'Jimmies', 'Jummy'];

  //has a dependency on our version service, which we will mock out when testing this controller
  $scope.version = version + '!';

  //computed property
  $scope.longestName = function(){
    return $scope.people.reduce(function(prev, curr){
      return prev.length > curr.length ? prev : curr;
    });
  };
};

/*
 * Register it with angular
 */
app.controller(MyCtrl2.name, [
  '$scope',
  VersionService,
  MyCtrl2
]);

/*
 * Let others know where to find it
 */
module.exports = MyCtrl2.name;
