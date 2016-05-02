#!/usr/bin/env node

var path = require('path');
var express = require('express');

var app = express();

// The app is all static files served out of dist.
app.use(express.static(path.join(__dirname, 'dist')));

app.listen(3000, function () {
  console.log('hass-switches listening on port 3000!');
});