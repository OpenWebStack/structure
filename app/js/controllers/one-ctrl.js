/* Example controller that uses a service to communicate with a REST web service */
angular.module('app').controller('MyCtrl1', function($scope, User){
  
  //get all users
  var users = User.query(function(){
    $scope.users = users;
  });

  $scope.saveAll = function(){
    $scope.users.forEach(function(user){
      user.$update();
    });
  };

  /* 
   * Here are some other things you can do with resources.
  */ 

  //here's how to fetch a resource from the server
  /*
  var user = User.get({id: 2}, function(){
    //here's how to update a resource
    user.$update(function(){
      //whatever is sent back by server is automatically set by Angular
      console.log('user.awesome', user.awesome); //thanks server!
    });

    //here's how to delete a resource from the server
    user.$delete();
  });
  */

  //here's how to create a new resource
  /*
  var user2 = new User();
  user2.neat = true;
  user2.$save();
  */

});