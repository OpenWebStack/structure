//Global script dependencies
require('./lib/angular.js');
require('./lib/angular-resource.js');

//Module dependencies
var app = window.app = require("./app");

//Initialize the templates
var partial1 = require("../partials/partial1")
  , partial2 = require("../partials/partial2");

//Initialize the directives used outside of the controllers 
require("./directives/version")(app);

//Initialize services
require("./services/user")(app);
require("./services/version")(app);

//Initialize filters
require("./filters/version")(app);

//Initialize the controllers
require("./controllers/one")(app);
require("./controllers/two");

//Configure the app
app.config([
  '$routeProvider',
  '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/view1", {templateUrl: partial1, controller: 'MyCtrl1' })
      .when("/view2", {templateUrl: partial2, controller: 'MyCtrl2' })
      .otherwise({redirectTo: "/view1"});
  }
]);