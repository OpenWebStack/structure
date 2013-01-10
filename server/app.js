var express = require('express');
var app = express();

app.get('/', function(req, res){
  res.end('hola');
});

app.listen(3000);

