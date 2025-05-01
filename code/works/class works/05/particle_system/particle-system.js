class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    addParticles(x, y, num) {
        for (let i = 0; i < num; i++) {
            const p = new Particle(x, y, random(5, 10));
            const randomForce = p5.Vector.random2D();
            randomForce.setMag(random());
            p.applyForce(randomForce);
            this.particles.push(p);
        }

    }

    loop() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            if (p.isDead()) {
                this.particles.splice(i, 1);

            }
            // p.applyForce(this.gravity);
            for (let j = i - 1; j >= 0; j--) {
                const o = this.particles[j];
                const d = p.pos.dist(o.pos);
                if (d < p.r + o.r) {
                    const force = p5.Vector.sub(p.pos, o.pos);
                    force.normalize();
                    force.setMag(0.012);
                    p.applyForce(force);
                    o.applyForce(force.mult(-1));
                }
            }
            p.update();
            p.display();
        }

    }
}