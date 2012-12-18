#Structure
The goal of this project is to demonstrate the ideal setup and best practices when working with AngularJS, RequireJS, jQuery, Stylus, Grunt, and Mocha. Feel free to submit ideas and improvements via pull requests. 

These tools are extremely powerful and complementary when used correctly together. More explanation to come. 

##Benefits of this RequireJS + AngularJS setup
RequireJS has a few main benefits:
1. No more globals
2. Dependency management
3. Powerful "client-side middleware" via plugins
3. Killer optimization using r.js

The catch is that you have to use AMD syntax all over otherwise you still have globals and things get messy. But Angular provides a great way to write code (directives, controllers, services etc) without the use of globals:

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