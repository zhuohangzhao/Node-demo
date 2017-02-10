/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";

const express = require('express');
const app = express();

app.use('/public',express.static('files')); // 把/files 重命名 /public

app.listen(3000,()=>{
    console.log('Example app listening on port 3000!');
});