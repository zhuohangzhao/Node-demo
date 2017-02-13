// 创建可读可写流。

// Duplex实际上就是继承了Readable和Writable的一类流。
// 所以，一个Duplex对象既可当成可读流来使用（需要实现_read方法），也可当成可写流来使用（需要实现_write方法）。


var Duplex = require('stream').Duplex;

var duplex =  Duplex();

// 可读端底层读取逻辑
duplex._read = function () {
    this._readNum = this._readNum || 0;
    if(this._readNum > 1) {
        this.push(null);
    } else {
        this.push('' + (this._readNum++))
    }
};

// 可写端底层写逻辑
duplex._write = function (buf, enc , next) {
    process.stdout.write('_write ' + buf.toString() + '\n');
    next()
};

duplex.on('data', data => console.log('ondata', data.toString()));

duplex.write('a');
duplex.write('b');

duplex.end();

