var env = this['window'] ? 'browser' : 'node';
/*TODO
  -prepend the app's baseURL (currently hard coded)
  -think of better name for service, and place to put it. only want in dev also
  -write() for the build
*/

define(['text'], function(text){
  
  return {
    buildMap:{},
    load:function(name, req, load, config) {
      var files;
      var xhr = new XMLHttpRequest();
      xhr.open('GET', 'require-on-steroids?glob=' + name + '&baseUrl=app/js/');
      xhr.send();
      xhr.onreadystatechange = function(){
        if (xhr.readyState === 4){
          files = JSON.parse(xhr.responseText);
          //load all the files
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
