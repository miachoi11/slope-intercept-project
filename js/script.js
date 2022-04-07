// canvas for graph
let graph = document.getElementById("graph");

// slope
let m = 0;

// y-intercept
let b = 0;

// side length of square canvas
let length = 500;

// number of units on axes
let numUnits = 10;

// spacing
let spacing = length / numUnits;

function drawGridlines() {
    let ctx = graph.getContext("2d")
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

function drawAxes() {
    let ctx = graph.getContext("2d")
    ctx.strokeStyle = "rgb(40,33,48)";
    ctx.lineWidth = 3;
    
    // x-axis
    ctx.beginPath();
    ctx.moveTo(0, length/2);
    ctx.lineTo(length, length/2);
    ctx.stroke();

    // x tick marks

    // y-axis
    ctx.beginPath();
    ctx.moveTo(length/2, 0);
    ctx.lineTo(length/2, length);
    ctx.stroke();

    // y tick marks

}

drawGridlines();
drawAxes();
