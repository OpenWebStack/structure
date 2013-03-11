/* Example directive */

angular.module('app').directive('appVersion', function(version) {
  return function(scope, elem, attrs) {
    elem.text(version);
  };
});
