

// 改进下,不出现乱码

var fs = require('fs');

var rs = fs.createReadStream('test.md',{highWaterMark: 5});

rs.setEncoding('utf8'); // data事件传递的不再是Buffer，而是编码后的字符串，原理参考 3.string_decoder.js

var content = '';

rs.on('data',function(chunk){
    content += chunk;
});

rs.on('end',function(){
    console.log(content);
});

