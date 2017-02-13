'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');                   // 设置路径
const mime = require('./ss/mime.json');         // 设置content-type，获取拓展名
const handlebars = require('handlebars');       // 模板，代替字符串
const zlib = require("zlib");                   // 压缩
const public_folder = path.join(__dirname, 'template');   // 指定根路径，不让用户读到源代码，指定给用户显示的目录  path.join(__dirname,'../','CommonJS');
const etag = require('etag');                   // etag

let server = http.createServer((req, res) => {
    let pathName = url.parse(req.url).pathname,
        realPath = path.join(public_folder, path.normalize(pathName.replace(/\.\./g, '')));

// 判断文件是否存在
    fs.stat(realPath, (err, stats) => {
        //  404 错误
        if (err) {
            let source = fs.readFileSync('./template/404.html'),
                template = handlebars.compile(source.toString()),
                data = {
                    path: url.parse(req.url).pathname

                };
            res.writeHead(404, {
                'Content-type': 'text/html'
            });
            res.end(template(data));
        } else {
            // 路径是一个文件夹
            if (stats.isDirectory()) {
                let source = fs.readFileSync('./template/directory.html'),
                    template = handlebars.compile(source.toString()),
                    data = {
                        title: url.parse(req.url).name,
                        path: path.join(pathName, '/'),
                        files: []
                    };
                data.files = fs.readdirSync(realPath);
                res.writeHead(200, {
                    'Content-type': 'text/html'
                });
                res.end(template(data));
            } else {

                // 设置文件拓展名（json js css ...）
                let extension = path.extname(pathName).replace('.', ''),
                    fileType = mime[extension] || 'text/plain';

                // 获取浏览器支持压缩格式
                let acceptEncoding = req.headers['accept-encoding'] || '',
                    compressable = extension.match(/css|js|html|json|xml|txt|md|jpg|jpeg|gif|pdf/ig),
                    cacheable = extension.match(/^(css|js|jpg|png|gif)$/);

                res.statusCode = 200;
                res.setHeader('Content-type', fileType);

                // 报文生成的UTC时间
                res.setHeader('Date', (new Date()).toUTCString());
                // 缓存
                if (cacheable) {
                    let expires = new Date();
                    expires.setTime(expires.getTime() + 1000 * 60 * 60 * 24 * 365); // 一年后实效
                    res.setHeader("Expires", expires.toUTCString());
                    res.setHeader("Cache-Control", "max-age=" + 1000 * 60 * 60 * 24 * 365);
                    res.setHeader("ETag", etag(body));

                    let lastModified = stats.mtime.toUTCString();
                    res.setHeader("Last-Modified", lastModified);

                    if ( req.headers['if-modified-since'] && lastModified === req.headers['if-modified-since']) {
                        res.statusCode = 304;
                        res.end();
                    }
                }

                // 压缩    zlib.createGzip() 创建一个Gzip压缩流
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