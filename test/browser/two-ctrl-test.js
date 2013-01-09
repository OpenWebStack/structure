describe('MyCtrl2', function(){
  var scope, ctrl;
  beforeEach(module('app'));
  beforeEach(inject(function($rootScope, $controller) {
    scope = $rootScope.$new();
    ctrl = $controller('MyCtrl2', {$scope: scope, version: '9.9.9'});
  }));

  it('should be injected correctly', function(){
    expect(ctrl).not.to.be(undefined);
    expect(scope.people.length).to.be(3);
  });

  describe('longestName computed property', function(){
    it('should return the longest name', function(){
      expect(scope.longestName()).to.be('Jimmies');
      scope.people.push('Jimmyjim');
      expect(scope.longestName()).to.be('Jimmyjim');
    });
  });

  describe('mocking a depdendency', function(){
    //super useful for writing good, isolated tests
    it('should let us pass in whatever we want', function(){
      //notice how we are testing the behavior of our controller on its dependencies,
      //not anything specific of the dependencies themselves. Awesomesauce. 
      expect(scope.version).to.equal('9.9.9!');
    });
  });
});