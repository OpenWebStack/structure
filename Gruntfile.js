module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-component-build');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('gruntacular');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-stylus');

  //config
  grunt.initConfig({
    //TODO:
    //jshint
    //livereload
    //webserver (connect)
    //clear

    watch: {
      component: {
        files: ["app/js/**/*.js", "app/css/**/*.css", "app/partials/**/*.nghtml"],
        tasks: ['component']
      },
      //run unit tests with testacular (server needs to be already running)
      // testacular: {
      //   files: ['app/js/**/*.js', 'test/browser/**/*.js'],
      //   tasks: ['testacular:unit:run']
      // },
      node: {
        files: ['server/**/*.js', 'test/node/**/*.js'],
        tasks: ['simplemocha']
      },
      stylus: {
        files: ['app/css/**/*.styl'],
        tasks: ['stylus']
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
    },

    //stylus css
    stylus: {
      compile: {
        //specify each "combined" file. Each file can then use @import() to bring in its dependencies
        files: {
          'app/css/app.css': 'app/css/app.styl'
        }
      }
    },

    component: {
      app: {
        output: 'build',
        standalone: true,
        styles: true,
        scripts: [ 'app/js/**/*.js' ],
        sourceUrls: true,
        configure: function(builder) {
          builder.use(require("nghtml")({
            webroot: "app",
            module: "open-web-stack-app",
            dev: true
          }));
          builder.use(require("component-json")());
        }
      }
    }
    
  });

  grunt.registerTask('test', ['testacular:continuous', 'simplemocha']);
  grunt.registerTask('build', ['stylus', 'component']);
  grunt.registerTask("default", ["build"]);
};
