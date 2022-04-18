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


// ----- Learn Text -------
const dialogue = {
    0: "Hey! <br><br> I'm so excited that you're here! <br><br> Today, I want to teach you all about a super important topic in algebra. <br><br> You guessed it! Slope-Intercept Form. <br><br> When you're ready, press \"Next\" to get started.",
    1: "First, let's look at how this graph works. <br><br> At the bottom, there are two sliders. One controls slope and the other controls the <br>y-intercept. <br><br> Don't worry if you don't know what those are yet! For now, give those sliders a try and see how the graph changes. <br><br> What patterns do you notice as you change the slope and y-intercept?",
    2: "Slope-intercept form is a way to write a <b>linear</b> equation. <br><br> Linear equations have two variables: x and y. <br><br> x and y have a linear <em>relationship</em> which means that as one variable changes, the other variable changes by some constant rate. <br><br> Specifically, as we change the value of x, the value of y changes!",
    3: "A slope-intercept equation is written as <br><b>y = mx + b</b>. <br><br>The variable \"m\" represents the slope, and the \"b\" represents the y-intercept. <br><br> Press \"Next\" to learn more about each part of the equation!",
    4: "Let's take a closer look at the y-intercept. <br><br> The y-intercept is where our function crosses the y-axis. <br><br> Remember! The y-axis is the vertical axis that goes up and down. <br><br> Do you notice how our orange point goes up when we increase our y-intercept value and down when we decrease it?",
    5: "Slope-intercept form makes finding the <br>y-intercept super easy! <br><br> At the y-axis, the value of x = 0. <br><br> When we plug in 0 for x, the \"mx\" term will always be 0 since we are multiplying by 0. <br><br> This means that the coordinate of the y-intercept will be (0, b). <br><br> Knowledge check! What would be the <br>y-intercept of the equation y = 3x - 2?",
    6: "If you said (0, -2), you're correct! <br><br> You're now one step closer to becoming a true slope-intercept master. <br><br> Press \"Next\" to learn about slope!",
    7: "Remember how we said that in a linear relationship, when one variable changes, the other changes at a constant rate? <br><br> Slope is what represents this <b>rate of change</b>.<br><br> Press \"Next\" to learn more about the slope and how to find it.",
    8: "Slope tells us about the steepness and direction of a line. <br><br> The greater the absolute value of the slope, the steeper it gets. This is because when the slope is steeper, y changes at a faster rate as x changes. <br><br> A negative slope means that y decreases as x increases. <br><br> Play around with the slope slider and see these changes in action.",
    9: "We can find slope by dividing the vertical change (rise) by the horizontal change (run) <b>Slope = rise over run.</b> <br><br> Here's an example for the line y = 2x",
    10: "Given two points, <b>rise</b> is the vertical distance and<b> run</b> is the horizontal distance.<br><br> Make sure you pay attention to whether the slope is negative or positive!",
    11: "<b>What if the line is vertical?</b> <br><br> A vertical line has a slope that is <em>undefined!</em> <br><br> This is because we cannot divide our rise by a run of zero.<br><br><br><br><br> Now that you know all about slope-intercept form, press \"Next\" for a challenge!",
    12: "<b>Challenge!</b>",
}

let index = 0;
const learnText = document.getElementById("learn-text");
slopeExample = document.getElementById("slope-example");
slopeExample.style.display = "none";
learnText.innerHTML = dialogue[0];
nextButton = document.getElementById("next-button");
backButton = document.getElementById("back-button");
finishButton = document.getElementById("finish-button");
finishButton.style.display = "none";
backButton.style.display = "none";

challengeMenu = document.getElementById("challenge")
challengeMenu.style.display = "none";

nextButton.onclick = function() {
    index += 1;
    learnText.innerHTML = dialogue[index];
    if (index == 12) {
        nextButton.style.display = "none";
        finishButton.style.display = "";
    }

    if (index == 1) {
        backButton.style.display = "";
    }

    if (index == 9) {
        slopeExample.style.display="";
    }

    if (index == 11) {
        slopeExample.style.display="none";
    }

    if (index == 12) {
        challengeMenu.style.display = "";
    }
}

backButton.onclick = function() {
    index -= 1;
    learnText.innerHTML = dialogue[index];
    if (index == 0) {
        backButton.style.display = "none";
    }

    if (index == 8) {
        slopeExample.style.display="none";
    }

    if (index == 10) {
        slopeExample.style.display="";
    }
    
    if (index == 11) {
        nextButton.style.display = "";
        finishButton.style.display = "none";
        challengeMenu.style.display="none";
        document.getElementById("challenge-1").placeholder = "";
        document.getElementById("challenge-2").placeholder = "";
        document.getElementById("challenge-3").placeholder = "";
    }
}

// Challenge
let challenge1Ans = document.getElementById("challenge-1").valueAsNumber;
let challenge2Ans = document.getElementById("challenge-2").valueAsNumber;
let challenge3Ans = document.getElementById("challenge-3").valueAsNumber;

let isCorrect1 = false;
let isCorrect2 = false;
let isCorrect3 = false;

function getAnswerValues(){
    challenge1Ans = document.getElementById("challenge-1").valueAsNumber;
    challenge2Ans = document.getElementById("challenge-2").valueAsNumber;
    challenge3Ans = document.getElementById("challenge-3").valueAsNumber;
} 

function checkAnswer() {
    getAnswerValues();
    isCorrect1 = challenge1Ans == 400 ? true : false;
    isCorrect2 = challenge2Ans == -2 ? true : false;
    isCorrect3 = challenge3Ans == -110 ? true : false;
}

let checkButton1 = document.getElementById("check-answer-1");
let checkButton2 = document.getElementById("check-answer-2");
let checkButton3 = document.getElementById("check-answer-3");


checkButton1.onclick = function(){
    checkAnswer();
    if (isCorrect1) {
        document.getElementById("challenge-1").placeholder = "Correct!";
    } else {
        document.getElementById("challenge-1").value = "";
        document.getElementById("challenge-1").placeholder = "Try again!";
    }
    document.getElementById("challenge-1").value = "";
}

checkButton2.onclick = function(){
    checkAnswer();
    if (isCorrect2) {
        document.getElementById("challenge-2").placeholder = "Correct!";
    } else {
        document.getElementById("challenge-2").value = "";
        document.getElementById("challenge-2").placeholder = "Try again!";
    }
    document.getElementById("challenge-2").value = "";
}

checkButton3.onclick = function(){
    checkAnswer();
    if (isCorrect3) {
        document.getElementById("challenge-3").placeholder = "Correct!";
    } else {
        document.getElementById("challenge-3").value = "";
        document.getElementById("challenge-3").placeholder = "Try again!";
    }
    document.getElementById("challenge-3").value = "";
}