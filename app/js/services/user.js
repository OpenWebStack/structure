/*
 * Module dependencies
 */
var services = require("angular").module("app.services");

/*
 * User service will fetch the user information 
 */
module.exports = services.factory('User', [
  '$resource',
  function($resource){
    return $resource('users/:id', {id: '@id'}, {
      //Angular does a POST by default for create and update
      //this adds an $update method that will do a PUT
      update: {method: 'PUT'}
    });
  }
]);
