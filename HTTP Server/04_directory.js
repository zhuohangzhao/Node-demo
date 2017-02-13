/**
 * Created by Administrator on 2016/12/21.
 */
'use strict';

const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const handlebars = require('handlebars');

    let server = http.createServer((req,res) => {
        let pathName = url.parse(req.url).pathname,
            realPath = path.join(__dirname, pathName);

        // 判断文件是否存在
        fs.stat(realPath,(err,stats) => {
            if(err){        //  判断 file or forder do not exists
                res.writeHead(404, {
                    'content-type':'text/html'
                });
                // handlebars 模板渲染
                let source = fs.readFileSync('./template/404.html'),
                    template = handlebars.compile(source.toString()),
                    data = {
                        path: pathName

                    };
                res.end(template(data));

            }else{
                if(stats.isDirectory()){
                    let source = fs.readFileSync('./template/directory.html'),
                        template = handlebars.compile(source.toString()),
                        data = {
                            title:url.parse(req.url).name,
                            path:path.join(pathName, '/'),
                            files:[]
                        };

                    data.files = fs.readdirSync(realPath); // 返回当前目录
                    res.end(template(data));
                    // 异步回调
                    // fs.readdir(realPath, (err, files) => {
                    //     data.files = files;
                    //     res.end(template(data));
                    // });
                }else{
                    fs.createReadStream(realPath).pipe(res);
                }

            }
        })
    });

server.listen(process.argv[2] || 9000);