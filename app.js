"use strict";
const express = require('express');
const app = express();
const path = require('path');
const multer  = require('multer');
const upload = multer({ dest: './uploads' });

//app.use( multer({ dest: './uploads' }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.post('/meta', upload.any() , function(req, res) {
  console.log(req.files[0].size);
  res.send("Size is: " + req.files[0].size + " bytes");
  //console.log(req.files[0]);
  
  //console.log(req);
});


app.listen(process.env.PORT, process.env.IP, function() {
  console.log("File magician listening on port " + process.env.PORT);
});