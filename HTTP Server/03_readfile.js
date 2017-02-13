
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');

let server = http.createServer((req,res) =>{

        // 解析 url 的中 pathname , 拿到磁盘中的路径
        let pathName = url.parse(req.url).pathname;

        fs.createReadStream(path.join(__dirname, pathName)).pipe(res);

        //__dirname:   D:\Code\test\node-test\HTTP Server>   当前文件的路径
        //  pathName:  / template/lazy.html
});

server.listen(process.argv[2] || 9000);



