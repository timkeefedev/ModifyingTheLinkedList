function Node (prior, next, count) {
    this.prior = prior;
    this.next = next;
    this.count = count;
};

function DoubleLinkedList () {
    // Visual illistration of the structure.......

    // {key: {key: value}} .... {data: {prior: priorPointer, next: nextPointer, count: value}
    // This is not a series of nested nextNodes, it is a flat sturcture.
    // For example, inputing a 100 element array with random numbers 1 through 5 will produce.......
    //   {
    //      '1': Node { prior: 5, next: 2, count: 15 },
    //      '2': Node { prior: 1, next: null, count: 15 },
    //      '3': Node { prior: 'head', next: 4, count: 27 },
    //      '4': Node { prior: 3, next: 5, count: 22 },
    //      '5': Node { prior: 4, next: 1, count: 21 },
    //      head: Node { prior: null, next: 3, count: null },
    //      tail: 2
    //   }

    this.list = {'head' : new Node(null, null, null)};
    //assign the tail property the key of the last item added to list
    this.list.tail = 'head';
};

DoubleLinkedList.prototype.checkPosition = function (item, targetCount) {
    var node = this.list[item];

    if(node !== undefined){

        // check if the prior node's count is not null/the head and less than target.count
        if(this.list[node.prior].count &&
            targetCount > this.list[node.prior].count) {
            //position needs to be changed';
            return {status: 'change',
                    payload: node};
        }
        //position OK';
        return {status: 'OK',
                payload: item};
    }
    //not found
    return {status: undefined};
};

DoubleLinkedList.prototype.incrementCount = function (item) {
    this.list[item].count++;
};

DoubleLinkedList.prototype.add = function (item, after) {

    if (after === undefined || this.list[after].next === null ) {
        //get the last key/value added to the list and assign the pointer value to the new item
        this.list[this.list.tail].next = item;
        //add the new item to the list object
        this.list[item] = new Node(this.list.tail, null, 0);
        //update the tail property to point to the new value at end of list
        this.list.tail = item;
    } else {
        var afterPointer = this.list[after].next;
        //add the new item and assign the pointer to the stored [after] pointer
        this.list[item].prior = after;
        this.list[item].next = afterPointer;
        //reassign after's next property to point to new item
        //get the after key properties object {prior: x, next: y}
        this.list[after].next = item;
        //reassing [after].next's prior property to point to new item
        //get the after.next key prior properties object {prior: x, next: y}
        this.list[afterPointer].prior = item;
    }
};

DoubleLinkedList.prototype.remove = function (item) {
    var node = this.list[item];

    if(node === undefined) {
        return 'failed to find item';
    }
    var priorItem = node.prior;
    var nextItem = node.next;
    // delete node;

    // update the node to the left of removed node to removed node's .next item
    this.list[priorItem].next = nextItem;
    // check to see if the right node is the tail
    if (item === this.list.tail) {
        this.list.tail = priorItem;
    } else {
        // update the node to the right of removed node to removed node's .prior item
        this.list[nextItem].prior = priorItem;
    }
};

//move the item to new position
DoubleLinkedList.prototype.updatePosition = function (item, newAfter) {
    // var t0 = 0;
    // var t1 = 0;

    // t0 = performance.now();
    this.remove(item);
    // t1 = performance.now();
    // console.log('remove ',t1 - t0);

    // t0 = performance.now();
    this.add(item, newAfter);
    // t1 = performance.now();
    // console.log('add ',t1 - t0);
};

DoubleLinkedList.prototype.getNextItem = function (item) {
    return this.list[item].next;
};

DoubleLinkedList.prototype.getPriorItem = function (item) {
    return this.list[item].prior;
};

DoubleLinkedList.prototype.showList = function (direction) {
    var item;

    if(direction === 'R') {
        direction = this.getPriorItem;
        item = this.list.tail;
    } else {
        direction = this.getNextItem;
        item = direction.call(this,'head');
    }

    var items = [];

    while(item) {
        items.push(item);
        item = direction.call(this, item);
    }
    if(items[0] === this.list.tail) {
        items.pop();
    }
    return items;
};

module.exports = DoubleLinkedList;
