var squareClass = document.getElementsByClassName("cls-1");
var keyClass = document.getElementsByClassName("keyClass");

var uiSelector = document.getElementById("uiSelector");

var userInputColor = '';
var colorChosen = '#00a99d';

//Variable to remember the last square location that was selected
var previousSquare = document.getElementById("selected");

//Variable to know which square is currently selected
var currentSquare = document.getElementById("selected");

//Default Color Palette
var colorPalette =
       ['#00a99d',
        '#800000',
        '#fabebe',
        '#f032e6',
        '#f58231',
        '#4363d8',
        '#3cb44b',
        '#ffe119',
        '#e6194b'];


// Adds Listener functions to the Legend/ Key
for (i = 0; i < keyClass.length; i++) {
    keyClass[i].addEventListener("mousedown", colorChooser);
    keyClass[i].style.fill = colorPalette[i];
}

// Adds Listener functions to the Squares in the Grid
for (i = 0; i < squareClass.length; i++) {
    squareClass[i].addEventListener("mousedown", squareSelector);

}

function colorChooser(userInputColor) {
    switch (userInputColor) {
        case 1:
            colorChanger(colorPalette[0]);
            console.log("1 Chosen")
            break;
        case 2:
            colorChosen = colorPalette[1];
            break;
        case 3:
            colorChosen = colorPalette[2];
            break;
        case 4:
            colorChosen = colorPalette[3];
            break;
        case 5:
            colorChosen = colorPalette[4];
            break;
        case 6:
            colorChosen = colorPalette[5];
            break;
        case 7:
            colorChosen = colorPalette[6];
            break;
        case 8:
            colorChosen = colorPalette[7];
            break;
        case 9:
            colorChosen = colorPalette[8];
            break;
        default:
            break;
    }
}



function squareSelector(){
    previousSquare.removeAttribute('id', 'selected');
    currentSquare = this.setAttribute('id' , 'selected');
    previousSquare = this;
}

function colorChanger(colorChosen) {
    currentSquare.style.fill = colorChosen;
}