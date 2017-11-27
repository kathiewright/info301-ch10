#A1_____________________________________________________________________

      //declare global variables to set up the page 
      //Ref:  pg 686; Step 1
      var zIndexCounter; //maintains order of overlapping objects (depth perspective)
      var pos = [];
      var origin;  
      //coordinates for the original location of an object
      
#A2____________________________________________________________________

    //add event listeners when user starts a mousedrag event   Ref:  pg 686; Step 2
   var movableItems = document.querySelectorAll("#room div");
   zIndexCounter = movableItems.length + 1;  //how many movable items are on the screen?
   for (var i = 0; i < movableItems.length; i++) { //loop through all of the moveable items
		//and add a mousedown "drag" event for each one--calls the "startDrag"" function
      if (movableItems[i].addEventListener) {
         movableItems[i].addEventListener("mousedown", startDrag, false);
      } else if (movableItems[i].attachEvent) {
         movableItems[i].attachEvent("onmousedown", startDrag);
      }
   }

#A3_____________________________________________________________________

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

      this.addEventListener("mousemove", moveDrag, false);
      this.addEventListener("mouseup", removeDragListener, false);

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
      coords[0] = evt.clientX;
      coords[1] = evt.clientY;
   return coords;
}

// remove mouse event listeners when dragging ends
//Ref:  pg 688; Step 6
function removeDragListener() {
   this.removeEventListener("mousemove", moveDrag, false);
   this.removeEventListener("mouseup", removeDragListener, false);   
}

#B1____________________________________________________________________  

      movableItems[i].addEventListener("touchstart", startDrag, false); //adds the touch event  Ref: pg 691; Step 1

#B2____________________________________________________________________

	//add move events for touchscreens   Ref:  pg 691; Step 2
   if (evt.type !== "mousedown") {  //user did not press mouse so must be touch event

      this.addEventListener("touchmove", moveDrag, false);
      this.addEventListener("touchend", removeTouchListener, false);
   } else {  //user is using a mouse
	//add the event listeners to call the "moveDrag" function
	//and to remove the drag when for a mouseup event

      this.addEventListener("mousemove", moveDrag, false);
      this.addEventListener("mouseup", removeDragListener, false);
   }
#B3_____________________________________________________________________

//remove the touch event listeners when dragging ends  Ref:  pg 692; Step 4
function removeTouchListener() {
   this.removeEventListener("touchmove", moveDrag, false);
   this.removeEventListener("touchend", removeTouchListener, false);
}

#B4_____________________________________________________________________

   if (evt.targetTouches && evt.targetTouches.length) {
      var thisTouch = evt.targetTouches[0];
      coords[0] = thisTouch.clientX;
      coords[1] = thisTouch.clientY;
   } else {
      coords[0] = evt.clientX;
      coords[1] = evt.clientY;
   }

#B5_____________________________________________________________________

   // prevent touch event to be interpreted as part of an interface gesture
      evt.preventDefault(); //prevents conflicting gestures   Ref:  pg 696, Step 2

#C1_____________________________________________________________________

function geoTest() {
   //check to see if the navigator object for the window is able to return the current geolocation
   if (navigator.geolocation) {  //Ref pg 704, Step 2
      navigator.geolocation.getCurrentPosition(createDirections, fail, {timeout: 10000});
   } else {
      fail();
   }
}

#C2______________________________________________________________________

   geoTest();   // Automatically call the geolocation method of the navigator object Ref pg 704 Step 3
   
#C3_______________________________________________________________________

function createDirections(position) { //finds the current geolocation coordinates Ref: pg 704; Step 4
   console.log("Longitude: " + position.coords.longitude);
   console.log("Latitude: " + position.coords.latitude);
}

function fail() {  //puts out a message if the navigator.geolocation method fails
   console.log("Geolocation information not available or not authorized.");
 }

#D1_________________________________________________________________________

var waitForUser;

#D2_________________________________________________________________________

  waitForUser = setTimeout(fail, 10000) // if the user does not respond in 10 secs, stop the app Ref pg 709; Step 6

#D3_________________________________________________________________________

   clearTimeout(waitForUser); //clears the timer for a user response   Ref pg 709; Step 6
   
#E1_________________________________________________________________________

var currPosLat = position.coords.latitude;  //use the coordinates of the user to center the map
   var currPosLng = position.coords.longitude;
   var mapOptions = {    //this specifies the coordinates and zoom level for the Google Map() constructor
      center: new google.maps.LatLng(currPosLat, currPosLng),
      zoom: 12
   };
   var map = new google.maps.Map(document.getElementById("map"), mapOptions);

#E2_________________________________________________________________________

   document.getElementById("map").innerHTML = "Unable to access your current location.";
   
#E3_________________________________________________________________________

   <script src="https://maps.googleapis.com/maps/api/js?v3.exp&sensor=true"></script>