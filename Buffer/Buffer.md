# Buffer

##1.1 概念

JavaScript对字符串操作十分友好，无论是单字节字符串还是宽字节字符串都被认为是一个字符串

    '0123456789'.length; // 10
    '零壹贰叁肆伍陆柒捌玖'.length; // 10

在Node应用需要处理网络协议、数据库、图片、文本文件等大量二进制数据，JavaScript自带的字符串不能满足这些场景，`Buffer`应运而生

>Prior to the introduction of TypedArray in ECMAScript 2015 (ES6), the JavaScript language had no mechanism for reading or manipulating streams of binary data. The Buffer class was introduced as part of the Node.js API to make it possible to interact with octet streams in the context of things like TCP streams and file system operations.

Buffer是一个类数组对象，主要用于操作字节。性能相关的由C++实现，非性能相关部分JavaScript实现。Buffer所占用的内存不是通过V8分配的，属于堆外内存。

NodeJS在启用的时候就将Buffer加载到了**全局对象（global)**，使用的时候不用require。

##1.2 实例化


    // 用 Buffer.alloc(size[,fill[,encoding]]) 代替 new Buffer(size)
        
        Buffer.alloc(5,'a','utf-8')
        // Buffer< 61 61 61 61 61>
      
    // 现在新建一个数组，用 Buffer.from(array) 代替 new Buffer(array) 
      
        const buf2 = new Buffer([1,2,3]);
        // creates a buffer containing [01, 02, 03]
    
    // 用 Buffer.from(string[,encoding]) 代替了 new Buffer(string)
    
        const buf1 = Buffer.from('this is a tést');
        buf1.toString()
    
    // 用 Buffer.from(buffer) 代替了 new Buffer(buffer)
        
        const buf1 = new Buffer('buffer');
        const buf2 = Buffer.from(buf1);
    

##1.3 encoding     编码，字符集

* 'ascii' 美国信息交换标准代码 - for 7-bit ASCII data only. This encoding method is very fast and will strip the high bit if set.

* 'utf8' 是一种变长的编码格式它用一个字节表示常见字符，用3个字节表示不常见字符，如汉字等 - Multibyte encoded Unicode characters. Many web pages and other document formats use UTF-8.

* 'utf16le' - 2 or 4 bytes, little-endian encoded Unicode characters. Surrogate pairs (U+10000 to U+10FFFF) are supported.

* 'ucs2' - Alias of 'utf16le'.

* 'base64' - Base64 string encoding. When creating a buffer from a string, this encoding will also correctly accept "URL and Filename Safe Alphabet" as specified in RFC 4648, Section 5.

* 'binary' 二进制 - A way of encoding the buffer into a one-byte (latin-1) encoded string. The string 'latin-1' is not supported. Instead, pass 'binary' to use 'latin-1' encoding.

* 'hex' 十六进制 - Encode each byte as two hexadecimal characters.

&nbsp;

    const buf = Buffer.from('hello world', 'ascii');

    console.log(buf.toString('hex'));
    // prints: 68656c6c6f20776f726c64

    console.log(buf.toString('base64'));
    // prints: aGVsbG8gd29ybGQ=


##1.4 byteLength & length      字符长度

获取字符串实际占用字节长度 Buffer.byteLength(string[, encoding])

    const str = '\u00bd + \u00bc = \u00be';

    console.log(`${str}: ${str.length} characters, ` +
            `${Buffer.byteLength(str, 'utf8')} bytes`);

    // ½ + ¼ = ¾: 9 characters, 12 bytes

length 获取Buffer对象占用空间

    const buf = Buffer.alloc(1234);

    console.log(buf.length);
      // Prints: 1234

    buf.write('some string', 0, 'ascii'); 给buf里写东西
    console.log(buf.length);
    // Prints: 1234

length属性可变

    var buf = Buffer.alloc(10);
    buf.write('abcdefghj', 0, 'ascii');
    console.log(buf.length);
      // Prints: 10
    buf = buf.slice(0,5);
    console.log(buf.length);
      // Prints: 5

