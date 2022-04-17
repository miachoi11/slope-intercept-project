// canvas for graph
let graph = document.getElementById("graph");

// slope (equation)
let slope = document.getElementById("slope");
let slopeSlider = document.getElementById("slope-slider");
slope.innerHTML = slopeSlider.value;

// slope label
let slopeLabel = document.getElementById("slope-label");
slopeLabel.innerHTML = slopeSlider.value;

let slopeVal = slopeSlider.value;

// y-intercept (equation)
let yintercept = document.getElementById("y-intercept");
let yinterceptSlider = document.getElementById("y-intercept-slider");
yintercept.innerHTML = yinterceptSlider.value;

// y-intercept label
let yInterceptLabel = document.getElementById("y-intercept-label");
yInterceptLabel.innerHTML = yinterceptSlider.value;

let yVal = yinterceptSlider.value;

// side length of square canvas
let length = 500;

// number of units on axes
let numUnits = 10;

// spacing
let spacing = length / numUnits;

let images = [];

let index = 0;

function preload() {
    for (let i = 0; i < arguments.length; i++) {
        images[i] = new Image();
        images[i].src = preload.arguments[i];
    }
}

preload("../img/background-dog-hill", "../img/background-dog-cliff", "../img/background-rocket-blob", "../img/white.png");


function drawBackground() {
    let ctx = graph.getContext("2d");
    ctx.drawImage(images[index], 0, 0, length, length);
}

// draws the gridlines and the axes
function drawGraph() {
    let ctx = graph.getContext("2d");
    drawGridlines(ctx);
    drawAxes(ctx);
}

// draws the gridlines
function drawGridlines(ctx) {
    ctx.strokeStyle = "rgba(226, 226, 228, 0.1)";
    ctx.lineWidth = 1;
    ctx.beginPath();

    for (let x = 0; x <= length; x += spacing) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, length);
        ctx.stroke();
    }

    for (let y = 0; y <= length; y += spacing) {
        ctx.moveTo(0, y);
        ctx.lineTo(length, y);
        ctx.stroke();
    }
}

// draws the axes
function drawAxes(ctx) {
    ctx.strokeStyle = "rgb(40,33,48)";
    ctx.lineWidth = 2;
    ctx.beginPath();

    // x-axis
    ctx.moveTo(0, length/2);
    ctx.lineTo(length, length/2);
    ctx.stroke();

    // y-axis
    ctx.moveTo(length/2, 0);
    ctx.lineTo(length/2, length);

    // tick marks and labels for axes
    for (let i = 0; i <= length; i += spacing) {
        // x-axis 
        ctx.moveTo(i, length/2 + 3);
        ctx.lineTo(i, length/2 - 3);
        ctx.fillStyle = "rgb(40,33,48)";
        ctx.fillText((i/spacing)-5, i+2,length/2 + 11);
        if (i == 500) {
            ctx.fillText((i/spacing)-5, i-10,length/2 + 11);
        }

        // y-axis 
        ctx.moveTo(length/2 - 3, i);
        ctx.lineTo(length/2 + 3,i);
        if (i != length/2) {
            ctx.fillText(-(i/spacing)+5, length/2 + 2, i-2);
        } 
        if (i == 0) {
            ctx.fillText(-(i/spacing)+5, length/2 + 2, i+10);
        }
    }
    ctx.stroke();
}

// draws the line
function drawLine() {
    let ctx = graph.getContext("2d");
    let edgeCoordinates = getEdgeCoordinates();
    ctx.beginPath();
    ctx.strokeStyle = "rgb(0,53,84)";
    ctx.lineWidth = 3;
    ctx.moveTo(edgeCoordinates.x1, edgeCoordinates.y1);
    ctx.lineTo(edgeCoordinates.x2, edgeCoordinates.y2);
    ctx.stroke();
}

// draw the intercept points
function drawInterceptPoints() {
    let ctx = graph.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgb(168, 147, 236)";
    ctx.arc(length/2 + (-yVal * spacing)/slopeVal,length/2,  5, 0, 2*Math.PI, false);
    ctx.fill();

    ctx.beginPath();
    ctx.fillStyle = "rgb(228, 107, 70)";
    ctx.arc(length/2, length/2 - (yVal* spacing), 5, 0, 2*Math.PI, false);
    ctx.fill();
}

let mouseX = 0;
let mouseY = 0;
graph.addEventListener("mousemove", function(event) { 
    let cRect = graph.getBoundingClientRect();        
    mouseX = Math.round(event.clientX - cRect.left);  
    mouseY = Math.round(event.clientY - cRect.top);   
});

function showCoordinates() {
    
}

