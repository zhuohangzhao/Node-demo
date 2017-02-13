/**
 * Created by Administrator on 2017/2/11.
 */



//Readable未设置objectMode时：

const Readable = require('stream').Readable;

const readable = Readable();

readable.push('a');
readable.push('b');
readable.push(null);

readable.on('data', data => console.log(data));

//输出：

// <Buffer 61>
// <Buffer 62>
// Readable设置objectMode后：

const Readable = require('stream').Readable;

const readable = Readable({ objectMode: true });

readable.push('a');
readable.push('b');
readable.push({});
readable.push(null);

readable.on('data', data => console.log(data));

// 输出：
//
// a
// b
// {}
