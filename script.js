const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

class Player {
    constructor(anchorPoint, velocity, acc) {
        this.anchorPoint = anchorPoint;
        this.width = 100;
        this.height = 100;
        //set initial speed and acc.
        this.velocity = velocity;
        this.acc = acc;
    }

    avatar() {
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
        this.avatar();
        // Make jump before gravity set this.anchorPoint.y to fix number.
        this.jump();
        this.move();
        this.gravity();
    }
}

class Sprite {
    // Use {} for the argument of constructor is to benefit form the key: value form,
    // for it can illustrate the name of the argument we are manipulating, provides solid readability.
    // Down to the code which const background to check it out.
    constructor({ anchorPoint, imageSrc }) {
        // Just like the Player class.
        this.anchorPoint = anchorPoint;
        // Create a instance of Image() class, then this.image can use the stuff inside the built-in class: Image().
        this.image = new Image();
        // Set the image src.
        this.image.src = imageSrc;
    }
    // Introduce a way to draw image on the canvas.
    paint() {
        // Read the rest before read this line.
        // This line of code provides errors, if this.image doesn't exists, return.
        if (!this.image) {return;}
        // canvas 2d API.
        c.drawImage(this.image, this.anchorPoint.x, this.anchorPoint.y)
    }

    execute() {
        this.paint();
    }

}

const keys = {
    ArrowRight: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
}
// Introduce a player.
// It's called a new instance.
const player = new Player({ x: 450, y: 0, }, { h: 0, v: 0 }, 9.8);
// Introduce the background.
const background = new Sprite ({
    anchorPoint: {
        x: 0,
        y: 0,
    },
    imageSrc: './super-mario-background.jpg',
})

function animation() {
    c.fillStyle = 'wheat';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // Read next line of code then go back here.
    // Here's the solution, use canvas save and restore to create an box,
    // only stuff inside the box will be affected by scale method~~~
    c.save();
    // Use canvas scale method to adjust the size of image.
    // But there's a problem, the scale method keeps working every loop, so we need a solution.
    c.scale(0.1333, 0.1333);
    background.execute();
    c.restore();

    player.execute();
    window.requestAnimationFrame(animation);
}

animation();

window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = true;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true;
            break;
        case 'ArrowUp':
            player.velocity.v = -25;
            break;
    }
});

window.addEventListener('keyup', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            keys.ArrowRight.pressed = false;
            break;
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = false;
            break;
    }
});