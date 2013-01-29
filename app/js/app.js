//Module dependencies
var package = require("../../package.json");

//Expose the app
module.exports = angular.module(package.name, [
  "ngResource"
]);