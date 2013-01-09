#Structure
The goal of this project is to demonstrate the ideal setup and best practices when working with AngularJS, RequireJS, jQuery, Stylus, Grunt, and Mocha. Feel free to submit ideas and improvements via pull requests. 

These tools are extremely powerful and complementary when used correctly together. More explanation to come. 

##Getting Started
We use NodeJS-based tools like [Grunt](http://gruntjs.com/) and [Testacular](http://vojtajina.github.com/testacular/) for managing the project. This doesn't mean you have to use Node as your backend. Node + Express is a great way to go, but feel free to use Java or whatever you prefer. Let's get setup:

1. Make sure you have [NodeJS](http://nodejs.org/) installed
2. Make sure you have [git](http://git-scm.com/book/en/Getting-Started-Installing-Git) installed
3. $ git clone https://github.com/OpenWebStack/structure.git && cd structure
4. $ npm install -g grunt-cli testacular@canary stylus
5. $ npm install
6. (optional) install [PhantomJS](http://phantomjs.org/) for running tests during the build

Here we are cloning the "Structure" git repository, installing a few global (-g) Node tools, then installing the local project Node tools. That's it!

##Benefits of this RequireJS + AngularJS setup
RequireJS has a few main benefits:
1. No more globals
2. Dependency management
3. Powerful "client-side middleware" via plugins
3. Killer optimization using r.js

The downside is that you have to use AMD syntax all over otherwise you still have globals and things get messy. But luckily Angular provides a great way to write code (directives, controllers, services etc) without the use of globals:

```js
//add a controller to the 'app' module
angular.module('app').controller('MyController', function(){
  
});
```

Note that passing a single parameter to `angular.module` returns a module previously created with that name. Passing two or more parameters will *create* or *override* said module.

Thanks to this cleverness we can now use RequireJS in a smart way and get all its benefits *without* the boilerplate. We simply load the files as regular scripts:

```js
/* bootstrap.js */
require(['app'], function(){
  //now that the app module loaded, load all controllers, services, directives, etc
  require([
    'ng!templates/partial1.html',
    'ng!templates/partial2.html',
    'controllers/one-ctrl', 
    'controllers/two-ctrl',
    'services/version-service', 
    'filters/version-filter',
    'directives/version-directive'
  ], 
  function(){
    //bootstrap now that all the module's files are loaded
    angular.bootstrap(document, ['app']);
  });
});
```

Also our unit tests can be simpler since we don't have to worry about loading things with AMD for the tests. 

See the full [bootstrap.js file](https://github.com/OpenWebStack/structure/blob/master/app/js/bootstrap.js) that we load using RequireJS. 
Now all our files are loaded async which is great for performance, as the DomContentLoaded event will trigger *before* your scripts are parsed/executed istead of after (aka stuff shows up on the page even faster than simply putting scripts at the bottom of the body tag). 

##Optimizing
Loading async is great for performance, but loading a hundered separate scripts is terrible. Rule #1 for performance (especially on mobile) is to reduce the number of requests. So we combine them using r.js, RequireJS's build tool. It's quite robust and configurable, and does a great job combining and minifying all our JS into a single file, which is still loaded asynchronously by RequireJS. RequireJS takes a "build profile" configuration file that gives you fine-grained control over the build. See the sample [app.build.js](https://github.com/OpenWebStack/structure/blob/master/app.build.js) for this setup, and [full documentation on r.js](http://requirejs.org/docs/optimization.html) for more settings. 

##Templates
There are a number of ways to use Angular templates. The most common are the `ng-view` directive, routes that point to a `templateUrl`, and inside of other directives. Whenever Angular first encounters the use of a template, it fetches it via an AJAX request, stores the fetched HTML into an Angular template and caches it in the templateCache for future use. This default behavior isn't ideal for most applications, it's better to load your templates up front so that navigation between views is instant (no additional requests). 

RequireJS gives us a powerful tool for handling non-JS dependencies like this: loader plugins. See [ng.js](https://github.com/OpenWebStack/structure/blob/master/app/js/lib/ng.js), a loader plugin that will prefetch all your Angular templates on application startup, and cache them into the templateCache for use everywhere. You then load your templates with the plugin like so:

```js
require('ng!templates/slider.html')
```
If there are some less-frequently used templates (like an admin page) that you'd rather load-on-demand, just don't use this plugin and let Angular do its default behavior. 

This plugin also generates an actual AMD module for each template during the build, inlining the HTML as a JavaScript string and bundling all your templates into your one bootstrap.js file. You'll notice significant performance gains with this strategy.

##Testing Your Project
Unit tests are extremely important in JavaScript projects, and can even be fun to write if you use great tools and write tests while you develop (TDD/BDD). We recommend using [Mocha](http://visionmedia.github.com/mocha/) as your test framework. We also use [Grunt](http://gruntjs.com/) for running tests and performing other project tasks. If you follow the conventions of this project then your Gruntfile.js is already setup for running your tests. 

###Run the Node tests
Tests that are pure JavaScript (don't use DOM) can run in Node and use [should.js](https://github.com/visionmedia/should.js/) for assertions. Place these in the `test/node` directory.

Run `grunt simplemocha`.

###Run the Browser tests
Tests that run in browsers (need DOM) are best run simultaniously in your target browsers with [testacular](http://vojtajina.github.com/testacular/) and [expect.js](https://github.com/LearnBoost/expect.js) for assertions. Place these in the `test/browser` directory.

Run `grunt testacular:unit` to start the testacular server. Then in a new terminal window run `grunt watch`. Now whenever you save a JS file the tests will run automatically.

