/*
 * Module dependencies
 */
var app = require("..")
  , UserService = require("../services/user");

/*
 * MyCtrl1
 *
 * Manages user info through CRUD operations
 */
function MyCtrl1($scope, User) {
  var users = User.query(function(){
    $scope.users = users;
  });

  $scope.saveAll = function(){
    $scope.users.forEach(function(user){
      user.$update();
    });
  };
};

/*
 * Register it with angular
 */
app.controller(MyCtrl1.name, [
  '$scope',
  UserService,
  MyCtrl1
]);

/*
 * Let others know where to find it
 */
module.exports = MyCtrl1.name;
