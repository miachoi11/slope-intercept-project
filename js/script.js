// canvas for graph
let graph = document.getElementById("graph");

// slope
let slope = document.getElementById("slope");
let slopeSlider = document.getElementById("slope-slider");
slope.innerHTML = slopeSlider.value;

// y-intercept
let yintercept = document.getElementById("y-intercept");
let yinterceptSlider = document.getElementById("y-intercept-slider");
yintercept.innerHTML = yinterceptSlider.value;

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
    ctx.strokeStyle = "rgb(230,215,245)";
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

    // tick marks
    for(let i = 0; i <= length; i += spacing) {
        // x-axis ticks
        ctx.moveTo(i, length/2 + 3);
        ctx.lineTo(i, length/2 - 3);

        // y-axis ticks
        ctx.moveTo(length/2 - 3, i);
        ctx.lineTo(length/2 + 3,i);
    }
    ctx.stroke();
}


// updates slope and y-intercept values
slopeSlider.oninput = function() {
    slope.innerHTML = this.value;
}

yinterceptSlider.oninput = function() {
    yintercept.innerHTML = this.value;
}



drawGraph();
