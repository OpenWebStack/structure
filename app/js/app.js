/*
 * Module dependencies
 */
var angular = require("angular");
require("angular-resource")
require("./controllers");
require("./directives");
require("./filters");
require("./services");

/*
 * Expose the app
 */
var app = module.exports = angular.module("app", [
  "ngResource",
  "app.controllers",
  "app.directives",
  "app.filters",
  "app.services"
]);

/*
 * Configure the app
 */
app.config([
  '$routeProvider',
  '$locationProvider',

  function($routeProvider, $locationProvider) {
    $routeProvider
      .when("/view1", {
        templateUrl: "/partials/partial1.html",
        controller: "MyCtrl1"
      })
      .when("/view2", {
        templateUrl: "/partials/partial2.html",
        controller: "MyCtrl2"
      })
      .otherwise({
        redirectTo: "/view1"
      });
  }
]);
