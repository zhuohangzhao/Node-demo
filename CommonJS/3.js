//本文 mod1 和 1.js 文件中mod1变量名相同，并不冲突
var exports = module.exports;
var mod1 = {
    Fix:function(){
        console.log('我是fix函数');
    },
    Obj:{
        a:1,
        b:2
    }
};
exports.mod1 = mod1;