//Code copied from
//Data Structures and Algorithms with JavaScript, First Edition; Michael McMillan

function Node (element) {
    this.element = element;
    this.next = null;
    this.previous = null;
};

// This is what the structure will look like:
// cities  LList {
// head: Node {
//    element: 'head',
//    next: Node {
//      element: 'Conway',
//      next: [Object],         -- points to next node object
//      previous: [Circular]    -- points to prior node object which is the node object being inspected
//    },
//    previous: null
//},

function LList () {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
};

function dispReverse () {
    var currNode = this.head;
    currNode = this.findLast();
    while((currNode.previous !== null)) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }
};

function findLast () {
    var currNode = this.head;
    while(!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
};

// This FAILS to REMOVE the item if it is the TAIL!!!!
function remove (item) {
    var currNode = this.find(item);
    if(!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        currNode.next = null;
        currNode.previous = null;
    }
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
    var currNode = this.head;
    while(!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
};

function find (item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
        }
    return currNode;
};

function insert (newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);

    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
};

var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
console.log();
cities.dispReverse();