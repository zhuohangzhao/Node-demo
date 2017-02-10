/**
 * Created by Administrator on 2016/12/17.
 */
'use strict'


function getTime() {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            var now = Date.now();

            if (now % 2 === 0) {
                resolve(now);
            } else {
                reject(now);
            }
        }, 500);
    });

    return promise;
}

// getTime().then((n) => {
//     console.log(`OK: ${n}`);
// }, (n) => {
//     console.log(`Error: ${n}`);
// });

getTime().then(n => {
    console.log(`OK: ${n}`);
}).catch(n => {
    console.log(`Error: ${n}`);
});

function log(n) {
    var promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log(n)
            resolve();
        }, 200);
    });

    return promise;
}

getTime().then(log)
    .then(() => {
        console.log('done');
    })
    .catch(err => {
        console.error(err + ' is odd!');
    });