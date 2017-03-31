var DoubleLinkedList = require('./DLListModified');

function trackNumberOfOccurences (dataArray) {

    //ToDo:
    //set a timing function to show how long it takes for each insert

    function findNewPosition (item, result) {
        var targetCount = result.payload.count;

        while(result.status === 'change') {
            result = dll.checkPosition(result.payload.prior, targetCount);
        }
        return dll.list[result.payload].prior;
    };

    var dll = new DoubleLinkedList();
    var item = undefined;
    var result = undefined;

    for(var i = 0; i < dataArray.length; i++) {
        item = dataArray[i];

        // check if item is in the list, if result is undefined then add the item
        result = dll.checkPosition(item);

        if(!(result.status)) {
            dll.add(item);
        }

        //increase the item's count by 1
        dll.incrementCount(item);

        //check if item's position is OK
        result = dll.checkPosition(item, dll.list[item].count);
        //if reslut is 'change' then updatePosition;
        if(result.status === 'change') {
            //determine how far left you need to move the item
            var newPosition = findNewPosition(item, result);
            dll.updatePosition(item, newPosition);
        }
        // console.log(i, dll.showList());
    }
    // console.log(dll.list);
    // console.log(dll.showList());
    // console.log(dll.showList('R'));
};

module.exports = trackNumberOfOccurences;
// var arr = createArray(5, 100)
// trackNumberOfOccurences(arr);