let circleX, circleY, circleSize, circleColor;
let message = "Nothing";
function setup () {
    createCanvas(500, 300);
    circleX = width/2;
    circleY = height/2;
    circleSize = 50;
    circleColor = color(255, 0, 0);
}

function draw(){
    background(190);
    fill(circleColor);
    circle(circleX, circleY, circleSize);
    fill(0);
    text (message, width * 0.45, height * 0.1);
}

function mouseClicked(){
    console.log('click');
    anim();
}

function anim(){
    setTimeout(function funcName(){
        circleSize = 150;

    }, 1000);
}

function callBack(){
    console.log('timeout:', millis())
}