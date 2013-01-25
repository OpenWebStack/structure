/*
 * Module dependencies
 */
var angular = require("angular")
  , package = require("../../package.json");

// We need angular-resource for our User service
require("angular-resource");

/*
 * Expose the app
 */
module.exports = angular.module(package.name, [
  "ngResource"
]);
