// var env = this['window'] ? 'browser' : 'node';
/*TODO
  -think of better name for service, and place to put it. only want in dev also
  -write() for the build
*/

define(['text'], function(text){
  
  return {
    buildMap:{},
    load:function(name, req, load, config) {
      //request matching files from Node service
      var files;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'require-on-steroids?glob=' + name);
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
          files = JSON.parse(xhr.responseText);
          //load all the files with RequireJS
          req(files, function(){
            load(files);
          });
        }
      };
    },

    write:function(pluginName, name, write) {
      //TODO
    }
  };
});
