
var createArray = require('./arrayMaker.js');
var trackModified = require('./trackerModified.js');
var trackStandard = require('./trackerStandard.js');

var arr = createArray(1000, 100000);

var modTime = function () {
    console.time('Modified');
    trackModified(arr);
    console.timeEnd('Modified');
};

var standTime = function () {
    console.time('Standard');
    trackStandard(arr);
    console.timeEnd('Standard');
};

console.log('pass 1');
modTime();
standTime();
console.log('pass 2');
modTime();
standTime();
console.log('pass 3');
modTime();
standTime();
console.log('pass 4');
modTime();
standTime();
console.log('pass 5');
modTime();
standTime();