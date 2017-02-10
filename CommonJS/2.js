/**
 * Created by Administrator on 2016/12/17.
 */
// 需要用到什么模块，就require一个模块
var example1 = require('./1.js');
var example2 = require('./3.js');
console.log(example1.x);
console.log(example1.mod1);

console.log(example2.mod1);
console.log(example2.mod1.Fix);
console.log(example2.mod1.Obj);