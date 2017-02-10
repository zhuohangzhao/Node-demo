/**
 * Created by Administrator on 2017/2/10.
 */

const fs = require('fs');

fs.watchFile('test2.md', (curr, prev) => {
    console.log(`the current mtime is: ${curr.mtime}`);
    console.log(`the previous mtime was: ${prev.mtime}`);
});

