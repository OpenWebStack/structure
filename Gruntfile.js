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
        assertion: 'expect',
        config: 'config/testacular.conf.js', //configure testacular there
        browsers: ['Chrome'] //can add other browsers including PhantomJS
      }
    }

  });

  /* TODO
  move to separate project on github
  can't --watch on grunt test (both node and browser) cause first one stalls
  watch task that runs the tests, w testacular server already running
  */
  var child = require('child_process');
  grunt.registerMultiTask('test', 'Run Mocha unit tests', function(){
    var done = this.async();
    var tests = this.data.tests;
    var reporter = ' --reporter ' + this.data.reporter || 'dot';
    var assertion = this.data.assertion ? ' --require ' + this.data.assertion : '';
    var argv = require('optimist').argv;
    var cmd, watch;

    if(this.data.runner === 'mocha'){
      watch = (argv.watch) ? ' --watch' : '';
      cmd = 'mocha test ' + tests + reporter + assertion + watch + ' --colors';
      run(cmd);
    }
    else if (this.data.runner === 'testacular'){
      watch = (argv.watch) ? ' --single-run=false' : ' --single-run=true';
      cmd = 'testacular start ' + this.data.config + assertion + watch + ' --browsers=' + this.data.browsers.join(',');
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