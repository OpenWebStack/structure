module.exports = function(app, name){
  app.directive(name, ['version', function(version){
    return function(scope, elem, attrs) {
      elem.text(version);
    };
  }]);
};