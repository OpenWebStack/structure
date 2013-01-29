/*
 * Module dependencies
 */
var angular = require("angular")
  , package = require("../../package.json");

/*
 * Expose the app
 */
module.exports = angular.module(package.name, [
  "ngResource"
]);