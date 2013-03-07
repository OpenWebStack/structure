#Structure
The goal of this project is to show some of Angular's core concepts, and demonstrate a rock-solid setup for creating robust, scalable, and performant [Angular](http://angularjs.org/) apps. Feel free to submit ideas and improvements via pull requests. 

##Getting Started
We use NodeJS-based tools like [Grunt](http://gruntjs.com/) and [Testacular](http://vojtajina.github.com/testacular/) for managing the project. This doesn't mean you have to use Node as your backend. Node + Express is a great way to go, but feel free to use Java or whatever you prefer. Let's get setup:

1. Make sure you have [NodeJS](http://nodejs.org/) installed
2. Make sure you have [git](http://git-scm.com/book/en/Getting-Started-Installing-Git) installed
3. `$ git clone https://github.com/OpenWebStack/structure.git && cd structure`
4. `$ npm install -g grunt-cli stylus bower`
5. `$ npm install`
6. `$ bower install`
7. (optional) `install [PhantomJS](http://phantomjs.org/)` for running tests during the build

Here we are cloning the "Structure" git repository, installing a few global (-g) Node tools, then installing the local project [Node](http://nodejs.org/) and [Bower](http://twitter.github.com/bower/) tools.

##Running the App
Make sure you're in the structure directory, and run:
`$ node server/app.js`
Now open your browser to `localhost:3000`. Node will serve up `app/index.html` as the home page.

##Grunt
[Grunt](http://gruntjs.com/) is a task-based command-line tool for JavaScript. It's very useful during development, able to watch your files for changes and automatically run your tests, lint your files, and even refresh your browser automatically. Grunt is also great for your build, optimization, and other project tasks. The Grunt community is large and there are hundreds of contributed plugins we can leverage in our projects.

##Working with CSS & Stylus
CSS is a wonderful declarative layout method, but as a language it lacks some necessary features that would promote modularity and code reuse, such as variables, functions, mixins, and calculations. Some of these features are coming in a future version of CSS, but we can enjoy them now by using [Stylus](http://learnboost.github.com/stylus/) — a CSS preprocessor that compiles into regular CSS. Stylus is a powerful tool that can significantly improve the maintainability of your stylesheets, but you still need to really learn CSS.

To use Stylus we'll use the [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus/) plugin and add the following to our Gruntfile.js:

```js
stylus: {
  compile: {
    files: {
      'app/styles/app.css': 'app/styles/app.styl'
    }
  }
}
```
Now running `$ grunt stylus` will compile the stylus file into a CSS file. Running this manually every time we change a style would not be ideal, so we'll automate it using the grunt regarde task:

```js
regarde: {
  stylus: {
    files: ['app/styles/**/*.styl'],
    tasks: ['stylus']
  }
}
```

Now we'll simply run `$ grunt regarde:stylus` before working on stylesheets and they'll compile automatically on save. 

##Optimizing Your Project
We use a series of Grunt plugins to optimize the project. You can adapt these steps and config to meet the needs of your own project. Take a look at the [Gruntfile](Gruntfile.js) for this project. We'll perform a build consisting of the following steps: 
* clean
* stylus
* copy
* ngtemplates
* htmlrefs
* htmlmin
* concat
* uglify

###Clean
Use [grunt-contrib-clean](https://github.com/gruntjs/grunt-contrib-clean) to delete the previous `build` directory.

###Stylus
Use [grunt-contrib-stylus](https://github.com/gruntjs/grunt-contrib-stylus/) to compile Stylus files into CSS files. 

###Copy
Use [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy) to copy our images into the new build directory. 

###grunt-angular-templates
Use [grunt-angular-templates](https://github.com/ericclemmons/grunt-angular-templates) to compile our Angular template files into a JavaScript file that can be included in our build. This makes navigation to Angular views instant, since the template no longer has to be fetched at runtime. 

###grunt-htmlrefs
Use [grunt-htmlrefs](https://github.com/tactivos/grunt-htmlrefs) to update our HTML script tags to include just the single built script. 

###htmlmin
Use [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) to compress our HTML page (index.html). 

###Concat
Rule #1 for performance (especially on mobile) is to reduce the number of HTTP requests. Use [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat) to combine our scripts and cut out all those extra requests. 

###Uglify
Use [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify) to minify our JavaScript file, cutting out comments and shortening variables. 

##Running the Build
Run `$ grunt build`. kicks off these grunt tasks. An optimized copy of your `app` has been created in the `build` directory. Now all you have to do is deploy the built version of the app (build) and give yourself a high five for the awesome performance.

##Testing Your Project
Unit tests are extremely important in JavaScript projects, and can even be fun to write if you use great tools and write tests while you develop (TDD/BDD). We recommend using [Mocha](http://visionmedia.github.com/mocha/) as your test framework, and [Testacular](http://testacular.github.com/0.6.0/index.html) as your test runner. If you follow the conventions of this project then your Gruntfile.js is already setup for running your tests.

###Browser Tests
Tests that run in browsers (need DOM) are best run simultaniously in your target browsers with [testacular](http://vojtajina.github.com/testacular/) and [expect.js](https://github.com/LearnBoost/expect.js) for assertions. Place these in the `test/browser` directory.

Run `grunt testacular:unit` to start the testacular server. Then in a new terminal window run `grunt watch`. Now whenever you save a JS file the tests will run automatically. Learn more about using [gruntacular](https://github.com/OpenWebStack/gruntacular) plugin for running tests. 

###Node Tests
Tests that are pure JavaScript (don't use DOM) can run in Node and use [should.js](https://github.com/visionmedia/should.js/) for assertions. Place these in the `test/node` directory.

Run `grunt simplemocha`.