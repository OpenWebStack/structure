module.exports = function(grunt){
  //grunt plugins
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-clear');
  grunt.loadNpmTasks('gruntacular');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-htmlrefs');

  //config
  grunt.initConfig({
    watch: {
      //run unit tests with testacular (server needs to be already running)
      testacular: {
        files: ['app/js/**/*.js', 'test/browser/**/*.js'],
        tasks: ['testacular:unit:run']
      },
      node: {
        files: ['server/**/*.js', 'test/node/**/*.js'],
        tasks: ['simplemocha']
      },
      stylus: {
        files: ['app/styles/**/*.styl'],
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
          'app/styles/app.css': 'app/styles/app.styl'
        }
      }
    },

    clean: ["build"],

    copy: {
      img: {
        src: ['app/img/**'], 
        dest: 'build/img'
      }
    },

    ngtemplates: {
      options:  {base: 'app'},
      app: {
        src: ['app/templates/**/*.html'],
        dest: 'build/templates.js'
      }
    },

    htmlrefs: {
      options: {
        file: { 
          buildNumber: 47878 //todo generate unique from contents of file for each file
        }
      },
      build: {
        src: 'app/index.html',
        dest: 'build/'
      }
    },

    htmlmin: {
      index: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/index.html': 'build/index.html'
        }
      }
    },

    concat: {
      js: {
        src: [
          'app/js/lib/angular/angular.js',
          'app/js/lib/angular/angular-resource.js',
          'app/js/app.js',
          'app/js/controllers/**/*.js', 
          'app/js/services/**/*.js', 
          'app/js/filters/**/*.js', 
          'app/js/directives/**/*.js',
          'build/templates.js'
        ],
        dest: 'app/app.build.js'
      },
      styles: {
        src: ['app/styles/**/*.css'],
        dest: 'build/styles/app.css'
      }
    },

    uglify: {
      app: {
        src: ['app/app.build.js'],
        dest: 'build/app.min.js'
      }
    }

  });

  grunt.registerTask('test', ['testacular:continuous', 'simplemocha']);
  grunt.registerTask('build', ['clean', 'stylus', 'copy', 'ngtemplates', 'htmlrefs', 'htmlmin', 'concat', 'uglify']);
};