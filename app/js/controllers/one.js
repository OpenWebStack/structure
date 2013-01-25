/*
 * Module dependencies
 */
var controllers = require("angular").module("app.controllers");

/*
 * User service will fetch the user information 
 */
module.exports = controllers.controller('MyCtrl1', [
  '$scope',
  'User',

  function($scope, User){
    var users = User.query(function(){
      $scope.users = users;
    });

    $scope.saveAll = function(){
      $scope.users.forEach(function(user){
        user.$update();
      });
    };
  }
]);
