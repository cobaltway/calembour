var app = require('express')();
var fs = require("fs");
var dns = require("dns");

app.get('/list',function(req,res) {
  res.set('Content-Type', 'application/json');
  res.write(fs.readFileSync("./api/extensions.json"));
  res.end();
});

app.get('/extension/*',function(req,res) {
  res.set('Content-Type', 'application/json');
  var toReturn = extension(decodeURIComponent(req.originalUrl.split("/")[3]));
  res.write(toReturn);
  res.end();
});

app.get("/available/*", function (req, res) {
  res.set('Content-Type', 'application/json');
  var address = decodeURIComponent(req.originalUrl.split("/")[3]);
  var alreadyStop = false;
  dns.resolve(address, function(e) {
    if (!alreadyStop) {
      if (e && e.errno == 'ENOTFOUND') {
        res.write("true");
      }
      else {
        res.write("false");
      }
      res.end();
    }
  });
  setTimeout(function() {
    res.write("false");
    res.end();
    alreadyStop = true;
  }, 5000);
});

function extension(param) {
    return fs.readFileSync("./api/extension/" + param + ".json");
}

module.exports = app;