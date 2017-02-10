/**
 * Created by Administrator on 2017/2/10.
 */
var fs = require('fs');


fs.readFile('./test.md',function(err, data) {
    if(err) throw err;
    console.log(data); // data 是 buffer
});


fs.writeFile('test.md', 'Hello Node.js', (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
});


fs.stat('test.md',function(err,data){
    if (err) throw err;
    console.log(data)
});