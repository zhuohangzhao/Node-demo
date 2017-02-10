/**
 * Created by Administrator on 2016/12/17.
 */
'use strict'

    function getTime(){
        var dtd =$.Deferred();
            setTimeout(function(){
                var now = Date.now();
                if(now%2 === 0){
                    dtd.resolve(now);
                }else{
                    dtd.reject(now);
                }
            },1000)

            return dtd.promise;
};

getTime().done(function(time){
    console.log(`OK: ${time}`);
}).fail(function(time){
    console.log(`Error: ${time}`);
}).always(function(time){
    console.log(time);
});