// calculates the edge points of the line
function getEdgeCoordinates() {
    let y1 = (-1 * slopeVal * (length/2)) - (yVal * spacing);
    let y2 = (slopeVal * (length/2)) - (yVal * spacing);
    return {
        x1: 0,
        x2: length,
        y1: y2 + length / 2,
        y2: y1 + length / 2
    };
}

function clearCanvas() {
    let ctx = graph.getContext("2d");
    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.fillRect(0, 0, length, length);
}

function updateGraph() {
    clearCanvas();
    images[index].onload = function() {
        drawBackground();
        drawGraph();
        drawLine();
        drawInterceptPoints();
    }
    drawBackground();
    drawGraph();
    drawLine();
    drawInterceptPoints();
}

// initalizes the graph
updateGraph();

// updates the graph as the sliders are changed
slopeSlider.oninput = function() {
    slope.innerHTML = this.value;
    slopeLabel.innerHTML = this.value
    slopeVal = this.value;
    updateGraph();
}

yinterceptSlider.oninput = function() {
    yintercept.innerHTML = this.value;
    yInterceptLabel.innerHTML = this.value;
    yVal = this.value;
    updateGraph();
}

// reset button
let resetButton = document.getElementById("reset-button");

resetButton.onclick = function() {
    slopeSlider.value = 0;
    slopeLabel.innerHTML = 0;
    slope.innerHTML = 0;
    slopeVal = 0;
    yinterceptSlider.value = 0;
    yintercept.innerHTML = 0;
    yInterceptLabel.innerHTML = 0;
    yVal = 0;
    updateGraph();
}


// ----- Play -------
const dialogue = {
    0: "Welcome back! Perfect timing because a lot of my friends really need your help (and your math skills)! <br><br> This is my friend, Waffle, and he's having trouble going up this hill. <br><br> Can you help Waffle find the slope of this hill? <br><br> <small>If you have a fraction, please input it as a decimal.</small>",
    1: "Oh no! <br><br> Waffle wants to go meet his friend, Pancake, but they are separated by a cliff! <br><br> Help Waffle by building a bridge across the cliff. <br><br> What is the slope of the line? <br><br> <small>If you have a fraction, please input it as a decimal.</small>",
    2: "<small> My alien buddy is coming to visit Earth for a vacation. <br><br> His rocket is at (-2, -2) and Earth is at (2, 4). <br><br> The rocket needs to make a pit stop to refuel when it reaches the midway point (the y-axis). <br><br> Can you find the y-coordinate of his pit stop? <br><br> <small>Hint: if you can't see the numbers, use the equation!</small>",
    3: "Awesome Job! <br><br> Thank you for your help! <br><br>",
}
let isCorrect = false;
answerInput = document.getElementById("answer");
const playText = document.getElementById("play-text");
playText.innerHTML = dialogue[0];
checkButton = document.getElementById("check-answer");
nextButton = document.getElementById("next-button");
backButton = document.getElementById("back-button");
finishButton = document.getElementById("finish-button");
finishButton.style.display = "none";
backButton.style.display = "none";

// checks the input answer
function checkAnswer() {
    let inputValue = answerInput.valueAsNumber;
    isCorrect = ((index == 0 && inputValue == 0.5) || 
                 (index == 1 && inputValue == -1) ||
                 (index == 2 && inputValue == 1)) ? true : false;
}

checkButton.onclick = function(){
    checkAnswer();
    if (isCorrect) {
        playText.innerHTML = "Correct!";
        answerInput.style.display = "none";
        checkButton.style.display ="none";
        answerInput.value = "";
        answerInput.placeholder = "";
    } else {
        answerInput.value = "";
        answerInput.placeholder = "Try again!";
    }
    answerInput.value = "";
}

nextButton.onclick = function() {
    index += 1;
    playText.innerHTML = dialogue[index];
    answerInput.placeholder = "";
    answerInput.style.display = "";
    checkButton.style.display ="";
    updateGraph();
    if (index == 1) {
        backButton.style.display = "";
    }

    if (index == 3) {
        nextButton.style.display = "none";
        finishButton.style.display = "";
        answerInput.style.display = "none";
        checkButton.style.display = "none";
    }
}

backButton.onclick = function() {
    index -= 1;
    answerInput.style.display = "";
    answerInput.placeholder = "";
    checkButton.style.display ="";
    playText.innerHTML = dialogue[index];
    updateGraph();
    if (index == 0) {
        backButton.style.display = "none";
    }
    
    if (index == 2) {
        nextButton.style.display = "";
        finishButton.style.display = "none";
        answerInput.style.display = "";
    }
}
