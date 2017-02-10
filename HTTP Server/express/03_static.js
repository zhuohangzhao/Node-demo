/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";

const express = require('express');
const app = express();

app.use(express.static('files'));   // 中间件express.static

app.listen(3000,()=>{
    console.log('Example app listening on port 3000!');
});