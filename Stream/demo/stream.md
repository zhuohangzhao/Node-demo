# 流模块基础 
   在node中，一共有五种类型的流：`readable`, `writable`, `transform`, `duplex`以及`"classic"`

##1.1 pipe

   无论哪一种流，都会使用.pipe()方法来实现输入和输出。
   `.pipe()`函数很简单，它仅仅是接受一个源头`src`并将数据输出到一个可写的流`dst`中

    src.pipe(dst)
    
   `.pipe(dst)`将会返回dst因此你可以链式调用多个流:
   
    a.pipe(b).pipe(c).pipe(d)
    
    // 上面代码也可以等价为：
    
    a.pipe(b);
    b.pipe(c);
    c.pipe(d);
    
##1.2 readable流

`Readable`流可以产出数据，你可以将这些数据传送到一个`writable`，`transform`或者`duplex`流中，只需要调用`pipe()`方法:       
    
     process.stdin  标准的输入设备
     process.stdout 标准的输出设备
   
     
##1.3 writable流

一个`writable`流指的是只能流进不能流出的流
   
    src.pipe(writableStream)
   
   
##1.4 transform流

   将transform流想象成一个流的中间部分，它可以读也可写，但是并不保存数据，它只负责处理流经它的数据
   
##1.5 duplex流
   
   创建可读可写流。
   
   Duplex实际上就是继承了Readable和Writable的一类流。
   所以，一个Duplex对象既可当成可读流来使用（需要实现_read方法），也可当成可写流来使用（需要实现_write方法）。
   
##1.6 objectMode

 对于可读流来说，push(data)时，data只能是String或Buffer类型，而消耗时data事件输出的数据都是Buffer类型。
 
 对于可写流来说，write(data)时，data只能是String或Buffer类型，_write(data)调用时传进来的data都是Buffer类型。
 
 也就是说，流中的数据默认情况下都是Buffer类型。产生的数据一放入流中，便转成Buffer被消耗；写入的数据在传给底层写逻辑时，也被转成Buffer类型。

 但每个构造函数都接收一个配置对象，有一个objectMode的选项，一旦设置为true，就能出现“种瓜得瓜，种豆得豆”的效果。
 
 
 
 参考：http://tech.meituan.com/stream-internals.html
 
 