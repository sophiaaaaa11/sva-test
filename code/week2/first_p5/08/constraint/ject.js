class Rect extends Shape {
    constructor(world, pos, size, options) {
      super(world, pos, size, options);
    }
  
    createBody() {
      return Matter.Bodies.rectangle(
        this.pos.x, this.pos.y, this.size.x, this.size.y, this.options);
    }
  
    drawShape() {
      rect(0, 0, this.size.x, this.size.y);
    }
  }
  