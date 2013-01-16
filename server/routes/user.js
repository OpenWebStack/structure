/* Example web services. Would normally communicate with a database to get the data */
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
    console.log('get all');
    //real service would get all users from a real data source
    res.send(users);
  });

  //get user
  app.get('/user/:id', function(req, res){
    console.log('get');
    //real service would get user from a real data source
    var user = users.filter(function(user){
      return user.id === parseInt(req.params.id, 10);
    })[0];
    res.send(user);
  });

  //edit user
  app.put('/user/:id', function(req, res){
    console.log('edit');
    var user = req.body;
    //real service would update a real data source, then return edited user
    user.awesome = true;
    res.send(user);
  });

  //add user
  app.post('/user', function(req, res){
    console.log('add');
    var user = req.body;
    //real service would add user in a real data source, then return updated user
    user.cool = true;
    res.send(user);
  });

  //delete user
  app.del('/user/:id', function(req, res){
    console.log('delete');
    //real service would delete from a real data source
    res.send({});
  });
};