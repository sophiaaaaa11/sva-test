let blocks = [];
let gravity = 0.05;
let ground;
let currentBlock = null;

function setup() {
    createCanvas(400, 600);
    ground = new Block(width / 2, height - 10, width, 20, true);
}
 
function draw() {
    background(50);

    // update the falling block
    for (let block of blocks) {
        block.update();
        block.show();
    }

    ground.show();
}

// control
function keyPressed() {
    if (key === ' ' && currentBlock === null) { 
        newFallingBlock(); // press space for new
    } else if (keyCode === LEFT_ARROW && currentBlock) {
        currentBlock.move(-10);
    } else if (keyCode === RIGHT_ARROW && currentBlock) {
        currentBlock.move(10);
    }
}

// genarate new bloco
function newFallingBlock() {
    currentBlock = new Block(width / 2, 0, 40, 40, false);
    blocks.push(currentBlock);
}


class Block {
    constructor(x, y, w, h, isStatic) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.isStatic = isStatic;
        this.velocity = 0;
        this.color = color(random(255), random(255), random(255));
    }

    update() {
        if (!this.isStatic) {
            this.velocity += gravity; 
            this.y += this.velocity;

            // touch other blocks
            for (let other of blocks) {
                if (other !== this && other.isStatic && this.collidesWith(other)) {
                    this.isStatic = true;
                    this.y = other.y - this.h;
                    currentBlock = null; // genarate new after last one stop
                    return;
                }
            }

            // touch the ground
            if (this.y + this.h / 2 >= ground.y - ground.h / 2) {
                this.y = ground.y - ground.h / 2 - this.h / 2;
                this.isStatic = true;
                currentBlock = null;
            }
        }
    }

    show() {
        fill(this.color);
        rectMode(CENTER);
        rect(this.x, this.y, this.w, this.h);
    }

    move(dir) {
        if (!this.isStatic) { 
            this.x += dir;
        }
    }

    collidesWith(other) {
        return (
            this.x + this.w / 2 > other.x - other.w / 2 &&
            this.x - this.w / 2 < other.x + other.w / 2 &&
            this.y + this.h / 2 > other.y - other.h / 2 &&
            this.y - this.h / 2 < other.y + other.h / 2
        );
    }
}
