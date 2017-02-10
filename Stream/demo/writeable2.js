var fs = require('fs');
var ws = fs.createWriteStream('files/message.txt');

ws.write('beep ');

setTimeout(function () {
    ws.end('boop\n');
}, 1000);
