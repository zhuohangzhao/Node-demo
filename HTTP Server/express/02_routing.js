/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";
const express = require('express');
const app = express();

app.get('/',function(req,res){
    res.send('hello world');
});
app.post('/',(req,res) => {
    res.send('Got post request');
});
app.put('/user',(req,res) => {
    res.send('Got put request at /user');
});
app.delete('/user',(req,res) => {
    res.send('got a delete request at /user')
});

app.listen(3000);