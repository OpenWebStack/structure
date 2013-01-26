/*
 * Module dependencies
 */
var app = require("..")
  , package = require("../../../package.json");

/*
 * Version Service
 *
 * Give access to the app version
 */
var version = package.version;

/*
 * Register it with angular
 */
app.value("version", version);

/*
 * Let others know where to find it
 */
module.exports = "version";
