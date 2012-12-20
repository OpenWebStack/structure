module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');

  //config
  grunt.initConfig({
    //todo
    //jshint
    //requirejs
    //stylus
    //livereload
    //watch

    watch: {
      //clear terminal before outputting anything new
      // clear: {
      //   files: ['app/js/**/*.js', 'test/**/*.js'],
      //   tasks: ['clear']
      // },
      test: {
        files: ['app/js/**/*.js', 'test/**/*.js'],
        tasks: ['test:browser:run']
      }
    },

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

  // start testacular server on watch
  grunt.registerTask('dev', ['test:browser', 'watch']);

  /* TODO
  watch task that runs the tests, w testacular server already running
  move to separate project on github
  can't --watch on grunt test (both node and browser) cause first one stalls
  */
  var child = require('child_process');
  grunt.registerMultiTask('test', 'Run Mocha unit tests with Mocha cli or Testacular', function(){
    var done = this.async();
    var tests = this.data.tests;
    var reporter = ' --reporter ' + this.data.reporter || 'dot';
    var assertion = this.data.assertion ? ' --require ' + this.data.assertion : '';
    var argv = require('optimist').argv;
    var runonly = this.flags.run;
    var cmd, watch;

    if(this.data.runner === 'mocha'){
      //todo anything with run?
      watch = (argv.watch) ? ' --watch' : '';
      cmd = 'mocha test ' + tests + reporter + assertion + watch + ' --colors';
      run(cmd);
    }
    else if (this.data.runner === 'testacular'){
      watch = (argv.watch) ? ' --single-run=false' : ' --single-run=true';
      if(runonly){
        //try running tests. If fail cause no server, start the server
        cmd = 'testacular run';
        run(cmd, function(){
          var settings = grunt.config.data.test.browser;
          console.log('starting testacular server');
          //TODO DRY
          cmd = 'testacular start ' + settings.config + assertion + ' --browsers=' + settings.browsers.join(',');        
          run(cmd);
        });
        
      }
      else{
        //TODO grunt needs to not close down the testacular process
        cmd = 'testacular start ' + this.data.config + assertion + watch + ' --browsers=' + this.data.browsers.join(',');        
        run(cmd);
      }   
    }

    function run(cmd, errback){
      var ps = child.exec(cmd);
      ps.stdout.pipe(process.stdout);
      ps.stderr.pipe(process.stderr);
      ps.on('exit', function(code, message){
        if(code !== 0){
          if(errback){
            errback(code, message);
          }
          else{
            grunt.fail.warn('tests failed');
          }
        }
        done();
      }); 
    }
  });
};