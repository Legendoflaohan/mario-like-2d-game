const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1024;
canvas.height = 576;

class Cube {
    constructor(anchorPoint, velocity, acc) {
        this.anchorPoint = anchorPoint;
        this.width = 100;
        this.height = 100;
        //set initial speed and acc.
        this.velocity = velocity;
        this.acc = acc;
    }

    initialize() {
        c.fillStyle = 'grey';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
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
        cube.velocity.h = 0;
        if (keys.ArrowRight.pressed) {
            cube.velocity.h = 10;
        }
        if (keys.ArrowLeft.pressed) {
            cube.velocity.h = -10;
        }
    }



    // 封装。
    execution() {
        cube.initialize();
        // Make jump before gravity set this.anchorPoint.y to fix number.
        cube.jump();
        cube.move();
        cube.gravity();
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

const cube = new Cube({ x: 450, y: 0, }, { h: 0, v: 0 }, 9.8);

function animation() {
    c.fillStyle = 'wheat';
    c.fillRect(0, 0, canvas.width, canvas.height);
    cube.execution();
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
            cube.velocity.v = -25;
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