module.exports = function(app){
  app.get('/about', function(req, res){
    res.end('<h1>About</h1>');
  });
};