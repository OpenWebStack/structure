module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('gruntacular');
  grunt.loadNpmTasks('grunt-simple-mocha');

  //config
  grunt.initConfig({
    //TODO:
    //phantomjs for tests during build
    //jshint
    //requirejs
    //stylus
    //livereload
    //webserver (connect)
    //clear

    watch: {
      //run unit tests with testacular (server needs to be already running)
      testacular: {
        files: ['app/js/**/*.js', 'test/browser/**/*.js'],
        tasks: ['testacular:unit:run']
      },
      node: {
        files: ['server/**/*.js', 'test/node/**/*.js'],
        tasks: ['simplemocha']
      }
    },

    //for tests that run in browsers
    testacular: {
      //start testacular server (the watch task will run the tests when files change)
      unit: {
        configFile: 'config/testacular.conf.js',
      },
      //continuous integration mode for the build: run tests once in PhantomJS browser.
      continuous: {
        configFile: 'config/testacular.conf.js',
        singleRun: true,
        browsers: ['PhantomJS']
      },
    },

    //for tests that run in Node
    simplemocha: {
      options: {
        require: 'should',
        timeout: 3000,
        ignoreLeaks: false,
        ui: 'bdd',
        reporter: 'dot'
      },
      all: { src: 'test/node/**/*.js' }
    }
  });

  grunt.registerTask('test', ['testacular:continuous', 'simplemocha']);
};