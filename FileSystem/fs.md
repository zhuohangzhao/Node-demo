# File System

该模块提供本地文件的读写能力

##1.1 fs.readFile(file[, options], callback)

`readFile`方法用于异步读取数据

    var fs = require('fs');
    
    fs.readFile('./test.md',function(err, data) {
        if(err) throw err;  
        console.log(data);     // data 是 buffer
    });
    
如果`options`里`encoding`没有被设置，默认返回`buffer`。
    
    fs.readFile('./test.md', 'utf8', callback);
    
对应的同步读取文件  fs.readFileSync(file[, options]) 


##1.2 fs.writeFile(file, data[, options], callback)


异步写文件，如果文件里有内容，会被写入的内容代替。`encoding`默认是 `'utf8'`

    fs.writeFile('test.md', 'Hello Node.js', (err) => {
        if (err) throw err;
        console.log('It\'s saved!');
    });

对应同步写文件 fs.writeFileSync(file, data[, options])


##1.3 fs.stat(path, callback)

`stat`方法的参数是一个文件或目录，它产生一个对象，该对象包含了该文件或目录的具体信息。我们往往通过该方法，判断正在处理的到底是一个文件，还是一个目录。

回调函数含两个`argument(err,stats)`，文件的详细信息`stats`
    
    fs.stat('test.md',function(err,data){
        if (err) throw err;
        console.log(data)
    });
    
    //文件的详细信息
    
     { dev: 983439,
     mode: 33206,
         nlink: 1,
         uid: 0,
         gid: 0,
         rdev: 0,
         blksize: undefined,
         ino: 10977524091775222,
         size: 416,
         blocks: undefined,
         atime: 2017-02-10T08:03:37.163Z,
         mtime: 2017-02-10T08:03:37.163Z,
         ctime: 2017-02-10T08:03:59.038Z,
         birthtime: 2017-02-10T07:22:57.591Z }    
    
对应同步方法 fs.statSync(path)


##1.4 fs.mkdir(path[, mode], callback)

创建新目录

    var fs = require('fs');
    
    fs.mkdir('./helloDir',0777, function (err) {
      if (err) throw err;
    });
    
对应同步方法 fs.mkdirSync(path[, mode])


##1.5  fs.readdir(path[, options], callback)

读取目录，返回一个所包含的文件和子目录的数组。
   
   
##1.6 fs.watchFile(filename[, options], listener)

`watchfile`方法监听一个文件，如果该文件发生变化，就会自动触发回调函数。

    const fs = require('fs');
    
    fs.watchFile('test2.md', (curr, prev) => {
        console.log(`the current mtime is: ${curr.mtime}`);
        console.log(`the previous mtime was: ${prev.mtime}`);
    });

这些统计的对象都是来自`fs.stat`

`fs.watch(filename[, options][, listener])` 比 `fs.watchFile` 更高效，建议用 `fs.watch`












