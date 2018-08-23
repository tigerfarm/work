// Title Grid program
// Apr.28.2007

var gridWidth = 4
var gridHeight = 4

var imgArrayColumn = 10    // Starting position
var imgArrayRow = 5    // Starting position
// var tileImgPrefix = 'EarthDay/d'
// var imgArrayWidth = 10  // Number of images across the world, there are 10x10
// var imgArrayHeight = 10  // Number of images across the world, there are 10x10
// var tileImgWidth = 240
// var tileImgHeight = 120
var imgArrayWidth = 15  // Number of images across the world, there are 10x10
var imgArrayHeight = 16  // Number of images across the world, there are 10x10
var tileImgWidth = 247-1
var tileImgHeight = 116-1
var tileImgPrefix = 'images/WorldMap_'

var tileImgPostfix = '.jpg'

function initializePage() {
    document.getElementById("theMsg0").innerHTML = "initializePage"
    document.getElementById("theMsg1").innerHTML = "top:row:Y"
    document.getElementById("theMsg2").innerHTML = "left:column:X"
    document.getElementById("theMsg3").innerHTML = "Do not drag: mouse up"
    document.getElementById("theMsg4").innerHTML = "_"
    document.getElementById("theMsg5").innerHTML = " imgArrayRow="+imgArrayRow+" imgArrayColumn="+imgArrayColumn
    onmousemove = mouseMove;
    onmousedown = mouseDown;
    onmouseup = mouseUp;
    
    document.getElementById('mapDiv').style.width = tileImgWidth*3;
    document.getElementById('mapDiv').style.height = tileImgHeight*3;
    
    for( y=0; y<gridHeight; y++) {
        for( x=0; x<gridWidth; x++) {
            imgName = 'tileImg'+ y + x
            imgRow = imgArrayRow + y
            imgColumn = ((imgArrayColumn + x)%imgArrayWidth)+1
            imgNum = imgRow*imgArrayWidth + imgColumn
            imgFileName = tileImgPrefix+imgNum+tileImgPostfix
            document.getElementById(imgName).src=imgFileName;
            document.getElementById(imgName).style.left=(tileImgWidth*(x))+'px'; //err, x==0
            document.getElementById(imgName).style.top=(tileImgHeight*(y))+'px'; //err, y==2
        }
    }
}

