process.stdin.on('readable', function () {
    var buf = process.stdin.read(3);
    console.log(buf);
    process.stdin.read(0);

});
//直接来消耗一个readable流