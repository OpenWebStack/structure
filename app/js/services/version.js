/*
 * Version Service
 *
 * Give access to the app version
 */
var version = require("../../../package.json").version;
module.exports = function (app, name){
  app.value(name, version);
};