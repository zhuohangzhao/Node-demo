//创建可写流。

// 前面通过继承的方式去创建一类可读流，这种方法也适用于创建一类可写流，只是需要实现的是_write(data, enc, next)方法，而不是_read()方法。

const Writable = require('stream').Writable;

const ws =  Writable();

ws._write = function (data, enc , next) {
    // 将流中的数据写入底层
    process.stdout.write(data.toString().toUpperCase());

    // 写入完成时，调用`next()`方法通知流传入下一个数据
    process.nextTick(next);
};

// 监听事件，所有数据均已写入底层
ws.on('finish', () => process.stdout.write('Done'));

// 将一个数据写入流中
ws.write('a' + '\n');
ws.write('b' + '\n');
ws.write('c' + '\n');

// 再无数据写入流时，需要调用`end`方法
ws.end();

