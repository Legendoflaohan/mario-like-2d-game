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

    this.hitbox = {
      anchorPoint: {
        x: this.anchorPoint.x + 33,
        y: this.anchorPoint.y + 25,
      },
      width: 15,
      height: 28,
    };
  }

  switchSprite(key) {
    if (this.image === this.animations[key].image || !this.loaded) return;
    this.currentFrame = 0;
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
    this.frameRate = this.animations[key].frameRate;
  }

  updateCamerabox() {
    this.camerabox = {
      anchorPoint: {
        x: this.anchorPoint.x - 55,
        y: this.anchorPoint.y,
      },
      width: 200,
      height: 80,
    };
  }

  // Prevent character fall off from the right edge.
  checkForHorizontalCanvasCollision() {
    if (
      this.hitbox.anchorPoint.x + this.hitbox.width + this.velocity.h >= 576 ||
      this.hitbox.anchorPoint.x + this.velocity.h <= 0
    ) {
      this.velocity.h = 0;
    }
  }

  shouldPanCameraToTheLeft({ camera, canvas }) {
    const cameraboxRightSide =
      this.camerabox.anchorPoint.x + this.camerabox.width;
    // 576 is background width.
    if (cameraboxRightSide >= 576) return;
    const scaleDownCanvasWidth = canvas.width / 4;
    if (
      cameraboxRightSide >=
      scaleDownCanvasWidth + Math.abs(camera.anchorPoint.x)
    ) {
      camera.anchorPoint.x -= this.velocity.h;
    }
  }

  shouldPanCameraToTheRight({ camera, canvas }) {
    if (this.camerabox.anchorPoint.x <= 0) return;
    if (this.camerabox.anchorPoint.x <= Math.abs(camera.anchorPoint.x)) {
      camera.anchorPoint.x -= this.velocity.h;
    }
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

          this.anchorPoint.y =
            collisionBlock.anchorPoint.y +
            collisionBlock.height -
            offset +
            0.01;
          break;
        }
      }
    }

    // For platform collision blocks.
    for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
      const platformCollisionBlock = this.platformCollisionBlocks[i];
      if (
        platformCollision({
          object1: this.hitbox,
          object2: platformCollisionBlock,
        })
      ) {
        if (this.velocity.v > 0) {
          this.velocity.v = 0;

          const offset =
            this.hitbox.anchorPoint.y - this.anchorPoint.y + this.hitbox.height;

          this.anchorPoint.y =
            platformCollisionBlock.anchorPoint.y - offset - 0.01;
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
    //   this.hitbox.height,
    // );
    this.updateCamerabox();
    c.fillStyle = "rgba(0, 0, 255, 0.2)";
    c.fillRect(
      this.camerabox.anchorPoint.x,
      this.camerabox.anchorPoint.y,
      this.camerabox.width,
      this.camerabox.height
    );
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
