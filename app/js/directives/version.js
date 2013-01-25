/*
 * Module dependencies
 */
var directives = require("angular").module("app.directives");

/*
 * Directive for displaying the app version
 */
module.exports = directives.directive('appVersion', [
  'version',

  function(version) {
    return function(scope, elem, attrs) {
      elem.text(version);
    };
  }
]);