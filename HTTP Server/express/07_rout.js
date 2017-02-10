/**
 * Created by Administrator on 2016/12/25.
 */
'use strict';

const express = require('express');

let app = express();

app.route('/book')
    .get((req, res) => {
        res.send('Get a random book');
    })
    .post((req, res) => {
        res.send('Add a book');
    })
    .put((req, res) => {
        res.send('Update the book');
    });

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});