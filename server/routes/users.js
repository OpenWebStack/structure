/**
 * Example web services. 
 * One would normally communicate with a database to get the data.
 */
module.exports = function(app){
  
  //mock data (nasty little hobbitses)
  var users = [
    {name: 'Frodo', id: 1},
    {name: 'Samwise', id: 2},
    {name: 'Merry', id: 3},
    {name: 'Pippin', id: 4}
  ];

  //get all users
  app.get('/user', function(req, res){
    //real service would get all users from a real data source
    res.send(users);
  });

  //get user
  app.get('/user/:id', function(req, res){
    //real service would get user from a real data source
    var id = parseInt(req.params.id, 10);
    var user = getUser(id);
    res.send(user);
  });

  //update user
  app.put('/user/:id', function(req, res){
    var user = req.body;
    //real service would update a real data source
    user.awesome = true;
    users[user.id-1] = user;
    //return updated user
    res.send(user);
  });

  //create user
  app.post('/user', function(req, res){
    var user = req.body;
    //real service would add user in a real data source
    user.id = users.length;
    user.cool = true;
    users.push(user);
    //return the updated user with 201 Created
    res.set("content-location", "/users/"+user.id);
    res.send(201, user);
  });

  //delete user
  app.del('/user/:id', function(req, res){
    //real service would delete from a real data source
    var id = parseInt(req.params.id, 10);
    var user = getUser(id);
    if (user) users.splice(user.id-1, 1);
    //return 204 No Content
    res.send(204);
  });

  /**
   * get user by id
   * real service would interact with a real data source
   * @param  {String} id
   * @return {Object} user
   */
  function getUser(id){
    return users.filter(function(user){
      return user.id === id;
    })[0];
  }
};
