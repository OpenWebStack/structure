/**
 * DESIGN IDEA
 * Decouple this ng controller from the module, name, and directory structure
 * Controller can be reused across many projects easily
 * No need to export anything
 * Only `require` dependencies that ship as part of this component, 
 * keeping it portable across projects. Let Angular inject whatever is named 'User' at runtime
 * 
 * PROS
 * controller can be reused across many projects easily
 * 
 * CONS
 * this directive can't be used in a non-component project, unless built with --standalone.
 *
 * QUESTIONS
 */

/**
 * Manage user info through CRUD operations
 * @param  {Object} app  Angular Module to attach to
 * @param  {String} name what to name the controller
 */
module.exports = function(app, name){

  app.controller(name, ['$scope', 'User', function($scope, User){
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