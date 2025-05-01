class RectParticle extends Particle{
    constructor(x, y, r){
        super(x, y, r);
    }

    display() {
        noStroke();
        const alpha = map(this.age, 0,
            this.maxAge, 255, 0);
            fill(255, alpha);
            rect(this.pos.x, this.pos.y, this.r, this.r);
    }
}