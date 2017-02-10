/**
 * Created by Administrator on 2017/2/10.
 */

const fs = require('fs');

fs.readdir('./', function (err,files) {
    if(err) throw err;
    files.forEach(function (file, index) {
        fs.stat(file, function (err, info) {
            if(err) throw err;
            console.log(info);
        })
    })
});

// { dev: 983439,
// mode: 33206,
//     nlink: 1,
//     uid: 0,
//     gid: 0,
//     rdev: 0,
//     blksize: undefined,
//     ino: 10977524091775222,
//     size: 416,
//     blocks: undefined,
//     atime: 2017-02-10T08:03:37.163Z,  // access time 访问时间
//     mtime: 2017-02-10T08:03:37.163Z,     // modified time  修改时间  Time when file data last modified.
//     ctime: 2017-02-10T08:03:59.038Z,     // change time  修改时间    Time when file status was last changed (inode data modification)
//     birthtime: 2017-02-10T07:22:57.591Z }    // 文件生成时间


