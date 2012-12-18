module.exports = function(grunt){
  //grunt plugins

  //config
  grunt.initConfig({
    //todo
    //jshint
    //requirejs
    //stylus
    //watch
    //livereload

    //TODO add assertion lib in settings (should and expect --require stuff)
    //TODO add reporter to config also. Cool
    test: {
      node: {
        runner: 'mocha',
        reporter: 'dot',
        assertion: 'should',
        tests: 'test/node'
      },
      browser: {
        runner: 'testacular',
        reporter: 'min',
        config: 'config/testacular.conf.js',
        // browsers: ['Chrome', 'Firefox']
        browsers: ['Chrome']
      }
    }

  });

  /* TODO 
  move to separate project on github
   */
  var child = require('child_process');
  grunt.registerMultiTask('test', 'Run Mocha unit tests', function(){
    var done = this.async();
    var tests = this.data.tests;
    var reporter = ' --reporter ' + this.data.reporter || 'dot';
    var assertion = this.data.assertion ? ' --require ' + this.data.assertion : '';
    var cmd;

    if(this.data.runner === 'mocha'){
      cmd = 'mocha test ' + tests + reporter + assertion;
      run(cmd);
    }
    else if (this.data.runner === 'testacular'){
      cmd = 'testacular start ' + this.data.config + ' --single-run=true --require expect --browsers=' + this.data.browsers.join(',');
      run(cmd);
    }

    function run(cmd){
      var ps = child.exec(cmd);
      ps.stdout.pipe(process.stdout);
      ps.stderr.pipe(process.stderr);
      ps.on('exit', function(code){
        if(code !== 0) grunt.fail.warn('tests failed');
        done();
      }); 
    }
  });
};