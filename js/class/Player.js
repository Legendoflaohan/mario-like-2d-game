class Player extends Sprite {
    constructor({ anchorPoint, velocity, acc, collisionBlocks, imageSrc, frameRate }) {
        super({ imageSrc, frameRate });
        this.anchorPoint = anchorPoint;
        this.width = 100 / 4;
        this.height = 100 / 4;
        //set initial speed and acc.
        this.velocity = velocity;
        this.acc = acc;
        this.collisionBlocks = collisionBlocks;
    }

    gravity() {
        this.anchorPoint.y += this.velocity.v;
        this.velocity.v += this.acc;
    }


    move() {
        this.anchorPoint.x += this.velocity.h;
        //Without this line, the player won't stop after pressing the direction keys.
        this.velocity.h = 0;
        if (keys.ArrowRight.pressed) {
            this.velocity.h = 5;
        }
        if (keys.ArrowLeft.pressed) {
            this.velocity.h = -5;
        }
    }
    checkForHorizontalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({
                object1: this,
                object2: collisionBlock,
            })) {
                if (this.velocity.h > 0) {
                    this.velocity.h = 0;
                    this.anchorPoint.x = collisionBlock.anchorPoint.x - this.width - 0.01;
                    break;
                }
                if (this.velocity.h < 0) {
                    this.velocity.h = 0;
                    this.anchorPoint.x = collisionBlock.anchorPoint.x + collisionBlock.width + 0.01;
                    break;
                }
            }
        }
    }

    // This detect whether the player is about to go cross the block.
    checkForVerticalCollisions() {
        for (let i = 0; i < this.collisionBlocks.length; i++) {
            const collisionBlock = this.collisionBlocks[i];
            if (collision({
                object1: this,
                object2: collisionBlock,
            })) {
                if (this.velocity.v > 0) {
                    this.velocity.v = 0;
                    this.anchorPoint.y = collisionBlock.anchorPoint.y - this.height - 0.01;
                    break;
                }
                if (this.velocity.v < 0) {
                    this.velocity.v = 0;
                    this.anchorPoint.y = collisionBlock.anchorPoint.y + collisionBlock.height + 0.01;
                    break;
                }
            }
        }
    }

    // 封装。
    execute() {
        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
        this.draw();
        this.updateFrames();
        // Make jump before gravity set this.anchorPoint.y to fix number.
        this.move();
        this.checkForHorizontalCollisions();
        this.gravity();
        this.checkForVerticalCollisions();
    }
}