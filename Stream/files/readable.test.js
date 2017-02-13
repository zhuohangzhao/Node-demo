/**
 * Created by Administrator on 2017/2/11.
 */

const ToReadable = require('./../demo/04.readable.js');

const iterator = function (limit) {
    return {
        next: function () {
            if(limit--) {
                return {done: false, value: limit + Math.random()}
            }
            return {done: true}
        }
    }
}(100);

const readable = new ToReadable(iterator);

// 监听`data`事件，一次获取一个数据
readable.on('data', (data) => process.stdout.write(data));

// 监听`data`事件，一次获取一个数据
readable.on('end', () =>  process.stdout.write('DONE'));

