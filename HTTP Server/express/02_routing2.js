/**
 * Created by Administrator on 2016/12/25.
 */
"use strict";

const express = require('express');
const app = express();

// Route method 路由方法
app.get('/',function(req,res){
    res.send('GET request to the homepage')
});

app.post('/', function (req, res) {
    res.send('POST request to the homepage');
});

// all(),可以用get，post，put，delete...其他所有http请求
app.all('/secret', function(req,res,next){
    console.log('accessing the secret section');
    next();
});


// Route paths  支持正则，字符串
app.get('/ab?cd', function(req, res) {
    res.send('ab?cd');
});

app.get('/ab+cd', function(req, res) {
    res.send('ab+cd');
});

app.get('/ab*cd', function(req, res) {
    console.log('ab*cd');
    res.send('ab*cd');
});

app.get('/ab(cd)?e', function(req, res) {
    res.send('ab(cd)?e');
});
// 任何包含xx的路径
app.get(/xx/, function(req, res) {
    res.send('/xx/');
});
app.get('/example/b', function(req,res,next){
    console.log('the responese will be sent by the next function ...');
    next();
},function(req,res){
    res.send('Hello from B')
});


// 支持回调
var cb0 = function (req, res, next) {
    console.log('CB0');
    next();
};

var cb1 = function (req, res, next) {
    console.log('CB1');
    next();
};

var cb2 = function (req, res) {
    res.send('Hello from C!');
};

app.get('/example/d', [cb0, cb1], function (req, res, next) {
    console.log('the response will be sent by the next function ...');
    next();
}, function (req, res) {
    res.send('Hello from D!');
});
app.get('/example/c', [cb0, cb1, cb2]);



app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
