// canvas for graph
let graph = document.getElementById("graph");

// slope
let m = 0;

// y-intercept
let b = 0;

// side length of square canvas
let length = 500;

// number of units on axes
let numUnits = 20;

// spacing
let spacing = length / numUnits;

function drawGraph() {
    let ctx = graph.getContext("2d");
    drawGridlines(ctx, spacing);
}

function drawGridlines(ctx, spacing) {
    ctx.strokeStyle = "rgb(0,0,0)";
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

drawGraph();
