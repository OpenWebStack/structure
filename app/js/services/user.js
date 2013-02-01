/*
 * User Service
 *
 * Fetches user information from a JSON API
 */

module.exports = function(app, name){
  app.factory(name, ["$resource", function($resource){
    return $resource('user/:id', {id: '@id'}, {
      //Angular does a POST by default for create and update
      //this adds an $update method that will do a PUT
      update: {method: 'PUT'}
    });  
  }]);
};