# ModifyingTheLinkedList
Compares the standard nested node structure versus a flat structure using the object key as the node identifier.

This project attempts to simulate people clicking on an object (an article, song, product, person) and immediately ranking the most often clicked objects. Tracking the ranks in a Linked List.

When an object is clicked:
1)  Search for the object id in the List. 
2)  If not found, then add it just before the tail. 
3)  If found, then update its click count: 
4)  Check to see if its position is now higher on the List. 
5)  If rank changes, then update its position to reflect its popularity.

There are of 7 files:

1) app.js – the main page which times how long each structure takes to process the array
2) arrayMaker.js – creates an array with an element that equates to the clicked object id
3) DLLStandardOriginal.js – basically a copy of a typical Linked List constructor in js
4) DLLStandardAdjusted.js – adjustments to make the program accept the array input
5) DLLModified.js – my DLL constructor code using object keys to store the object id
6) trackerStandard.js – creates a typical DLL instance and processes the array
7) trackerModified.js – creates a modified DLL instance and processes the array

You can read more about this at: 
https://timkeefedev.github.io/Linked-Lists/
