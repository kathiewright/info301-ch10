/*  JavaScript 6th Edition
    Chapter 10
    Chapter case

    Oak Top House
    Author: 
    Date:   

    Filename: script.js
*/

"use strict";

 //declare global variables to set up the page 
  //Ref:  pg 686; Step 1
  var zIndexCounter; //maintains order of overlapping objects (depth perspective)
  var pos = [];
  var origin;  
  //coordinates for the original location of an object
// perform setup tasks when page first loads
function setUpPage() {
  //add event listeners when user starts a mousedrag event   Ref:  pg 686; Step 2
 var movableItems = document.querySelectorAll("#room div");
 zIndexCounter = movableItems.length + 1;  //how many movable items are on the screen?
 for (var i = 0; i < movableItems.length; i++) { //loop through all of the moveable items
  //and add a mousedown "drag" event for each one--calls the "startDrag"" function
    if (movableItems[i].addEventListener) {
       movableItems[i].addEventListener("mousedown", startDrag, false);
       movableItems[i].addEventListener("touchstart", startDrag, false); //adds the touch event  Ref: pg 691; Step 1
    } else if (movableItems[i].attachEvent) {
       movableItems[i].attachEvent("onmousedown", startDrag);
    }
 }
   document.querySelector("nav ul li:first-of-type").addEventListener("click", loadSetup, false);
   document.querySelector("nav ul li:last-of-type").addEventListener("click", loadDirections, false);
}

//add event listeners and move the selected object
//when the user starts dragging
//Ref:  pp 686-687; Step 3
function startDrag(evt) {
   // set z-index to move selected element on top of other elements
   this.style.zIndex = zIndexCounter;
   // increment z-index counter so next selected element is on top of other elements 
   zIndexCounter++; 
  //add the event listeners to call the "moveDrag" function
  //and to remove the drag when for a mouseup event
//add move events for touchscreens   Ref:  pg 691; Step 2
 if (evt.type !== "mousedown") {  //user did not press mouse so must be touch event
 // prevent touch event to be interpreted as part of an interface gesture
    evt.preventDefault(); //prevents conflicting gestures   Ref:  pg 696, Step 2
    this.addEventListener("touchmove", moveDrag, false);
    this.addEventListener("touchend", removeTouchListener, false);
 } else {  //user is using a mouse
//add the event listeners to call the "moveDrag" function
//and to remove the drag when for a mouseup event

    this.addEventListener("mousemove", moveDrag, false);
    this.addEventListener("mouseup", removeDragListener, false);
 }
  //what are the x and y coordinates?
   pos = [this.offsetLeft,this.offsetTop]; //distance to object from left & top of screen
   origin = getCoords(evt); //starting x and y coordinates
}

// calculate new location of dragged object
//Ref: pg 687; Step 4

function moveDrag(evt) {
   var currentPos = getCoords(evt); //new x & y coordinates
   var deltaX = currentPos[0] - origin[0]; //change on x-axis
   var deltaY = currentPos[1] - origin[1]; //change on y-axis
  //now add the changes to the original position for styling (.css) purposes
   this.style.left = (pos[0] + deltaX) + "px";
   this.style.top  = (pos[1] + deltaY) + "px";
}

//get the current mouse coordinates  Ref:  pg 688; Step 5
function getCoords(evt) {
   var coords = [];
    if (evt.targetTouches && evt.targetTouches.length) {
        var thisTouch = evt.targetTouches[0];
        coords[0] = thisTouch.clientX;
        coords[1] = thisTouch.clientY;
     } else {
        coords[0] = evt.clientX;
        coords[1] = evt.clientY;
     }
   return coords;
}

// remove mouse event listeners when dragging ends
//Ref:  pg 688; Step 6
function removeDragListener() {
   this.removeEventListener("mousemove", moveDrag, false);
   this.removeEventListener("mouseup", removeDragListener, false);   
}

//remove the touch event listeners when dragging ends  Ref:  pg 692; Step 4
function removeTouchListener() {
   this.removeEventListener("touchmove", moveDrag, false);
   this.removeEventListener("touchend", removeTouchListener, false);
}

// configure page to display Setup content
function loadSetup() {
   document.querySelector("nav ul li:first-of-type").className = "current";
   document.querySelector("nav ul li:last-of-type").className = "";
   document.getElementById("setup").style.display = "block";
   document.getElementById("location").style.display = "none";
   location.search = "";
}

// configure page to display Directions content
function loadDirections(string) {
   document.querySelector("nav ul li:first-of-type").className = "";
   document.querySelector("nav ul li:last-of-type").className = "current";
   document.getElementById("setup").style.display = "none";
   document.getElementById("location").style.display = "block";
}

// run setUpPage() function when page finishes loading
window.addEventListener("load", setUpPage, false);

