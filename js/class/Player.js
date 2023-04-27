class Player {
    constructor(anchorPoint, velocity, acc) {
        this.anchorPoint = anchorPoint;
        this.width = 100;
        this.height = 100;
        //set initial speed and acc.
        this.velocity = velocity;
        this.acc = acc;
    }

    draw() {
        c.fillStyle = 'red';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);

        c.fillStyle = 'brown';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height / 2);
    }

    gravity() {
        if (this.anchorPoint.y + this.height >= canvas.height) {
            this.velocity.v = 0;
            this.anchorPoint.y = canvas.height - this.height;
            this.acc = 0;
        }
        this.anchorPoint.y += this.velocity.v;
        this.velocity.v += this.acc;
    }
    jump() {
        this.anchorPoint.y += this.velocity.v;
        this.acc = 2.5;
    }

    move() {
        this.anchorPoint.x += this.velocity.h;
        //Without this line, the player won't stop after pressing the direction keys.
        player.velocity.h = 0;
        if (keys.ArrowRight.pressed) {
            player.velocity.h = 15;
        }
        if (keys.ArrowLeft.pressed) {
            player.velocity.h = -15;
        }
    }

    // 封装。
    execute() {
        this.draw();
        // Make jump before gravity set this.anchorPoint.y to fix number.
        this.jump();
        this.move();
        this.gravity();
    }
}