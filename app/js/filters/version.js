/*
 * Module dependencies
 */
var app = require("../app")
  , VersionService = require("../services/version");

/*
 * interpolate
 *
 * Interpolate the version text
 */
function interpolate(version) {
  return function(text) {
    return String(text).replace(/\%VERSION\%/mg, version);
  };
};

/*
 * Register it with angular
 */
app.filter(interpolate.name, [
  VersionService,
  interpolate
]);

/*
 * Let others know where to find it
 */
module.exports = interpolate.name;
