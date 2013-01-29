describe('version service', function(){
  beforeEach(module('open-web-stack-app'));
  it('should return current version', inject(function(version) {
    expect(version).to.equal('0.2.0');
  }));
});