##     http

###    fs.stat(path,callback)
        callback(err,stats) 带两个参数
        stats:有以下常用属性
          atime:Acess Time  访问时间
          birthtime: 文件创建时间
          mtime: Modified Time 修改时间
        fs.stats.__protot__:
            stats.isFile()
            stats.isDirectory()
            stats.isBlockDevice()
            stats.isCharacterDevice()
            stats.isSymbolicLink() (only valid with fs.lstat())
            stats.isFIFO()
            stats.isSocket()

###    fs.readdir(path[,options],callback)
        path: String | Buffer
        callback(err,files) : files 是一个文件名的数组

###    response.setHeader(name,value)
      example:
        response.setHeader('Content-Type', 'text/html');
        response.setHeader('Set-Cookie', ['type=ninja', 'language=javascript']);
        
###    response.writeHead(statusCode[, statusMessage][, headers])
        statusCode: 状态码 200 404 ...
        statusMessage: 状态信息，一般不写，浏览器会带 404 not Found
        headers：'Content-Type': 'text/plain'
      example:
        response.writeHead(200, {'Content-Type': 'text/plain' });
        
###    response.write(chunk[, encoding][, callback])
        
###    path.join([...paths])
      example:
        path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')  // returns '/foo/bar/baz/asdf'
###    path.extname(path) 
        path :类型 <string> 
        获取路径拓展名 .html .md ...
       example:
        path.extname('index.html')    // returns '.html'  
        path.extname('index.coffee.md')  // returns '.md'
        path.extname('index.')   // returns '.'  
        path.extname('index')   // returns ''
    
###    path.normalize(path)  
        路径规范化，解决 '..','.'的问题
        path : String   
       example: 
        path.normalize(pathName.replace(/\.\./g,''))
        
###    zlib
        压缩文件
        zlib.createGzip();
        zlib.createDeflate();
       example:
        const gzip = zlib.createGzip();
        const fs = require('fs');
        const inp = fs.createReadStream('input.txt');
        const out = fs.createWriteStream('input.txt.gz');
        inp.pipe(gzip).pipe(out);
    