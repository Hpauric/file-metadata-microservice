const express = require('express');
const app = express();
const url = require('url');
const path = require('path');
const mongoClient = require('mongodb').MongoClient;
const mongodbURL = process.env.MONGOLAB_URI; // This environmental variable needs to be set
const request = require('request');

function searchImgurGallery(apiUrl, callback) {
  let options = {
    url: apiUrl,
    headers: {
      Authorization: 'Client-ID 8692246cebf3be3'
    },
    json: true,
  };

  function getPics(err, response, body) {
    if (!err && response.statusCode === 200) {
      body = body.data.filter(image => {
        if (!image.is_album) {
          return image;
        }
      }).map(image => {
        return {
          image_url: image.link,
          alt_text: image.title,
          page_url: `https://imgur.com/${image.id}`
        };
      });
      console.log(body);
      callback(body);
    }
    else {
      callback("Error");
    }
  }
  request(options, getPics);
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/search/*', function(req, res) {
  let userQuery = url.parse(req.url, true).pathname.slice(8);
  let offsetVal = url.parse(req.url, true).query;
  let apiUrl;
  if (offsetVal) {
    apiUrl = 'https://api.imgur.com/3/gallery/search/' + offsetVal.offset + '/?q=' + userQuery;
  }
  else {
    apiUrl = 'https://api.imgur.com/3/gallery/search/?q=' + userQuery;
  }
  searchImgurGallery(apiUrl, function(bodyData) {
    res.send(bodyData);
  });
});

app.listen(process.env.PORT, process.env.IP, function() {
  console.log("URL shortener listening on port " + process.env.PORT);
});