/* File: gridFunction.js
*/
var size;   // Size of array grid in each dimension
var data;   // 2 dimensional array to hold the grid data

function createArray(theSize) {
    size = theSize;
    data = new Array(size);
    for(var i=0; i<size; i++) {
        data[i] = new Array(size);
    }
}

function initialGrid() {
    document.getElementById('msgCall').innerHTML = 'HTML + JavaScript: Initialize Grid';
    document.getElementById('theTable').bgColor = 'yellow';
    for(var i=1; i<=size; i++) {
        for(var j=1; j<=size; j++) {
            var theElement = 'element.' + i + '.' + j;
            document.getElementById(theElement).innerHTML = '(' + i + ',' + j + ')';
            data[i-1][j-1] = i + '.' + j;   // initialize array values
        }
    }
}

function updateGrid() {
    document.getElementById('msgCall').innerHTML = 'HTML + JavaScript: Update HTML Grid';
    document.getElementById('theTable').bgColor = 'red';
    
    for(var i=1; i<=size; i++) {
        for(var j=1; j<=size; j++) {
            // Use the array data to update the table.
            document.getElementById('element.' + i + '.' + j).innerHTML = 'update ' + '(' + data[i-1][j-1] + ')';
        }
    }
}

// eof