var express = require('express');
var fs = require('fs');
var app = express();

//things that routes need access to
app.info = {name: "Open Web App"};

//middleware
app.use(require('./middleware/logging')());

//serve the static assets
app.use(express.static('app'));

//routes
fs.readdirSync(__dirname + '/routes').forEach(function(file) {
  require('./routes/' + file)(app);
});

app.listen(3000);