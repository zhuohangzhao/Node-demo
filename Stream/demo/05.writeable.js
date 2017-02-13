
var Writable = require('stream').Writable;
var ws =  Writable();

ws._write = function (chunk, enc, next) {
    process.stdout.write(chunk.toString().toUpperCase());
    next();
};

process.stdin.pipe(ws);

//第一个参数，chunk代表写进来的数据。

//第二个参数enc代表编码的字符串，但是只有在opts.decodeString为false的时候你才可以写一个字符串。

//第三个参数，next(err)是一个回调函数，使用这个回调函数你可以告诉数据消耗者可以写更多的数据。你可以有选择性的传递一个错误对象error，这时会在流实体上触发一个emit事件。

//在从一个readable流向一个writable流传数据的过程中，数据会自动被转换为Buffer对象，除非你在创建writable流的时候制定了decodeStrings参数为false,Writable({decodeStrings: false})。

//如果你需要传递对象，需要指定objectMode参数为true，Writable({ objectMode: true })