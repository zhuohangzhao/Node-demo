
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

let server = http.createServer((req,res) =>{
        let pathName = url.parse(req.url).pathname;

        fs.createReadStream(path.join(__dirname, pathName)).pipe(res);

        //__dirname:   D:\Code\test\node-test\HTTP Server>
        //  pathName:  / template/lazy.html
});
server.listen(process.argv[2] || 9000);



