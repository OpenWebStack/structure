/*
 * Module dependencies
 */
var express = require('express')
  , fs = require('fs');

//express app
var app = module.exports = express();

//all environments
app.configure(function(){
  // Log the requests
  app.use(express.logger("dev"));

  // Serve the static assets
  app.use(express.static(__dirname+'/../app'));
  app.use("/build", express.static(__dirname+'/../build'));

  // Parse the requests
  app.use(express.bodyParser());
});

//production environment
app.configure('production', function(){
  //put prod-specific stuff here
});

//here's how to set things that routes may need access to (drivers, loggers, etc)
app.set('info', {name: "Open Web App"});

//Wire up routes automatically
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  require('./routes/' + file)(app);
});