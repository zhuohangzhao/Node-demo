/**
 * Created by Administrator on 2016/12/26.
 */
"use strict";
const http = require('http');
const connect = require('connect');

let app = connect();

app.use((req, res, next) =>{
    console.log(req.url);
    next();
});
app.use((req, res) => {
    res.end('Hello from connect!');
});

http.createServer(app).listen(3000);