// var env = this['window'] ? 'browser' : 'node';
/*TODO
  -write() for the build
*/

define(function(text){
  
  return {
    buildMap:{},
    load:function(name, req, load, config) {
      var files;
      if (config.isBuild){
        //request matching files from Node lib
        var glob = require.nodeRequire('requirejs-glob');
        files = glob.match(name);
        load(files);
      }
      else{
        //request matching files from Node web service
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'requirejs-glob?glob=' + name);
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
      }
    }

    // write:function(pluginName, name, write) {
    //   console.log('writing');
    // }
  };
});
