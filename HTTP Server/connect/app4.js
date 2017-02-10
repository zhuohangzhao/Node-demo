/**
 * Created by Administrator on 2016/12/26.
 */
"use strict";

const http =require('http');
const connect = require('connect');
const fs = require('fs');
const url = require('url');
const path = require('path');
const public_folder = path.join(__dirname, 'template');
const serveIndex = require('serve-index');
const serveStatic = require('serve-static');

let app = connect(),
    filePath = '',
    stats = null;

app.use((req, res, next) => {
    let pathName = url.parse(req.url).pathname;
    filePath = path.join(public_folder, path.normalize(pathName.replace(/\.\./g, '')));
    next();
});

app.use((req, res, next) => {
    try{
        stats = fs.statSync(filePath);  // stats = fs.stats
        next();
    }catch(ex){
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('404')
    }
});


app.use(serveIndex(public_folder, {'icons': true}));    //路径是目录时候

// app.use((req, res) => {
//     res.writeHead(200, {
//         'Content-Type': 'text/html'
//     });
//     fs.createReadStream(filePath).pipe(res)
// });

app.use(serveStatic(public_folder));


http.createServer(app).listen(3000);

