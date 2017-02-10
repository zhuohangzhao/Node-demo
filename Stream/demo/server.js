var http = require('http');
var fs = require('fs');

var server = http.createServer(function(req, res){

    //res.writeHead(200, {'Content-Type': 'text/html'});

    var source = fs.createReadStream('./source.mp4');
    source.pipe(res);

});

server.listen(process.argv[2]);
