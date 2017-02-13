/**
 * Created by Administrator on 2016/12/21.
 */
'use strict';

const http = require('http');

let server = http.createServer((req,res) => {
    res.write('Hello World!'); // request.write()
    res.end();                  // response.end()
});
server.listen(8080);            // 端口号

