var DoubleLinkedList = require('./DLLStandardAdjusted');

function trackNumberOfOccurences (dataArray) {

    //set a timing function to show how long it takes

    // function findNewPosition (item, result) {
    //     var targetCount = result.payload.count;

    //     while(result.status === 'change') {
    //         result = dll.checkPosition(result.payload.prior, targetCount);
    //     }
    //     return dll.list[result.payload].prior;
    // };

    var dll = new DoubleLinkedList();
    var item = undefined;
    var result = {};

    for(var i = 0; i < dataArray.length; i++) {
        item = dataArray[i];
        result = dll.insert(item);
        // check to see if the node needs it's position changed
        //if result.status is 'change' then insert at new position;
        if(result.status === 'change') {
            // console.log('after ', result.payload.insertAfterNode)
            // console.log('cur ', result.payload.currentNode)
            // remove the newElement node and sew up the tear in the links
            dll.remove(result.payload.currentNode)
            // insert the newElement node after the peviousNode and update links
            // console.log('remove after ', result.payload.insertAfterNode)
            // console.log('remove cur ', result.payload.currentNode)
            dll.insert(result.payload.currentNode, result.payload.insertAfterNode)
        }
        // console.log('i ', i, 'display ', dll.display());
    }
    // console.log(dll.list);
    // console.log(dll.display());
    // console.log(dll.showList('R'));
};

module.exports = trackNumberOfOccurences;
