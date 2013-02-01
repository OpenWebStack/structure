/**
 * GOALS
 * Should be as reusable across projects as possible.
 * Projects should be able to `component install` any controller, directive, service etc
 * and use it without modification.
 * Should be as concise and boilerplate-free as possible.
 *
 * HOW
 * Decouple pieces from the project structure.
 * Decouple pieces from their runtime angular module (inject all the things).
 * Decouple pieces from config/bootstrap/routes.
 * Only `require` dependencies that ship as part of this component, 
 * keeping it portable across projects. Let Angular inject whatever is named 'User' at runtime.
 * 
 * CONS
 * These can't be used in a non-component project, unless built with --standalone.
 * Migration from Angular to Angular+Component entails modifying every file.
 * But apps that care about that could skip the module.exports wrapper and use a global `app`.
 */

/**
 * Manage user info through CRUD operations
 * @param  {Object} app  Angular Module to attach to
 */
module.exports = function(app){
  
  app.controller('MyCtrl1', ['$scope', 'User', function one ($scope, User){
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