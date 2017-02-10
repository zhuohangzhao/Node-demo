/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

const express = require('express');

let router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.get('/', function(req, res) {
    res.send('Birds home page');
});

router.get('/about', function(req, res) {
    res.send('About birds');
});

let app = express(),
    router2 = require('./userRouter.js');

app.use('/birds', router);
app.use('/user', router2);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});