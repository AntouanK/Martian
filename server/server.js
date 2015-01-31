
'use strict';

var express       = require('express'),
    compression   = require('compression'),
    path          = require('path'),
    app           = express(),
    cwd,
    server,
    options,
    deployPath;

cwd = process.cwd();
deployPath = path.join(cwd, 'static');


app.use(compression());

//  static server
app.get('/', function (req, res, next) {
  req.url = '/index.html';
  next();
});

app.use(express.static(deployPath));

app.listen(8880);