function doMapRefresh2(){
    dragobject.doMapRefresh();
}
var dragobject={
    x: 0, y: 0, offsetX: null, offsetY: null, theTarget: null, doDrag: 0, toggleMap: 1,
    
    initialize:function(){
        document.onmousedown=this.setToMove
        document.onmouseup=function(){
            document.getElementById("theMsg3").innerHTML = "Do not drag: mouse up"
            document.getElementById("theMsg4").innerHTML = "_"
            this.doDrag=0
        }
    },
    toggleTileImgPrefix:function(){
        if (this.toggleMap==0) {
            tileImgPrefix = 'images/WorldMap_';
            this.toggleMap=1;
        }
        else {
            tileImgPrefix = 'imagesP/WorldMap_';
            this.toggleMap=0;
        }
        this.doMapRefresh();
    },
    doMapRefresh:function(){
        for( y=0; y<gridHeight; y++) {
            for( x=0; x<gridWidth; x++) {
                imgName = 'tileImg'+ y + x
                document.getElementById(imgName).style.left=(tileImgWidth*(x))+'px';
                imgRow = imgArrayRow + y
                imgColumn = ((imgArrayColumn + x)%imgArrayWidth)+1
                imgNum = imgRow*imgArrayWidth + imgColumn
                document.getElementById(imgName).src=tileImgPrefix+imgNum+tileImgPostfix;
            }
        }
    },
    setToMove:function(e){
        document.getElementById("theMsg3").innerHTML = "Do not drag: mouse down, NOT on object"
        if (!e) var e = window.event;
        if (e.target) this.theTarget = e.target;
        else if (e.srcElement) this.theTarget = e.srcElement; // for IE 6
        if (this.theTarget.className=="drag"){
            this.doDrag=1
            var tileObj = document.getElementById('tileImg11');
            this.offsetX=parseInt(tileObj.style.left)
            this.x=e.clientX
            this.offsetY=parseInt(tileObj.style.top)
            this.y=e.clientY
            if (e.preventDefault) e.preventDefault()
            document.onmousemove=dragobject.doDragImage
            document.getElementById("theMsg3").innerHTML = "Drag: mouse down, ON object"
        }
        document.getElementById("theMsg5").innerHTML = " imgArrayRow="+imgArrayRow+" imgArrayColumn="+imgArrayColumn
    },
    doDragImage:function(e){
        if (!e) var e = window.event;
        if (this.doDrag==1){
            document.getElementById("theMsg01").innerHTML = "mouseDown + overObject: Drag object"
            
            var x = 0
            var y = 0
            
            var valueX=this.offsetX+e.clientX-this.x
            if ( valueX < 0 ) {
                document.getElementById("theMsg3").innerHTML = "Drag: move images left"
                valueX = valueX+tileImgWidth
                imgArrayColumn ++
                if (imgArrayColumn == imgArrayWidth) imgArrayColumn = 0
                doMapRefresh2();
                this.offsetX=valueX
                this.x=e.clientX
            }
            else if (valueX >= tileImgWidth ) {
                document.getElementById("theMsg3").innerHTML = "Drag: move images right"
                valueX = valueX-tileImgWidth
                imgArrayColumn --
                if (imgArrayColumn == -1) imgArrayColumn = imgArrayWidth-1
                for( y=0; y<gridHeight; y++) {
                    for( x=0; x<gridWidth; x++) {
                        imgName = 'tileImg'+ y + x
                        document.getElementById(imgName).style.left=valueX+(tileImgWidth*(x-1))+'px';
                        imgRow = imgArrayRow + y
                        imgColumn = ((imgArrayColumn + x)%imgArrayWidth)+1
                        imgNum = imgRow*imgArrayWidth + imgColumn
                        document.getElementById(imgName).src=tileImgPrefix+imgNum+tileImgPostfix;
                    }
                }
                this.offsetX=valueX
                this.x=e.clientX
            }
            else {
                document.getElementById("theMsg3").innerHTML = "drag left/right"
                for( y=0; y<gridHeight; y++) {
                    for( x=0; x<gridWidth; x++) {
                        imgName = 'tileImg'+ y + x
                        document.getElementById(imgName).style.left=valueX+(tileImgWidth*(x-1))+'px';
                    }
                }
            }
                    
            var valueY=this.offsetY+e.clientY-this.y
            if (valueY>tileImgHeight && imgArrayRow<=0 ) {
                document.getElementById("theMsg4").innerHTML = "At the top"
            }
            else if (valueY <= 0 && (imgArrayHeight<=(imgArrayRow+gridHeight)) ) {
                document.getElementById("theMsg4").innerHTML = "At the bottom"
            }
            else if (valueY <= 0 ) {
                document.getElementById("theMsg4").innerHTML = "drag up move"
                valueY = valueY+tileImgHeight
                imgArrayRow ++
                for( y=0; y<gridHeight; y++) {
                    for( x=0; x<gridWidth; x++) {
                        imgName = 'tileImg'+ y + x
                        imgRow = imgArrayRow + y
                        imgColumn = ((imgArrayColumn + x)%imgArrayWidth)+1
                        imgNum = imgRow*imgArrayWidth + imgColumn
                        document.getElementById(imgName).src=tileImgPrefix+imgNum+tileImgPostfix;
                        document.getElementById(imgName).style.top=(tileImgHeight*(y))+'px';
                    }
                }
                this.offsetY=valueY
                this.y=e.clientY
            }
            else if (valueY > tileImgHeight ) {
                document.getElementById("theMsg4").innerHTML = "drag down move"
                valueY = valueY-tileImgHeight
                imgArrayRow --
                for( y=0; y<gridHeight; y++) {
                    for( x=0; x<gridWidth; x++) {
                        imgName = 'tileImg'+ y + x
                        imgRow = imgArrayRow + y
                        imgColumn = ((imgArrayColumn + x)%imgArrayWidth)+1
                        imgNum = imgRow*imgArrayWidth + imgColumn
                        // if (imgNum<10) imgNum = '0'+imgNum
                        document.getElementById(imgName).src=tileImgPrefix+imgNum+tileImgPostfix;
                        document.getElementById(imgName).style.top=valueY+(tileImgHeight*(y-1))+'px';
                    }
                }
                this.offsetY=valueY
                this.y=e.clientY
            }
            else {
                document.getElementById("theMsg4").innerHTML = "drag up/down"
                for( y=0; y<gridHeight; y++) {
                    for( x=0; x<gridWidth; x++) {
                        imgName = 'tileImg'+ y + x
                        document.getElementById(imgName).style.top=valueY+(tileImgHeight*(y-1))+'px';
                    }
                }
            }
                    
            document.getElementById("theMsg5").innerHTML = " imgArrayRow="+imgArrayRow+" imgArrayColumn="+imgArrayColumn + " vX=" + valueX + " vY=" + valueY
            return false
        }
        else document.getElementById("theMsg01").innerHTML = "mouseDown + overNotOverObject: Do not drag"
    }
}
dragobject.initialize()
            
function mouseDown(e) {
    document.getElementById("theMsg0").innerHTML = "Event: mouseDown"
}
function mouseUp(e) {
    document.getElementById("theMsg0").innerHTML = "Event: mouseUp"
    document.getElementById("theMsg01").innerHTML = "mouseUp: Do not drag"
}
function mouseMove(e) { 
    document.getElementById("theMsg0").innerHTML = "Event: mouseMove"
    document.getElementById("theMsg1").innerHTML = "Cursor top:row:Y="+e.clientY
    document.getElementById("theMsg2").innerHTML = "Cursor left:column:X="+e.clientX
}
            
// eof