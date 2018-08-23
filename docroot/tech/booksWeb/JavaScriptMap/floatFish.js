var isDown = false;

// Need to update for tablets: $('#status').html('x='+event.touches[0].pageX + '  y= ' + event.touches[0].pageY);
// http://stackoverflow.com/questions/5186441/javascript-drag-and-drop-for-touch-devices

function doSetup() {
    document.getElementById("theMsg0").innerHTML = "Run: doSetup";
    document.getElementById("theMsg1").innerHTML = "top:row:Y";
    document.getElementById("theMsg2").innerHTML = "left:column:X";
    document.onmousemove = mouseMove;
    document.onmousedown = mouseDown;
    document.onmouseup = mouseUp;
    // for touch screens, example: tablets
    document.addEventListener("touchstart", touchHandler, true);
    document.addEventListener("touchmove", touchHandler, true);
    document.addEventListener("touchend", touchHandler, true);
    document.addEventListener("touchcancel", touchHandler, true);
}
function touchHandler(event) {
    var touches = event.changedTouches,
            first = touches[0],
            type = "";
    switch (event.type)
    {
        case "touchstart":
            type = "mousedown";
            break;
        case "touchmove":
            type = "mousemove";
            break;
        case "touchend":
            type = "mouseup";
            break;
        default:
            return;
    }
    //initMouseEvent(type, canBubble, cancelable, view, clickCount, 
    //           screenX, screenY, clientX, clientY, ctrlKey, 
    //           altKey, shiftKey, metaKey, button, relatedTarget);
    var simulatedEvent = document.createEvent("MouseEvent");
    simulatedEvent.initMouseEvent(type, true, true, window, 1,
            first.screenX, first.screenY,
            first.clientX, first.clientY, false,
            false, false, false, 0/*left*/, null);
    first.target.dispatchEvent(simulatedEvent);
    event.preventDefault();
}

function mouseDown(e) {
    document.getElementById("theMsg0").innerHTML = "Event: mouseDown";
    isDown = true;
    var divFishObj = document.getElementById('divFish');
    divFishObj.style.background = "red";
    if (!e)
        var e = window.event;
    divFishObj.style.top = e.clientY + 'px';
    divFishObj.style.left = e.clientX + 'px';
}
function mouseUp(e) {
    document.getElementById("theMsg0").innerHTML = "Event: mouseUp";
    isDown = false;
    var divFishObj = document.getElementById('divFish');
    divFishObj.style.background = "blue";
}
function mouseMove(e) {
    document.getElementById("theMsg0").innerHTML = "Event: mouseMove";
    if (!e)
        var e = window.event;
    if (isDown) {
        document.getElementById("theMsg0").innerHTML = "Event: mouseMove + mouseDown = moveFish";
        var divFishObj = document.getElementById('divFish');
        divFishObj.style.top = e.clientY + 'px';
        divFishObj.style.left = e.clientX + 'px';
        divFishObj.style.background = "green";
    }
    document.getElementById("theMsg1").innerHTML = "top:row:Y=" + e.clientY;
    document.getElementById("theMsg2").innerHTML = "left:column:X=" + e.clientX;
}

// eof
