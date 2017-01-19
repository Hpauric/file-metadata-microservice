const express = require('express');
const app = express();
const url = require('url');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const mongodbURL = process.env.MONGOLAB_URI;

app.get('/', function(req, res) {
  res.sendfile(path.join(__dirname + '/public/index.html'));
});

app.get('/*', function(req, res) {
});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("URL shortener listening on port " + process.env.PORT);
});