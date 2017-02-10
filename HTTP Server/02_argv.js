/**
 * Created by Administrator on 2016/12/21.
 */
'use strict';

const http = require('http');

let server = http.createServer((req,res) =>{
    res.write('Hello World!!');
    res.end();
});

server.listen(process.argv[2] || 9000); //可以手动其他端口号 node 02_argv.js 8090