/*
 * Module dependencies
 */
var app = require(".");

/**
 * Initialize the templates
 */
var partial1 = require("../partials/partial1")
  , partial2 = require("../partials/partial2");

/**
 * Initialize the directives used outside of the controllers
 */
var versionDirective = require("./directives/version");

/**
 * Initialize the controllers
 */
var MyCtrl1 = require("./controllers/one")
  , MyCtrl2 = require("./controllers/two");

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/view1", {
        templateUrl: partial1,
        controller: MyCtrl1
      })
      .when("/view2", {
        templateUrl: partial2,
        controller: MyCtrl2
      })
      .otherwise({
        redirectTo: "/view1"
      });
  }
]);
