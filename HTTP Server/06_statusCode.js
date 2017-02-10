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


let server = http.createServer((req,res) => {
    let pathName = url.parse(req.url).pathname,
        realPath = path.join(__dirname, pathName);

// 判断文件是否存在
    fs.stat(realPath,(err,stats) => {
        if(err){        //  判断 file or forder do not exists
            let source = fs.readFileSync('./template/404.html'),    // 同步读文件
                template = handlebars.compile(source.toString()), // source.toString()  Buffer -> 字符串
                data = {
                    path:url.parse(req.url).pathname

                };
            res.writeHeader(404,{
                'Content-type':'text/html'
            });
            res.end(template(data));
        }else{
            if(stats.isDirectory()) {
                let source = fs.readFileSync('./template/directory.html'),
                    template = handlebars.compile(source.toString()),
                    data = {
                        title: url.parse(req.url).name,
                        path: path.join(pathName, '/'),
                        files: []
                    };
                data.files = fs.readdirSync(realPath); // 返回当前目录
                res.writeHeader(200,{
                    'Content-type':'text/html'
                });
                res.end(template(data));
            }else{
                let extension = path.extname(pathName).replace('.',''),
                    fileType = mime[extension] || 'text/plain';
                res.writeHeader(404,{
                    'Content-type':fileType
                });
                fs.createReadStream(realPath).pipe(res);
            }
        }
    });
});
server.listen(process.argv[2] || 9000);
