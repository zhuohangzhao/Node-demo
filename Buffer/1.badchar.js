
// Buffer乱码  中文出现乱码

var fs = require('fs');

var rs = fs.createReadStream('test.md',{highWaterMark: 5});

var content = '';

rs.on('data',function(chunk){
    content += chunk;    // highWaterMark：高水位，高出水位线就触发一次data事件，消费chunk
});

rs.on('end',function(){
    console.log(content);
});


/**
 * Created by Administrator on 2017/2/10.
 */


