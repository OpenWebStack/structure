/*
 * Example web services.
 * One would normally communicate with a database to get the data
 */

/*
 * Our mock database
 *
 * nasty little hobbitses
 */
var users = [
  {name: 'Frodo', id: 1},
  {name: 'Samwise', id: 2},
  {name: 'Merry', id: 3},
  {name: 'Pippin', id: 4}
];

/*
 * Expose listing the users
 */
module.exports.index = function() {
  return function index(req, res, next) {
    //real service would get all users from a real data source
    res.send(users);
  };
};

/*
 * Expose viewing a user
 */
module.exports.view = function() {
  return function view(req, res, next) {
    var id = parseInt(req.params.id);

    // real service would get user from a real data source
    var user = users[id-1];
    
    res.send(user);
  };
};

/*
 * Expose editing a user
 */
module.exports.update = function() {
  return function update(req, res, next) {
    var id = parseInt(req.params.id)
      , user = users[id-1];

    // real service would get user from a real data source
    user.name = req.body.name;
    
    res.send(user);
  };
};

/*
 * Expose creating a user
 */
module.exports.create = function() {
  return function create(req, res, next) {
    var newUser = req.body;

    newUser.id = users.length;

    users.push(newUser);
    
    res.set("content-location", "/users/"+newUser.id);
    res.send(201, newUser);
  };
};

/*
 * Expose removing a user
 */
module.exports.remove = function() {
  return function remove(req, res, next) {
    var id = parseInt(req.params.id);

    users.splice(id-1, 1);

    res.send(204);
  };
};
