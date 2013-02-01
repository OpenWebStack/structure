/*
 * interpolate
 *
 * Interpolate the version text
 */
module.exports = function(app){
  app.filter('interpolate', ['version', function(version){
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }; 
  }]);
};