class CollisionBlock {
    constructor({ anchorPoint }) {
        this.anchorPoint = anchorPoint;
        this.width = 16;
        this.height = 16;
    }

    draw() {
        c.fillStyle = 'rgba(255, 0, 0, 0.5)';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
    }

    execute() {
        this.draw();
    }

}