/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('hello world');
});

app.listen(3000);