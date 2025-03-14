class Particle {
    constructor(x, y, r) {
        this.pos = createVector(x, y);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0)
        this.r = r;
        this.fricition = 0.98;
        this.maxAge = random(10, 100);
        this.age = 0


    }

    applyForce(force) {
        this.acc.add(force);
    }

    update() {
       // this.age++;
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0);
        this.vel.mult(this.fricition);
        //this.bounce();
    }

    display() {
        noStroke();
        const alpha = map(this.age, 0, this.maxAge, 255, 0);
        fill(255, alpha);
        circle(this.pos.x, this.pos.y, this.r * 2)

    }

    isDead(){
        return this.age > this.maxAge;

    }
}