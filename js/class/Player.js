class Player extends Sprite {
    constructor({ anchorPoint, velocity, acc, collisionBlocks, imageSrc, frameRate, frameBuffer, scale = 0.5 }) {
        super({ imageSrc, frameRate, frameBuffer, scale });
        this.anchorPoint = anchorPoint;
        this.width = 100 / 4;
        this.height = 100 / 4;
        //set initial speed and acc.
        this.velocity = velocity;
        this.acc = acc;
        this.collisionBlocks = collisionBlocks;
    }

    updateHitbox() {
        this.hitbox = {
            anchorPoint: {
                x: this.anchorPoint.x + 33,
                y: this.anchorPoint.y + 25,
            },
            width: 15,
            height: 28,
        }
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
                object1: this.hitbox,
                object2: collisionBlock,
            })) {
                if (this.velocity.h > 0) {
                    this.velocity.h = 0;

                    const offset = this.hitbox.anchorPoint.x - this.anchorPoint.x + this.hitbox.width;

                    this.anchorPoint.x = collisionBlock.anchorPoint.x - offset - 0.01;
                    break;
                }
                if (this.velocity.h < 0) {
                    this.velocity.h = 0;

                    const offset = this.hitbox.anchorPoint.x - this.anchorPoint.x;

                    this.anchorPoint.x = collisionBlock.anchorPoint.x + collisionBlock.width - offset + 0.01;
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
                object1: this.hitbox,
                object2: collisionBlock,
            })) {
                if (this.velocity.v > 0) {
                    this.velocity.v = 0;

                    const offset = this.hitbox.anchorPoint.y - this.anchorPoint.y + this.hitbox.height;

                    this.anchorPoint.y = collisionBlock.anchorPoint.y - offset - 0.01;
                    break;
                }
                if (this.velocity.v < 0) {
                    this.velocity.v = 0;

                    const offset = this.hitbox.anchorPoint.y - this.anchorPoint.y;

                    this.anchorPoint.y = collisionBlock.height - offset + 0.01;
                    break;
                }
            }
        }
    }

    // 封装。
    execute() {
        this.updateHitbox();
        this.updateFrames();
        c.fillStyle = 'rgba(0, 255, 0, 0.2)';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
        c.fillStyle = 'rgba(0, 0, 255, 0.5)';
        c.fillRect(this.hitbox.anchorPoint.x, this.hitbox.anchorPoint.y, this.hitbox.width, this.hitbox.height);
        this.draw();
        // Make jump before gravity set this.anchorPoint.y to fix number.
        this.move();
        this.updateHitbox();
        this.checkForHorizontalCollisions();
        this.gravity();
        this.updateHitbox();
        this.checkForVerticalCollisions();
    }
}