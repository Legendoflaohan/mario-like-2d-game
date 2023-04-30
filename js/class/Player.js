class Player extends Sprite {
  constructor({
    anchorPoint,
    velocity,
    acc,
    collisionBlocks,
    platformCollisionBlocks,
    imageSrc,
    frameRate,
    frameBuffer,
    scale = 0.5,
    animations,
  }) {
    super({
      imageSrc,
      frameRate,
      frameBuffer,
      scale,
    });
    this.anchorPoint = anchorPoint;
    this.width = 100 / 4;
    this.height = 100 / 4;
    // set initial speed and acc.
    this.velocity = velocity;
    this.acc = acc;

    this.collisionBlocks = collisionBlocks;
    this.platformCollisionBlocks = platformCollisionBlocks;
    this.animations = animations;

    this.lastDirection = "right";
    // eslint-disable-next-line no-restricted-syntax, guard-for-in
    for (const key in this.animations) {
      const image = new Image();
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image;
    }
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  updateHitbox() {
    this.hitbox = {
      anchorPoint: {
        x: this.anchorPoint.x + 33,
        y: this.anchorPoint.y + 25,
      },
      width: 15,
      height: 28,
    };
  }

  gravity() {
    // If these two line switch place, then the character will jitter.
    // Chris didn't explain deeply, hold this for now.
    this.velocity.v += this.acc;
    this.anchorPoint.y += this.velocity.v;
  }

  move() {
    this.anchorPoint.x += this.velocity.h;
    // Without this line, the player won't stop after pressing the direction keys.
    this.velocity.h = 0;
    if (keys.ArrowRight.pressed) {
      player.switchSprite("Run");
      this.velocity.h = 3;
      this.lastDirection = "right";
    } else if (keys.ArrowLeft.pressed) {
      player.switchSprite("RunLeft");
      this.velocity.h = -3;
      this.lastDirection = "left";
    } else if (player.velocity.v === 0) {
      if (this.lastDirection === "right") {
        player.switchSprite("Idle");
      } else if (this.lastDirection === "left") {
        player.switchSprite("IdleLeft");
      }
    }

    if (player.velocity.v < 0) {
      if (this.lastDirection === "right") {
        player.switchSprite("Jump");
      } else if (this.lastDirection === "left") {
        player.switchSprite("JumpLeft");
      }
    } else if (player.velocity.v > 0) {
      if (this.lastDirection === "right") {
        player.switchSprite("Fall");
      } else if (this.lastDirection === "left") {
        player.switchSprite("FallLeft");
      }
    }
  }

  checkForHorizontalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.h > 0) {
          this.velocity.h = 0;

          const offset =
            this.hitbox.anchorPoint.x - this.anchorPoint.x + this.hitbox.width;

          this.anchorPoint.x = collisionBlock.anchorPoint.x - offset - 0.01;
          break;
        }
        if (this.velocity.h < 0) {
          this.velocity.h = 0;

          const offset = this.hitbox.anchorPoint.x - this.anchorPoint.x;

          this.anchorPoint.x =
            collisionBlock.anchorPoint.x + collisionBlock.width - offset + 0.01;
          break;
        }
      }
    }
  }

  // This detect whether the player is about to go cross the block.
  checkForVerticalCollisions() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i];
      if (
        collision({
          object1: this.hitbox,
          object2: collisionBlock,
        })
      ) {
        if (this.velocity.v > 0) {
          this.velocity.v = 0;

          const offset =
            this.hitbox.anchorPoint.y - this.anchorPoint.y + this.hitbox.height;

          this.anchorPoint.y = collisionBlock.anchorPoint.y - offset - 0.01;
          break;
        }
        if (this.velocity.v < 0) {
          this.velocity.v = 0;

          const offset = this.hitbox.anschorPoint.y - this.anchorPoint.y;

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
    // c.fillStyle = "rgba(0, 255, 0, 0.2)";
    // c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
    // c.fillStyle = "rgba(0, 0, 255, 0.5)";
    // c.fillRect(
    //   this.hitbox.anchorPoint.x,
    //   this.hitbox.anchorPoint.y,
    //   this.hitbox.width,
    //   this.hitbox.height
    // );
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
