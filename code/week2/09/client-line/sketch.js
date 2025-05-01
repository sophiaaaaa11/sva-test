let ws;
let userColor;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(190);

    ws = new WebSocket('ws://localhost:3000');

    
    const r = floor(random(255));
    const g = floor(random(255));
    const b = floor(random(255));
    userColor = `rgb(${r},${g},${b})`;  

    ws.onmessage = (event) => {
        console.log(event.data);
        onMessage(event.data);
    };
}

function onMessage(data) {
    const json = JSON.parse(data);
    stroke(json.color); 
    line(json.px, json.py, json.x, json.y);
}

function mousePressed() {
    sendData();
}

function mouseDragged() {
    sendData();
}

function sendData() {
    const data = {
        px: pmouseX,
        py: pmouseY,
        x: mouseX,
        y: mouseY,
        color: userColor
    };

    ws.send(JSON.stringify(data));
}
