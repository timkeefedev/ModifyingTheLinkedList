
// Code copied from
// Data Structures and Algorithms with JavaScript, First Edition; Michael McMillan

// Modifications in order to input data with only one argument instead of two
// a line of code added in the Node Constructor
// a line to increment the count property
// several lines to create an add to end of list function
// several lines to create a checkPostion function that checks where to place the updated node
// a line in the find function to call checkPosition
// and the module.exports line


function Node (element) {
    this.element = element;
    this.next = null;
    this.previous = null;
    // I added the count property
    this.count = null;
};

function LList () {
    // Visual illistration of the structure.......
    // A series of nested nodes...
    // {head: {next: [Node] {next: next[Node], previous: prior[Node]}, previous: prior[Node]}} previous: null} ....

    // For example, with Michael's data from the book......
    // cities LList { head: Node { element: 'head',
    //                next: Node { element: 'Conway',
    //                             next: [Object],         -- points to next node object
    //                             previous: [Circular]    -- points to prior node object
    //                           },
    //                previous: null
    //               },

    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
    //I added a function to find the spot where
    this.checkPostion = checkPostion;
};

function dispReverse () {
    var currNode = this.head;
    currNode = this.findLast();
    while(!(currNode.previous == null)) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }
};

function findLast () {
    var currNode = this.head;
    // changed the conditional from (!(currNode.next == null))
    // for readability and to asssure it checks value and TYPE
    // undefined == null is true, but undefined === null is false
    while(currNode.next !== null) {
        currNode = currNode.next;
    }
    return currNode;
};

// adjusted f(x)... remove item if it is the TAIL
// adjusted f(x)... no need to iterate the list
function remove (item) {
    item.previous.next = item.next;
    // if item is the TAIL -- No need to update the link
    if(item.next !== null) {
        item.next.previous = item.previous;
    }
    // changed assignement to undefined so as never to confuse the item as the Tail using !== or ===
    item.next = undefined;
    item.previous = undefined;
};

// findPrevious from SLL is no longer needed
/*function findPrevious(item) {
    var currNode = this.head;
    while(!(currNode.next == null) && (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
};*/

function display () {
    var result = [];
    var currNode = this.head;
    // changed the conditional from (!(currNode.next == null))
    while(currNode.next !== null) {
        result.push(currNode.next.element);
        currNode = currNode.next;
    }
    return result;
};

// add code to enable the lookup of incoming array data
function find (item) {
    var currNode = this.head;
    //loop as long as item not found and currNode is not the last node
    while (currNode.element !== item  && currNode.next) {
        currNode = currNode.next;
        }
    return currNode;
};

function checkPostion (currentNode) {
    var search = 'GO';
    var previousNode = currentNode.previous;
    var result = {status: 'OK'};

    while(search === 'GO' && previousNode.count){
        if(previousNode.count >= currentNode.count) {
            search = 'STOP';
        } else {
            // if status === true (not undefined), then we need to change the position of the node
            // make status of postion 'change'
            result.status = 'change';
            previousNode = previousNode.previous;
        }
    }
    result.payload = { 'insertAfterNode': previousNode,
                       'currentNode' : currentNode }
    return result;
};



// Modified the insert function to work with one or two arguments
function insert (newElement, insertAfterNode) {
    var currentNode = undefined;
    var result = {};

    // if there is no previousNode value, this means the data is input from the array and needs to be checked
    if(!insertAfterNode) {
        currentNode = this.find(newElement);
        // check to see it the newElement was found in the list
        if(currentNode.element === newElement) {
            currentNode.count++;
            // check to see if the postion of the node needs to change
            result = this.checkPostion(currentNode);
            // result is an object with and OK or change status and a payload holding the node to be inserted after
            return result;
        } else {
            var newNode = new Node(newElement);
            newNode.next = currentNode.next;
            newNode.previous = currentNode;
            newNode.count = 1;
            currentNode.next = newNode;
            // this is a new node and is put at the tail, it is in correct position so result.status is OK
            result.status = 'OK';
            // return the entire object, not just the status property
            return result;
        }
    // if there is a previousNode value then remove and insert the newElement value
    } else {
        newElement.previous = insertAfterNode;
        newElement.next = insertAfterNode.next;
        insertAfterNode.next.previous = newElement;
        insertAfterNode.next = newElement;
    }
};

module.exports = LList;

// var cities = new LList();
// cities.insert("Conway", "head");
// cities.insert("Russellville", "Conway");
// cities.insert("Carlisle", "Russellville");
// console.log('cities ',cities.head);
// console.log('1st nodes previous node ',cities.head.next.previous);
// cities.insert("Alma", "Carlisle");
// console.log(cities);
// cities.display();
// console.log();
// cities.remove("Carlisle");
// cities.display();
// console.log();
// cities.dispReverse();

