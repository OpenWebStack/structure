/*
 * Version Service
 * Gives access to the app version
 */
var version = require("../../../package.json").version;

module.exports = function (app){
  app.value('version', version);
};