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
    //Actions of the class, actions can use the constructor properties above
    //Action one: generate a blue cube.
    initialize() {
        c.fillStyle = 'grey';
        c.fillRect(this.anchorPoint.x, this.anchorPoint.y, this.width, this.height);
    }

    gravity() {
        // Read this if statement after the rest part of this function.
        // Adjust the 误差
        if (this.anchorPoint.y + this.height >= canvas.height) {
            this.velocity.v = 0;
            // Fix the 误差
            this.anchorPoint.y = canvas.height - this.height;
            // Stop the cube.
            this.acc = 0;
        }
        //move the blue cube.
        this.anchorPoint.y += this.velocity.v;
        //acceleration
        this.velocity.v += this.acc;
    }

    jump() {
        this.anchorPoint.y += this.velocity.v;
        this.acc = 2.5;
    }

    move() {
        this.anchorPoint.x += this.velocity.h;
    }
}
// Set a cube with class Cube. Set it's anchorPoint, speed, and acc.
const cube = new Cube({ x: 100, y: 0, }, { h: 0, v: 0 }, 9.8);
const cube1 = new Cube({ x: 600, y: 0, }, { h: 0, v: 0 }, 6);

// Animation loop function.
function hangHang() {
    // A per fpx refresh purple background for the blue cubes.
    c.fillStyle = 'wheat';
    c.fillRect(0, 0, canvas.width, canvas.height);
    // cube who just born will execute initialize function in class Cube, each fps it move 1px downwards.
    cube.initialize();
    // cube who just born will execute move function in class Cube, for each fps it executes one time.
    cube.jump();
    cube.gravity();
    // Let's jump.
    cube1.initialize();
    cube1.gravity();
    cube.move();
    cube1.move();
    window.requestAnimationFrame(hangHang);
}

hangHang();
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowRight':
            cube.velocity.h = 3;
            break;
        case 'ArrowLeft':
            cube.velocity.h = -3;
            break;
        case 'ArrowUp':
            cube.velocity.v = -25;
            break;
    }
});