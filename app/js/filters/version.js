/*
 * interpolate
 *
 * Interpolate the version text
 */
module.exports = function(app, name){
  app.filter(name, ['version', function(version){
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }; 
  }]);
};