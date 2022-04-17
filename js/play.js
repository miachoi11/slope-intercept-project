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

// draws the gridlines and the axes
function drawGraph() {
    let ctx = graph.getContext("2d");
    drawGridlines(ctx);
    drawAxes(ctx);
}

// draws the gridlines
function drawGridlines(ctx) {
    ctx.strokeStyle = "rgb(226, 226, 228)";
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

// draw the y-intercept point
function drawYIntPoint() {
    let ctx = graph.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgb(228, 107, 70)";
    ctx.arc(length/2, length/2 - (yVal* spacing), 5, 0, 2*Math.PI, false);
    ctx.fill();
}

// draw the x-intercept point
function drawXIntPoint() {
    let ctx = graph.getContext("2d");
    ctx.beginPath();
    ctx.fillStyle = "rgb(228, 107, 70)";
    ctx.arc(length/2 + (-yVal * spacing)/slopeVal,length/2,  5, 0, 2*Math.PI, false);
    ctx.fill();
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
    drawGraph();
    drawLine();
    drawYIntPoint();
    drawXIntPoint();
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


// ----- Learn Text -------
const dialogue = {
    0: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    1: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    2: "hi",
    3: "pancake",
    4: "waffle",
    5: "qt",

}

let index = 0;
const learnText = document.getElementById("learn-text");
learnText.innerHTML = dialogue[0];
nextButton = document.getElementById("next-button");
backButton = document.getElementById("back-button");
finishButton = document.getElementById("finish-button");
finishButton.style.display = "none";
backButton.style.display = "none";
nextButton.onclick = function() {

    index += 1;
    learnText.innerHTML = dialogue[index];
    if (index == 5) {
        nextButton.style.display = "none";
        finishButton.style.display = "";
    }

    if (index == 1) {
        backButton.style.display = "";
    }
}

backButton.onclick = function() {
    index -= 1;
    learnText.innerHTML = dialogue[index];
    if (index == 0) {
        backButton.style.display = "none";
    }
    
    if (index == 4) {
        nextButton.style.display = "";
        finishButton.style.display = "none";
    }
}





