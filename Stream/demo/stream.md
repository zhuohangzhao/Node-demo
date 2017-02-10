# 流模块基础 
   在node中，一共有五种类型的流：readable,writable,transform,duplex以及"classic"

## pipe

   无论哪一种流，都会使用.pipe()方法来实现输入和输出。
   .pipe()函数很简单，它仅仅是接受一个源头src并将数据输出到一个可写的流dst中

    src.pipe(dst)
    a.pipe(b).pipe(c).pipe(d)
## readable流

    看代码 readable
     process.stdin  标准的输入设备
     process.stdout 标准的输出设备
## writable流

   一个writable流指的是只能流进不能流出的流
   
## transform流

   将transform流想象成一个流的中间部分，它可以读也可写，但是并不保存数据，它只负责处理流经它的数据
   
## duplex流
   
   Duplex流是一个可读也可写的流，就好像一个电话，可以接收也可以发送语音