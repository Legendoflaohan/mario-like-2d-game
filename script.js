// VS Code trick: Ctrl + K Ctrl + 0 fold all.
// VS Code trick: Ctrl + K Ctrl + J unfolds all.
// VS Code trick: Ctrl + Space a new line regardless the cursor position.
// VS Code trick: Ctrl + Shift + Space a new line above.
// VS Code trick: Ctrl + L select the whole line.
// VS Code trick: Ctrl + D select the current word.
// VS Code trick: Ctrl + U unselect the current word.
// VS Code trick: Ctrl + K Ctrl + D skip this current word.
// VS Code trick: Ctrl + K Ctrl + D skip this current word.
// VS Code trick: Ctrl Shift + L select all matches.

const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;
// After using c.scale(4, 4), the viewport's width and height.
const scaledCanvas = {
  width: canvas.width / 4,
  height: canvas.height / 4,
};
// This section is about drawing collision blocks on the background.
// This contains the floor blocks with the locations.
const collisionBlocks = [];
// This contains the floor tiles' arrays.
// it's called a 2d array which is an array of arrays, rows and columns.
const floorCollision2D = [];
for (let i = 0; i < floorCollisions.length; i += 36) {
  floorCollision2D.push(floorCollisions.slice(i, i + 36));
}
// x and y work as index cuz forEach syntax.
floorCollision2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      collisionBlocks.push(
        new CollisionBlock({
          anchorPoint: {
            x: x * 16,
            y: y * 16,
          },
        })
      );
    }
  });
});
// This contains the platform blocks with locations.
const platformCollisionBlocks = [];
// This contains the platform tiles' arrays.
const platformCollision2D = [];
for (let i = 0; i < platformCollisions.length; i += 36) {
  platformCollision2D.push(platformCollisions.slice(i, i + 36));
}
// x and y work as index cuz forEach syntax.
platformCollision2D.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 202) {
      platformCollisionBlocks.push(
        new CollisionBlock({
          anchorPoint: {
            x: x * 16,
            y: y * 16,
          },
          height: 4,
        })
      );
    }
  });
});

// When keys are not being pushed.
const keys = {
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

// Introduce a player.
// It's called a new instance.
const player = new Player({
  anchorPoint: {
    x: 100,
    y: 300,
  },
  velocity: {
    h: 0,
    v: 0,
  },
  acc: 0.1,
  collisionBlocks, // It's a short version for collisionBlocks: collisionBlocks.
  platformCollisionBlocks, // Same as the above.
  imageSrc: "./img/player-avatar/Idle.png",
  frameRate: 8,
  frameBuffer: 3,
  animations: {
    Idle: {
      imageSrc: "./img/player-avatar/Idle.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    IdleLeft: {
      imageSrc: "./img/player-avatar/IdleLeft.png",
      frameRate: 8,
      frameBuffer: 3,
    },
    Run: {
      imageSrc: "./img/player-avatar/Run.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    RunLeft: {
      imageSrc: "./img/player-avatar/RunLeft.png",
      frameRate: 8,
      frameBuffer: 5,
    },
    Jump: {
      imageSrc: "./img/player-avatar/Jump.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    JumpLeft: {
      imageSrc: "./img/player-avatar/JumpLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    Fall: {
      imageSrc: "./img/player-avatar/Fall.png",
      frameRate: 2,
      frameBuffer: 3,
    },
    FallLeft: {
      imageSrc: "./img/player-avatar/FallLeft.png",
      frameRate: 2,
      frameBuffer: 3,
    },
  },
});

const camera = {
  anchorPoint: {
    x: 0,
    y: 0,
  },
};

// Introduce the background.
const background = new Sprite({
  anchorPoint: {
    x: 0,
    y: 0,
  },
  imageSrc: "./img/background.png",
});

function animation() {
  // Read next line of code then go back here.
  // Here's the solution, use canvas save and restore to create an box,
  // only stuff inside the box will be affected by scale method~~~
  c.save();
  // Use canvas scale method to adjust the size of image.
  // But there's a problem, the scale method keeps working every loop, so we need a solution.
  // Also, it's like a 放大镜 when using scale method, everything in the viewport aka canvas is bigger,
  // but the stuff actually doesn't change. So when we move origin(coordinate) around using translate method,
  // we are using the actual length.
  c.scale(4, 4);
  // // The x, y of the drawImage as well as the fillRect are all relate to the origin,
  // // when the origin aka the coordinate changed, the position of stuff drawed after the change will change,
  // // stuff before the coordinate change will rimain its position.
  // // The canvas aka the viewport won't change place.
  c.translate(
    camera.anchorPoint.x,
    -background.image.height + scaledCanvas.height
  );
  background.execute();
  // Draw collisions.
  collisionBlocks.forEach((collisionBlock) => {
    collisionBlock.execute();
  });
  platformCollisionBlocks.forEach((platfromcollisionBlock) => {
    platfromcollisionBlock.execute();
  });
  player.execute();
  c.restore();
  window.requestAnimationFrame(animation);
}

animation();
// When key down, set value to true.
window.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
    case "ArrowUp":
      if (player.velocity.v === 0) {
        player.velocity.v = -3.5;
      }
      break;
    default:
  }
});

// When key up, set value to false.
window.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
    default:
  }
});
