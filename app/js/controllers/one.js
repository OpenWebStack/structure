/**
 * DESIGN IDEA
 * decouple this ng controller from the module, name, and directory structure
 * controller can be reused across many projects easily
 * no need to export anything
 *
 * PROS
 * controller can be reused across many projects easily
 * 
 * CONS
 * this directive can't be used in a non-component project, unless built with --standalone.
 *
 * QUESTIONS
 * what to do about dependencies? Should I require in the services here or elsewhere?
 */

/**
 * Manage user info through CRUD operations
 * @param  {Object} app  Angular Module to attach to
 * @param  {String} name what to name the controller
 */
module.exports = function(app, name){
  //Module dependencies... inject via component?
  //probably should only "require" things that ship as part of this component, to keep it portable
  var UserService = require("../services/user");

  app.controller(name, ['$scope', UserService, function($scope, User){
    var users = User.query(function(){
      $scope.users = users;
    });

    $scope.saveAll = function(){
      $scope.users.forEach(function(user){
        user.$update();
      });
    };
  }]);
};