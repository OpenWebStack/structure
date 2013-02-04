/**
 * TODO
 * make "from" param work not needed here
 * docs 
 */

define(function(){
  var buildFiles = {};

  return {
    /**
     * load matched files, using the server to help find matches
     */
    load:function(name, req, load, config) {
      var files;
      // during the build we load the actual file contents in Node
      if (config.isBuild){
        var glob = require.nodeRequire('requirejs-glob');
        var fs = require.nodeRequire('fs');
        files = glob.match(name, 'app/js/');
        buildFiles[name] = [];
        files.forEach(function(file){
          //TODO have a glob.js func that returns the contents of the files
          var content = fs.readFileSync('app/js/' + file + '.js');
          buildFiles[name].push(content);
        });
        load(files);
      }
      else{
        // in the browser we just request matching files from the Node web service
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
    },

    /**
     * write contents of matched files during the build
     */
    write:function(pluginName, name, write) {
      if (name in buildFiles) {
        //write the glob module
        write('define("glob!'+name+'");');
        //write the contents of the files
        var files = buildFiles[name];
        files.forEach(function(file){
          write(file);
        });
      }
    }
  };
});