##1.5 Buffer.write(string[,offset[,length][,encoding]])
    
offset: 起始位置
    
     const buf = Buffer.allocUnsafe(256);
     
     const len = buf.write('\u00bd + \u00bc = \u00be', 0);
     
     // Prints: 12 bytes: ½ + ¼ = ¾
     console.log(`${len} bytes: ${buf.toString('utf8', 0, len)}`);
    


##1.6  Buffer.concat(list[, totalLength])

拼接多个Buffer，第一个参数是Buffer对象列表，第二个是总长度，添加后可以提升性能

    const buf1 = Buffer.alloc(10,0);  
    const buf2 = Buffer.alloc(14,0);
    const buf3 = Buffer.alloc(18,0);
    const totalLength = buf1.length + buf2.length + buf3.length;

    console.log(totalLength); // 42
    const bufA = Buffer.concat([buf1, buf2, buf3], totalLength);
    console.log(bufA);
    console.log(bufA.length);

    // 42
    // <Buffer 00 00 00 00 ...>
    // 42

##1.7 buf.copy(targetBuffer[, targetStart[, sourceStart[, sourceEnd]]])

复制Buffer到另一个Buffer对象，可以指定开始、结束位置

    const buf1 = Buffer.alloc(26);
    const buf2 = Buffer.alloc(26,'!');

    for (var i = 0 ; i < buf1.length ; i++) {
      buf1[i] = i + 97;     // 97 is ASCII a
    }

    buf1.copy(buf2, 8, 16, 20);     
    console.log(buf2.toString());
    // !!!!!!!!qrst!!!!!!!!!!!!!

##1.8  buf.equals(otherBuffer)

比较两个Buffer对象内容是否一致

    const buf1 = Buffer.from('ABC');
    const buf2 = Buffer.from('414243', 'hex');
    const buf3 = Buffer.from('ABCD');

    console.log(buf1.equals(buf2));
      // Prints: true
    console.log(buf1.equals(buf3));
      // Prints: false

##1.9 buf.fill(value[, offset[, end]][, encoding])

为Buffer对象填充内容

    const b = Buffer.from(50).fill('h');
    console.log(b.toString());
      // Prints: hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
      
    const c = Buffer.from(50).fill('c', 2, 10, 'utf8');

##2.0 buf.indexOf(value[, byteOffset][, encoding])

    const buf = Buffer.from('this is a buffer');

    buf.indexOf('this');
      // returns 0
    buf.indexOf('is');
      // returns 2
    buf.indexOf(Buffer.from('a buffer'));
      // returns 8
    buf.indexOf(97); // ascii for 'a'
      // returns 8
    buf.indexOf(Buffer.from('a buffer example'));
      // returns -1
    buf.indexOf(Buffer.from('a buffer example').slice(0,8));
      // returns 8

    const utf16Buffer = Buffer.from('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

    utf16Buffer.indexOf('\u03a3',  0, 'ucs2');
      // returns 4

##2.1 buf.slice([start[, end]])

返回一个和原Buffer共享内存的Buffer，可以通过后两个参数改变offset和长度

    const buf1 = new Buffer(26);

    for (var i = 0 ; i < 26 ; i++) {
      buf1[i] = i + 97; // 97 is ASCII a
    }

    const buf2 = buf1.slice(0, 3);
    buf2.toString('ascii', 0, buf2.length);
      // Returns: 'abc'
    buf1[0] = 33;
    
    buf2.toString('ascii', 0, buf2.length);
      // Returns : '!bc'

##2.2 buf.toString([encoding[, start[, end]]])

    const buf = new Buffer(26);
    for (var i = 0 ; i < 26 ; i++) {
      buf[i] = i + 97; // 97 is ASCII a
    }
    buf.toString('ascii');
      // Returns: 'abcdefghijklmnopqrstuvwxyz'
    buf.toString('ascii',0,5);
      // Returns: 'abcde'
    buf.toString('utf8',0,5);
      // Returns: 'abcde'
    buf.toString(undefined,0,5);
      // Returns: 'abcde', encoding defaults to 'utf8'

