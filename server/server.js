var express = require('express');
var fs = require('fs');
var app = express();

//here's how to set things that routes may need access to (drivers, loggers, etc)
app.set('info', {name: "Open Web App"});

//development environment
app.configure('development', function(){
  //serve the static assets
  app.use(express.static('app'));
  //use requirejs-glob middleware
  app.use(require('requirejs-glob')());
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

app.listen(3000);