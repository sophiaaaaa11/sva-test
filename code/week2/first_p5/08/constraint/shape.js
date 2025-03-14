class Shape {
    constructor(world, pos, size, options) {
      this.world = world;
      this.pos = pos.copy();
      this.size = size;
      this.options = options;
      this.body = this.createBody();
      Matter.Composite.add(this.world, this.body);
    }
  
    createBody() {
      // abstract
    }
  
    display() {
      push();
      translate(this.body.position.x, this.body.position.y);
      rotate(this.body.angle);
      this.drawShape();
      pop();
    }
  
    drawShape() {
      // abstract
    }
  
    isDead() {
      if (this.body.position.y > height) {
        Matter.Composite.remove(this.world, this.body);
        return true;
      } 
      return false;
    }
  
    animAngle(targetAngle) {
      let angle = lerp(this.body.angle, targetAngle, 0.3);
      Matter.Body.setAngle(this.body, angle);
    }
  }