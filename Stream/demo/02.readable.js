var Readable = require('stream').Readable;

var rs =  Readable();
var c = 97;

rs._read = function(){
    rs.push(String.fromCharCode(c++));
    if(c > 'z'.charCodeAt(0)){
        rs.push(null);
    }
};

rs.pipe(process.stdout);

// 将字母 a-z推进rs中，只有在数据消耗者出现时，_read函数才会被调用

