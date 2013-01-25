/*
 * Module dependencies
 */
var services = require("angular").module("app.services");

/*
 * Export the version of the app
 */
module.exports = services.value('version', '0.2.0');
