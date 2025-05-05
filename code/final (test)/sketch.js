let mic;
let raindrops = [];
let ripples = [];
let flowers = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    mic = new p5.AudioIn();
    mic.start();
    frameRate(60);
    colorMode(HSB, 360, 255, 255, 255);
}

function draw(){
    background(' #000A13');

    let volume = mic.getLevel();
    let threshold = 0.01;

    if (volume > threshold) {
        let raindrop = new RainDrop(random(width), 0, random(10, 15));
        raindrops.push(raindrop);
    }

    for (let i = raindrops.length - 1; i >= 0; i--) {
        raindrops[i].update();
        raindrops[i].show();
        if (raindrops[i].hitsGround()) {
            ripples.push(new Ripple(raindrops[i].x, height - 100));
            raindrops.splice(i, 1);
        } else if (raindrops[i].offScreen()) {
            raindrops.splice(i, 1);
        }
    }

    for (let i = ripples.length - 1; i >= 0; i--) {
    ripples[i].update();
    ripples[i].show();
    if (ripples[i].isFinished()) {
        let stemHeight = random(100, 300);
        flowers.push(new Flower(ripples[i].x, height - 100, stemHeight));
        ripples.splice(i, 1);
        }
    }

    for (let i = 0; i < flowers.length; i++) {
        flowers[i].grow();
        flowers[i].display();
    }
}

class RainDrop{
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = random(8, 12);
    }

    update() {
        this.y += this.speed;
    }

    show() {
        textSize(this.size * 1.5);
        textAlign(CENTER, CENTER);
        fill(100, 150, 255);
        text('💧', this.x, this.y);
    }

    hitsGround() {
        return this.y >= height - 100;
    }

    offScreen(){
        return this.y > height;
    }
}

class Ripple {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 0;
        this.maxRadius = 20;
        this.alpha = 200;
    }

    update() {
        this.radius += 2;
        this.alpha -= 4;
    }

    show() {
        noFill();
        stroke(200, 200, 255, this.alpha);
        strokeWeight(2);
        ellipse(this.x, this.y, this.radius * 2, this.radius / 2);
    }

    isFinished() {
        return this.alpha <= 0;
    }
}

class Flower {
    constructor(x, y, stemHeight) {
        this.position = createVector(x, y);
        this.stemHeight = stemHeight;
        this.stemGrowth = 0;
        this.stemGrowthRate = random(2, 5);
        this.bloomed = false;
        this.petals = [];
        this.numPetals = int(random(20, 30));
        this.petalGrowth = 0;
        this.maxPetalGrowth = random(15, 25);
        this.petalColor = random(1) < 0.3 ?
        color(0, 0, 255, 200) : color(random(360), 200, 255, 200);
        this.centerColor = color(60, 200, 255, 255);
    }

    grow() {
        if (!this.bloomed) {
            this.stemGrowth += this.stemGrowthRate;
            if (this.stemGrowth >= this.stemHeight) {
                this.bloomed = true;
            }
        } else {
            if (this.petalGrowth < this.maxPetalGrowth) {
                this.petalGrowth += 1;
            }
        }
    }

    display() {
        push();
        translate(this.position.x, this.position.y);
        stroke(' #0F6135');
        strokeWeight(2);
        line(0, 0, 0, -this.stemGrowth);

        if (this.bloomed) {
            translate(0, -this.stemGrowth);
            noStroke();
            fill(this.petalColor);
            rotate(frameCount * 0.01);
            for (let i = 0; i < this.numPetals; i++) {
                let angle = map(i, 0, this.numPetals, 0, TWO_PI);
            push();
            rotate(angle);
            ellipse(0, this.petalGrowth / 2, this.petalGrowth / 4, this.petalGrowth * 1.5);
            pop();
        }
        fill(this.centerColor);
        ellipse(0, 0, this.maxPetalGrowth / 3);
    }
    pop();
    }
}
