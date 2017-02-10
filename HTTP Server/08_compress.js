/**
 * Created by Administrator on 2016/12/22.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const mime = require('./ss/mime.json');
const handlebars = require('handlebars');
const zlib = require("zlib");                   // 压缩     zlib.createGzip() 穿件一个Gzip压缩流
const public_folder = path.join(__dirname,'template');   // 指定根路径  path.join(__dirname,'../','CommonJS');

let server = http.createServer((req,res) => {
    let pathName = url.parse(req.url).pathname,
        realPath = path.join(public_folder, pathName);

// 判断文件是否存在
    fs.stat(realPath,(err,stats) => {
        if(err){        //  判断 file or forder do not exists
            let source = fs.readFileSync('./template/404.html'),    // 同步读文件
                template = handlebars.compile(source.toString()), // source.toString()  Buffer -> 字符串
                data = {
                    path:url.parse(req.url).pathname

                };
            res.writeHead(404,{
                'Content-type':'text/html'
            });
            res.end(template(data));
        }else {
            if (stats.isDirectory()) {
                let source = fs.readFileSync('./template/directory.html'),
                    template = handlebars.compile(source.toString()),
                    data = {
                        title: url.parse(req.url).name,
                        path: path.join(pathName, '/'),
                        files: []
                    };
                data.files = fs.readdirSync(realPath); // 返回当前目录
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(template(data));
            } else {
                let extension = path.extname(pathName).replace('.', ''),
                    fileType = mime[extension] || 'text/plain';
                let acceptEncoding = req.headers['accept-encoding'] || '',  // 获取浏览器支持压缩格式
                    compressable = extension.match(/css|js|html|json|xml|txt|md|jpg|jpeg|gif|pdf/ig);


                res.statusCode = 200;
                res.setHeader('Content-type', fileType);

                if (compressable && acceptEncoding.match(/\bgzip\b/)) {
                    res.setHeader('Content-Encoding', 'gzip');
                    fs.createReadStream(realPath).pipe(zlib.createGzip()).pipe(res);

                } else if (compressable && acceptEncoding.match(/\ddeflate\b/)) {
                    res.setHeader('Content-Encoding', 'deflate');
                    fs.createReadStream(realPath).pipe(zlib.createDeflate()).pipe(res);

                } else {
                    fs.createReadStream(realPath).pipe(res)
                }
            }
        }
    });
});
server.listen(process.argv[2] || 9000);


















































