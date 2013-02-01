module.exports = function(app){
  app.directive('appVersion', ['version', function(version){
    return function(scope, elem, attrs) {
      elem.text(version);
    };
  }]);
};