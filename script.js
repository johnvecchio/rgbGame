var numSquares = 9;
var colors = [];
var pickedColor;

var h1 = document.querySelector('h1');
var squares = document.querySelectorAll('.square');
var msgDisplay = document.querySelector('#msg');
var resetButton = document.querySelector('#reset');
var modeButtons = document.querySelectorAll('.mode')
var colorDisplay = document.getElementById("colorDisplay");

init();

function init() {
	// mode button listeners
	setupModeButtons();
	// squares listeners
	setupSquares();
	reset();
}

function setupModeButtons() {
	for (var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			modeButtons[2].classList.remove('selected');
			this.classList.add('selected');
			// this.textContent === 'Easy' ? numSquares = 6: numSquares = 9;

			if (this.textContent === 'Easy') {
				numSquares = 3;
			} else if (this.textContent === 'Medium') {
				numSquares = 6;
			} else {
				numSquares = 9;
			}
			reset();
		});
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
	// adding listeners to the squares
		squares[i].addEventListener('click', function() {
			// grab color
			var clickedColor = this.style.backgroundColor;
			// compare colors
			if (clickedColor === pickedColor) {
				msgDisplay.textContent = "Correct!";
				resetButton.textContent = 'Play Again?';
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor
			} else {
				this.style.backgroundColor = "#232323";
				msgDisplay.textContent = "Try again";
			}
		});
	}
}


function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new color from array
	pickedColor = pickColor();
	// change colorDisplay to match picked color
	colorDisplay.textContent = pickedColor;
	// change colors of squares
	for (var i = 0; i < squares.length; i++) {
		if (colors[i]) {
			squares[i].style.display = 'block';
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = 'none';
		}	
	}
	h1.style.backgroundColor = 'steelblue';
	msgDisplay.textContent = "";
	resetButton.textContent = "New Colors";
}

resetButton.addEventListener('click', function(){
	reset();
});

function changeColors(color){
	// loop through squares
	for (var i = 0; i < squares.length; i++) {
	// change each color to match given color
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}

function generateRandomColors(num) {
	// make array
	var arr = [];
	// add num random colors to array
	for (var i = 0; i < num; i++) {
		// get random color and push to array
		arr.push(randomColor());
	}
	// return 
	return arr;
}

function randomColor(){
	// pick red
	var r = Math.floor(Math.random() * 256);
	// pick green
	var g = Math.floor(Math.random() * 256);
	// blue
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")"
}