var Readable = require('stream').Readable;

var rs =  Readable();
rs.push(Buffer.from('Hello\n'));
rs.push(null);      // 告诉rs输出数据应该结束了

rs.pipe(process.stdout);
console.log(1);


//需要注意的一点是我们在将数据输出到process.stdout之前已经将内容推送进readable流rs中，但是所有的数据依然是可写的。
//这是因为使用.push()将数据推进一个readable流中时，一直要到一个东西来消耗数据之前，数据都会存在一个缓存中。然而，在更多的情况下，我们想要的是当需要数据时数据才会产生，以此来避免大量的缓存数据。
