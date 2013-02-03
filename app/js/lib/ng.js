/* 
  RequireJS plugin that loads an HTML file and caches it as an Angular template.
  During the build it generates an inline AMD module that caches the Angular template at startup.
  TODO: 
    -try precompiling the templates into JS functions using PhantomJS
    -support loading all templates with glob
    -move to own repo
*/

var env = this['window'] ? 'browser' : 'node';

define(['text'], function(text){
  //fails during the build. Might have to just inline the HTML, leaving angular out of it. 
  return {
    buildMap:{},
    load:function(name, req, load, config) {
      var _this = this;
      text.get(req.toUrl(name), function(html) {
        if(env === 'browser'){
          angular.module('templates').run(['$http', '$templateCache', function($http, $templateCache){
            console.log('prefetching template: ', name);
            $templateCache.put(name, html);
          }]);
        }
        //save the template when building
        if (config.isBuild) _this.buildMap[name] = html;
        load(html);
      });
    },

    write:function(pluginName, name, write) {
      if (name in this.buildMap) {
        var content = this.buildMap[name];
        //generate inlined, cached angular template
        var output = 'define("' + pluginName + '!' + name + '", function(){\n' +
          'angular.module("templates").run(["$http", "$templateCache", function($http, $templateCache){\n' +
            '$templateCache.put("'+name+'", "'+this.escapeHTML(content)+'");' + 
            '}]);\n' + 
          '});\n';
        write(output);
      }
    },

    //TODO: \" instead of &quot;
    escapeHTML: function(html){
      return String(html)
        .replace(/&/g, '&amp;')
        // .replace(/"/g, '&quot;')
        .replace(/"/g, '\\"')
        .replace(/\n/g, ' ');
    }
  };
});
