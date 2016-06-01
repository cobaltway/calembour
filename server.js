var express = require('express');
var app = express();
var fs = require('fs');

var api = require('./api/api');
app.use('/api', api);
app.use('/', express.static('client'));

var server = app.listen(8080,function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Calembour is running : http://%s:%s', host, port);
});
