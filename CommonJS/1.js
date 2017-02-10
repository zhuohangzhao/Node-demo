
//module.exports 输出一个模块，
var x = 5;
var mod1 = function (value){
    return value + x;
}
module.exports.x = x;
module.exports.mod1 = mod1;
