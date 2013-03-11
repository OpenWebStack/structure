/* Example filter */

angular.module('app').
  filter('interpolate', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    };
  });
