/*
 * Module dependencies
 */
var app = require("..");

/*
 * User Service
 *
 * Fetches user information from a JSON API
 */
function User($resource) {
  return $resource('users/:id', {id: '@id'}, {
    //Angular does a POST by default for create and update
    //this adds an $update method that will do a PUT
    update: {method: 'PUT'}
  });
};

/*
 * Register it with angular
 */
app.factory(User.name, [
  "$resource",
  User
]);

/*
 * Let others know where to find it
 */
module.exports = User.name;
