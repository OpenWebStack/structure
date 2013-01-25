/*
 * Module dependencies
 */
var filters = require("angular").module("app.filters");

/*
 * Interpolate the version text
 */
module.exports = filters.filter('interpolate', [
  'version',

  function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  }
]);