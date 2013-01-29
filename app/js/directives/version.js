/*
 * Module dependencies
 */
var app = require("../app")
  , VersionService = require("../services/version");

/*
 * appVersion
 *
 * Directive for displaying the app version
 */
function appVersion(version) {
  return function(scope, elem, attrs) {
    elem.text(version);
  };
};

/*
 * Register it with angular
 */
app.directive(appVersion.name, [
  VersionService,
  appVersion
]);

/*
 * Let others know where to find it
 */
module.exports = appVersion.name;
