/*
 * Module dependencies
 */
var express = require('express')
  , fs = require('fs')
  , about = require("./routes/about")
  , users = require("./routes/users");

/*
 * Expose the app
 */
var app = module.exports = express();


app.configure(function(){
  // Log the requests
  app.use(express.logger("dev"));

  // Serve the static assets
  app.use(express.static(__dirname+'/../app'));
  app.use("/build", express.static(__dirname+'/../build'));

  // Parse the requests
  app.use(express.bodyParser());
});

/*
 * Routes
 */
// About
app.get("/about", about.index());
// Users
app.get("/users", users.index());
app.post("/users", users.create());
app.get("/users/:id", users.view());
app.put("/users/:id", users.update());
app.del("/users/:id", users.remove());
