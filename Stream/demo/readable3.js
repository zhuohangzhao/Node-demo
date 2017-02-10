var Readable = require('stream').Readable;
var rs = new Readable();

var c = 97 - 1;

rs._read = function () {
    if(c > 'z'.charCodeAt(0)){
        return rs.push(null);
    }

    setTimeout(function(){
        rs.push(String.fromCharCode(++c));
    }, 100);
};
// setTimeout很重要，因为操作系统需要花费一些时间来发送程序结束信号

rs.pipe(process.stdout);

process.on('exit', function () {
    console.error('\n_read() called ' + (c - 97) + ' times');
});
process.stdout.on('error', process.exit);
