var express = require('express');
var fs = require('fs');
var app = express();

//here's how to set things that routes may need access to (drivers, loggers, etc)
app.set('info', {name: "Open Web App"});

//all environments
app.configure(function(){
  //serve the static assets
  app.use(express.static('app'));
});

//production environment
app.configure('production', function(){
  //serve the optimized static assets
  app.use(express.static('app-build'));
});

//middleware
app.use(express.bodyParser());
app.use(require('./middleware/logging')());

//routes
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  require('./routes/' + file)(app);
});

//require-on-steroids
/*TODO
  -make globFrom configurable
  -move into own package & repo
  -only load in development
  -consider standalone for non-node backends
*/
var globsync = require('glob-whatev');
var path = require('path');
app.get('/require-on-steroids', function(req, res){
  var files = [];
  var glob = req.query.glob;
  var globFrom = 'app/js/';
  globsync.glob(globFrom + glob).forEach(function(filepath) {
    //strip off the globFrom
    filepath = filepath.split(globFrom)[1];
    //strip of the extension
    filepath = filepath.split(path.extname(filepath))[0];
    files.push(filepath);
  });
  res.send(files);
});

app.listen(3000);