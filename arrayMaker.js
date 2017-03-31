function createArray (range, length) {
    var dataArray = [];
    for(var i = 0; i < length; i++){
        dataArray.push(Math.floor(Math.random() * range + 1));
    }
    return dataArray;
};

module.exports = createArray;