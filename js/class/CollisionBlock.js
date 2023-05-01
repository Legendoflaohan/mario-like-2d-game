class CollisionBlock {
  constructor({ anchorPoint, height = 16 }) {
    this.anchorPoint = anchorPoint;
    this.width = 16;
    this.height = height;
  }

  draw() {
    c.fillStyle = "rgba(255, 0, 0, 0.5)";
    c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
  }

  execute() {
    this.draw();
  }
}
